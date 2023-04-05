console.clear();

let state = {
  count: 1,
  message: "Hello",
  gibberish: false
};

const stateHandler = {
  // get(target, props) {
  //   console.log(`called get method: props: ${props}`);
  //   return target[props];
  // },

  get: function (target, prop, receiver) {
    // console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  // set(target, targetProps, newValue) {
  //   console.log(`called set method: targetProps: ${targetProps}`);
  //   // console.table(arguments);
  //   console.log("==============================");
  //   console.log("new", newValue);
  //   return (target[targetProps] = newValue);
  // }
  set(target, prop, val, receiver) {
    // console.table(arguments);
    console.log(`SET ${prop}=${val}`);
    // console.table(arguments);
    return Reflect.set(target, prop, val, receiver);
    // return Reflect.set(...arguments);
  }
};

const getState = () => stateProxy;

const setState = (a) => {
  console.log(a);
  for (const [key, value] of Object.entries(a)) {
    // console.log(key, value);
    // stateProxy.message = "bye";
    stateProxy[key] = value;
  }
};

const stateProxy = new Proxy(state, stateHandler);

console.log(stateProxy.count);
console.log(stateProxy.count);
console.log(stateProxy.message);
console.log(stateProxy.gibberish);
stateProxy.count = 2;
console.log(stateProxy.count);
console.log(stateProxy.message);
console.log(stateProxy.gibberish);

const useState1 = () => [getState(), setState];

const [customState, customSet] = useState1();
console.log("==============================");

console.log(customState.count);

customSet({ gibberish: true, count: 1000 });
console.log("==============================");

console.log(customState);
