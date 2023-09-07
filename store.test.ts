import Store from "./store";

describe("Store class", () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("should set and get a value", async () => {
    await store.set("user.name", "John");
    const value = await store.get("user.name");
    expect(value).toBe("John");
  });

  it("should handle nested keys", async () => {
    await store.set("user.address.street", "Main St");
    const value = await store.get("user.address.street");
    expect(value).toBe("Main St");
  });

  it("should return all entries", async () => {
    await store.set("user.age", 30);
    const entries = await store.entries();
    expect(entries).toEqual({ user: { age: 30 } });
  });
});
