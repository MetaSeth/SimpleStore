type StoreData = {
  [key: string]: any;
};

class Store {
  private data: StoreData = {};

  // Helper method to get a reference to a nested object using dot notation.
  private getRef(obj: StoreData, key: string, createIfMissing = false): any {
    let ref = obj;
    const keys = key.split(".");
    for (let i = 0; i < keys.length; i++) {
      if (!ref[keys[i]]) {
        if (createIfMissing) {
          ref[keys[i]] = {};
        } else {
          return undefined;
        }
      }
      ref = ref[keys[i]];
    }
    return ref;
  }

  set(key: string, value: any): boolean {
    if (this.isSerializable(value)) {
      const keys = key.split(".");
      const lastKey = keys.pop();
      const ref = this.getRef(this.data, keys.join("."), true);
      if (!lastKey) {
        throw new Error("Invalid key provided.");
      }
      ref[lastKey] = value;
      return true;
    }
    return false;
  }

  get(key: string): any {
    return this.getRef(this.data, key);
  }

  list(): StoreData {
    return this.data;
  }

  private isSerializable(value: any): boolean {
    try {
      JSON.stringify(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  toJSON(): string {
    return JSON.stringify(this.data);
  }
}

export default Store;
