const customLog = (target: any, prop: any, val: any) => {
  console.log(
    `%cSET ${prop}: %c ${target[prop]} %c --> %c ${val} `,
    "color:#71F409;font-weight:bolder;font-size:.8rem;",
    "color:black;background:#B76EF7;font-weight:700;font-size:.75rem;",
    "color:#71F409;font-weight:bolder;font-size:.7rem;",
    "background:#F6327D;color:white;"
  );
};

export { customLog };
