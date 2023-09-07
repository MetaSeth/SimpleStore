import Store from "./store";

const store = new Store();

store.set("user.name", "Alice");
console.log(store.get("user.name"));
