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

      Reflect.set(...arguments);
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

  // proxySubscribersMap.set(proxiedObject, subscribers);

  return proxiedObject;
}

export function subscribe(store, cb) {
  store[SUBSCRIBE_METHOD].add(cb);
  return () => store[SUBSCRIBE_METHOD].delete(cb);
}

// CUSTOM TESTS
() => {
  const fetchPokemon = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    const { abilities, moves } = await data.json();
    return { ...abilities, ...moves };
  };

  const Person = proxy({
    name: "Rishab",
    age: 40,
    others: { a: 1 },
    arr: [1, 2, 4],
    superNested: [
      {
        color: "purple",
        type: "minivan",
        registration: "Wed Feb 01 2017 00:00:00 GMT+0100 (GMT+01:00)",
        capacity: 7,
      },
      {
        color: "red",
        type: "station wagon",
        registration: "Sat Mar 03 2018 01:00:00 GMT+0100 (GMT+01:00)",
        capacity: 5,
      },
    ],
  });

  // subscribe(Person, () => alert("Something changed"));
  // subscribe(Person.others, () => alert("Something changed in the nested child"));
  // subscribe(Person.arr, () => alert("Something changed in the nested child"));
  subscribe(Person, () => alert("Something changed"));

  // Person.name = "Rishab";
  // Person.name = "Rishab";
  async function name() {
    const ditto = await fetchPokemon();
    Person.ditto = ditto;
    console.table(Person.ditto);
  }
  name();

  // Person.others.a = 10;
  // Person.others.a = 10;
  // Person.others.a = 100;
  // Person.others.a = 100;
  // Person.arr[1] = 0;
  // Person.arr[1] = 0;
};
