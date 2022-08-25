import DatabaseInstance from "@/lib/DatabaseInstance";
import {
  CreatePersonInput,
  DeletePersonInput,
  GetSinglePersonInput,
  UpdateSinglePersonInput,
} from "@/types/person.types";
import { Service } from "@/types/Service";
import { Person } from "@prisma/client";

class PersonService extends Service<Person> {
  constructor(database: DatabaseInstance) {
    super(database);
  }

  async getAll(): Promise<Person[]> {
    const people = await this.database.getConnection().person.findMany();
    return people;
  }

  async getOne(input: GetSinglePersonInput): Promise<Person | null> {
    const user = await this.database.getConnection().person.findFirst({
      where: {
        id: Number(input.id),
      },
    });
    return user;
  }

  async create(input: CreatePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.create({
      data: {
        ...input,
        birthDate: new Date(input.birthDate),
      },
    });
    return user;
  }

  async update(input: UpdateSinglePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.update({
      data: input.body,
      where: {
        id: Number(input.params.id),
      },
    });
    return user;
  }

  async delete(input: DeletePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.delete({
      where: {
        id: input.id,
      },
    });
    return user;
  }
}

export default PersonService;
