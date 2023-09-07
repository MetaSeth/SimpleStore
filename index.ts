import { Store } from "./store";

const main = async () => {
  const store = new Store();

  // Testing set and get methods
  await store.set("user.name", "John Doe");
  console.log(await store.get("user.name")); // John Doe

  // Testing nested keys
  await store.set("user.address.city", "New York");
  console.log(await store.get("user.address.city")); // New York

  // Testing entries method
  console.log(await store.entries()); // { user: { name: 'John Doe', address: { city: 'New York' } } }

  // Testing concurrent operations
  const concurrentSet = async () => {
    await store.set("user.age", 30);
    console.log(await store.get("user.age"));
  };

  const concurrentGet = async () => {
    console.log(await store.get("user.name"));
  };

  // These will execute concurrently
  concurrentSet();
  concurrentGet();

  // Testing serialization
  console.log(store.toJSON()); // Returns the store data as JSON string
};

main();
