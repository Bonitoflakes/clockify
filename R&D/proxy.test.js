import { createProxy as proxy, subscribe, subscribePrimitive } from "./proxy2";
import { describe, expect, it, vi } from "vitest";

describe("subscribe", () => {
  it("should call subscription on primitive values", () => {
    const Person = proxy({
      name: "Rishab",
      age: 40,
      others: { a: 1, b: [1, 2] },
      arr: [1, 2, 4],
    });

    const parent = vi.fn();
    const child1 = vi.fn();
    const child2 = vi.fn();

    subscribePrimitive("name", child2);
    subscribePrimitive("name", child2);
    Person.name = "name";
    Person.name = "name";
    Person.name = "name";

    expect(child2).toBeCalledTimes(1);
  });

  it("should call subscription on differnt levels of nesting", () => {
    const Person = proxy({
      name: "Rishab",
      age: 40,
      others: { a: 1, b: [1, 2] },
      arr: [1, 2, 4],
    });

    const parent = vi.fn();
    const child1 = vi.fn();
    const child2 = vi.fn();

    subscribe(Person.others, child2);
    subscribe(Person.arr, child1);
    subscribe(Person, parent);

    Person.name = "Rishab";
    Person.name = "name";
    expect(parent).toBeCalledTimes(1);

    Person.others.b = 10;
    Person.others.a = 10;
    Person.others.a = 100;
    Person.others.a = 100;
    Person.others.a = 1000;
    expect(child2).toBeCalledTimes(4);

    Person.arr[1] = 0;
    expect(child1).toBeCalledTimes(1);
  });

  it("should call subscription", async () => {
    const obj = proxy({ count: 0 });
    const handler = vi.fn();

    subscribe(obj, handler);

    obj.count += 1;

    await Promise.resolve();
    expect(handler).toBeCalledTimes(1);
  });

  it("should be able to unsubscribe", async () => {
    const obj = proxy({ count: 0 });
    const handler = vi.fn();

    const unsubscribe = subscribe(obj, handler);
    unsubscribe();

    obj.count += 1;

    await Promise.resolve();
    expect(handler).toBeCalledTimes(0);
  });

  it("should call subscription of object property", async () => {
    const obj = proxy({ nested: { count: 0 } });
    const handler = vi.fn();

    subscribe(obj.nested, handler);

    obj.nested.count += 1;

    await Promise.resolve();
    expect(handler).toBeCalledTimes(1);
  });

  it("should thow if subscribing to primitive property", async () => {
    const obj = proxy({ count: 0 });
    const handler = vi.fn();

    expect(() => subscribe(obj.count, handler)).toThrow();
  });

  it("should not re-run subscription if no change", async () => {
    const obj = proxy({ count: 0 });
    const handler = vi.fn();

    subscribe(obj, handler);

    obj.count = 0;

    await Promise.resolve();
    expect(handler).toBeCalledTimes(0);
  });

  it.skip("should not re-run subscription if object no change", async () => {
    const inner = {};
    const obj = proxy({ count: inner });
    const handler = vi.fn();

    subscribe(obj, handler);

    obj.count = inner;
    obj.count = inner;
    obj.count = inner;

    await Promise.resolve();
    expect(handler).toBeCalledTimes(0);
  });

  it("should not cause infinite loop", async () => {
    const obj = proxy({ count: 0 });
    const handler = () => {
      // Reset count if above 5
      if (obj.count > 5) {
        obj.count = 0;
      }
    };

    subscribe(obj, handler);

    obj.count = 10;
  });
});
