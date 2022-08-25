import DatabaseInstance from "@/lib/DatabaseInstance";

export abstract class Service<T> {
  private databaseInstance: DatabaseInstance;

  constructor(database: DatabaseInstance) {
    this.databaseInstance = database;
  }

  get database() {
    return this.databaseInstance;
  }

  abstract getOne(input: any): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
  abstract create(input: any): Promise<T>;
  abstract update(input: any): Promise<T>;
  abstract delete(input: any): Promise<T>;
}
