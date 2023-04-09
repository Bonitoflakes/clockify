// @ts-nocheck

import { customLog } from "../src/utils/proxyLogger";

const SUBSCRIBE_METHOD = Symbol();

export function proxy(initialState) {
  if (!(typeof initialState === "object" && initialState !== null) && Array.isArray(initialState)) {
    throw new Error("proxy must be an object or an array");
  }

  // Set of subscribers to be notified on state change.
  const subscribers = new Set();

  // A one-time flag which is used to prevent subscribers being notified if the value changed is the same as the old one. Prevents Unnecessary re-renders.
  let initialised = false;

  /**
   *  Creates a new Proxy on an Empty Object.
   *  @returns Proxy Object
   */
  const handler = {
    get(target, property) {
      if (property === SUBSCRIBE_METHOD) {
        return subscribers;
      }

      return Reflect.get(...arguments);
    },

    set(target, property, value) {
      // Short-circuit if value changed is the same, prevents performance issues.
      if (initialised && target[property] === value) return true;

      // initialised ?? customLog(target, property, value);
      customLog(target, property, value);

      if (typeof value === "object") {
        // console.log("before:", value);
        value = proxy(value);
        // console.log("after:", value);
      }

      Reflect.set(target, property, value);
      subscribers.forEach((subscriber) => subscriber());
      return true;
    },
  };

  const proxiedObject = new Proxy({}, handler);

  /**
   * We need to loop the state manually inorder to convert the deeply nested
   * objects into proxies.
   *
   * Initially the proxied object is {} empty.
   * When we loop, we take every key from the initialState passed as parameter and  set it in the proxiedObject along with it's value. When this is done, the set() TRAP is called internally. During which we check if the initalState's value is an array or object. If so, we wrap it in another Proxy and set it as the value to the parent proxiedObject.
   */
  for (const key in initialState) {
    proxiedObject[key] = initialState[key];
  }

  initialised = true;

  return proxiedObject;
}

export function subscribe(store, cb) {
  store[SUBSCRIBE_METHOD].add(cb);
  return () => store[SUBSCRIBE_METHOD].delete(cb);
}

