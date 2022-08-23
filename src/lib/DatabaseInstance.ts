import { PrismaClient } from "@prisma/client";

class DatabaseInstance {
  private static instance: DatabaseInstance;
  private connection: PrismaClient;

  private constructor() {
    this.connection = new PrismaClient();
  }

  public getConnection() {
    return this.connection;
  }

  static getInstance(): DatabaseInstance {
    if (!DatabaseInstance.instance) {
      DatabaseInstance.instance = new DatabaseInstance();
    }

    return DatabaseInstance.instance;
  }
}

export default DatabaseInstance;
