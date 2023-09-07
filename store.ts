type StoreData = {
  [key: string]: any;
};

export class Store {
  private data: StoreData = {};
  private isLocked: boolean = false;

  private lock() {
    this.isLocked = true;
  }

  private unlock() {
    this.isLocked = false;
  }

  private async waitForUnlock() {
    while (this.isLocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  public async set(key: string, value: any) {
    await this.waitForUnlock();
    this.lock();

    if (!this.isSerializable(value)) {
      this.unlock();
      throw new Error("Provided value is not serializable.");
    }

    const keys = key.split(".");
    let current = this.data;

    while (keys.length > 1) {
      const k = keys.shift()!;
      if (!current[k]) {
        current[k] = {};
      }
      current = current[k];
    }
    current[keys[0]] = value;

    this.unlock();
  }

  public async get(key: string): Promise<any> {
    await this.waitForUnlock();

    const keys = key.split(".");
    let current = this.data;

    for (const k of keys) {
      if (current[k] === undefined) {
        return undefined;
      }
      current = current[k];
    }
    return current;
  }

  public async entries(): Promise<StoreData> {
    await this.waitForUnlock();
    return this.data;
  }

  private isSerializable(value: any): boolean {
    try {
      JSON.stringify(value);
      return true;
    } catch {
      return false;
    }
  }

  public toJSON(): string {
    return JSON.stringify(this.data);
  }
}
export default Store;
