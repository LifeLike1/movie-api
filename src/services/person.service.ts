import DatabaseInstance from "@/lib/DatabaseInstance";
import {
  CreatePersonInput,
  DeletePersonInput,
  GetSinglePersonInput,
  UpdateSinglePersonInput,
} from "@/types/person.types";
import { Person } from "@prisma/client";

class PersonService {
  private readonly database: DatabaseInstance;

  constructor(database: DatabaseInstance) {
    this.database = database;
  }

  async getAllPeople() {
    const people = await this.database.getConnection().person.findMany();
    return people;
  }

  async getSinglePerson(input: GetSinglePersonInput) {
    const user = await this.database.getConnection().person.findFirstOrThrow({
      where: {
        id: Number(input.id),
      },
    });
    return user;
  }

  async createPerson(input: CreatePersonInput) {
    const user = await this.database.getConnection().person.create({
      data: {
        ...input,
        birthDate: new Date(input.birthDate),
      },
    });
    return user;
  }

  async updatePerson(input: UpdateSinglePersonInput) {
    const user = await this.database.getConnection().person.update({
      data: input.body,
      where: {
        id: Number(input.params.id),
      },
    });
    return user;
  }

  async deletePerson(input: DeletePersonInput) {
    const user = await this.database.getConnection().person.delete({
      where: {
        id: input.id,
      },
    });
    return user;
  }
}

export default PersonService;
