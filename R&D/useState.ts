import { customLog } from "../src/utils/proxyLogger";

type Subscriber = () => void;

export const useState = <T extends object>(initialState: T) => {
  // Typeof state should always be an object or an array
  if (!(typeof initialState === "object" && initialState !== null) && Array.isArray(initialState)) {
    throw new Error("initialState must be an object or an array");
  }

  // Define the initalState
  let state: T = initialState;
  const subscribers = new Set<Subscriber>();

  //   Create a new Proxy
  const stateProxy = new Proxy(state, {
    // Set Trap: sets the newly received value and updates the UI via Callback.
    set(target, prop, val) {
      // console.table(arguments);
      customLog(target, prop, val);
      // @ts-ignore
      Reflect.set(target, prop, val);
      subscribers.forEach((subscriber) => subscriber());
      return true;
    },
  });

  const subscribe = (subscriber: Subscriber) => {
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  };

  //   Getter function for the state
  const getState = () => {
    console.log(state);
    return state;
  };

  //   Setter function for the state
  const setState = (newState: any) => {
    for (const [key, value] of Object.entries(newState)) {
      // @ts-ignore
      stateProxy[key] = value;
    }
  };

  return [getState(), setState, subscribe];
};
