// @ts-nocheck

import { customLog } from "../src/utils/proxyLogger";

const subscribersMap = new Map();
const SUBSCIRBER_METHOD = Symbol("sub method");

export const createProxy = (initState) => {
  if (!(typeof initState === "object" && initState !== null) && Array.isArray(initState)) {
    throw new Error("proxy must be an object or an array");
  }

  // Set of subscribers to be notified on state change.
  const subscribersSet = new Set();

  // This is used only once, to stop early short-circuiting.
  let initialised = false;

  const handler = {
    get(target, property) {
      if (property === SUBSCIRBER_METHOD) {
        return subscribersSet;
      }

      return Reflect.get(target, property);
    },

    set(target, property, value, receiver) {
      // Short-circuit if value changed is the same, prevents performance issues.
      if (initialised && target[property] === value) return true;

      // initialised ?? customLog(target, property, value);
      customLog(target, property, value);

      if (typeof value === "object" && value !== null) {
        value = createProxy(value);
        // This flag is used to prevent primitive sub callbacks being called if the nested object also has the same key and it's modified. Check test 4.
        value._nested = true;
      }

      Reflect.set(target, property, value, receiver);

      // Children callbacks.
      if (subscribersMap.has(property) && !target._nested) {
        subscribersMap.get(property).forEach((cb) => cb());
      }

      // Parent callbacks
      subscribersSet.forEach((cb) => cb());

      return true;
    },
  };

  /**
   *  Creates a new Proxy on an Empty Object.
   *  @returns Proxy Object
   */
  const proxyType = Array.isArray(initState) ? [] : {};
  const proxyObj = new Proxy(proxyType, handler);

  /**
   * We need to loop the state manually inorder to convert the deeply nested
   * objects into proxies.
   *
   * Initially the proxied object is {} empty.
   * When we loop, we take every key from the initialState passed as parameter and  set it in the proxiedObject along with it's value. When this is done, the set() TRAP is called internally. During which we check if the initalState's value is an array or object. If so, we wrap it in another Proxy and set it as the value to the parent proxiedObject.
   */
  for (let key in initState) {
    proxyObj[key] = initState[key];
  }
  initialised = true;

  return proxyObj;
};

export const subscribePrimitive = (key, cb) => {
  if (!subscribersMap.has(key)) subscribersMap.set(key, new Set());
  subscribersMap.get(key).add(cb);

  return () => subscribersMap.get(key).delete(cb);
};

export const subscribe = (store, cb) => {
  if (!(typeof store === "object" && store !== null)) {
    throw new Error(
      `Can only subscribe to Proxy Objects: ${store} is not valid. You can't subscribe to primitives via this function. Please refer subscribePrimitive() `
    );
  }

  store[SUBSCIRBER_METHOD].add(cb);
  return () => store[SUBSCIRBER_METHOD].delete(cb);
};
