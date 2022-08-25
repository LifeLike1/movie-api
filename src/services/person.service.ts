import DatabaseInstance from "@/lib/DatabaseInstance";
import {
  CreatePersonInput,
  DeletePersonInput,
  GetSinglePersonInput,
  UpdateSinglePersonInput,
} from "@/types/person.types";
import { Person } from "@prisma/client";

class PersonService {
  private databaseInstance: DatabaseInstance = DatabaseInstance.getInstance();

  get database() {
    return this.databaseInstance;
  }

  async getAllPeople(): Promise<Person[]> {
    const people = await this.databaseInstance
      .getConnection()
      .person.findMany();
    return people;
  }

  async getPerson(input: GetSinglePersonInput): Promise<Person | null> {
    const user = await this.database.getConnection().person.findFirst({
      where: {
        id: Number(input.id),
      },
    });
    return user;
  }

  async createPerson(input: CreatePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.create({
      data: {
        ...input,
        birthDate: new Date(input.birthDate),
      },
    });
    return user;
  }

  async updatePerson(input: UpdateSinglePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.update({
      data: input.body,
      where: {
        id: Number(input.params.id),
      },
    });
    return user;
  }

  async deletePerson(input: DeletePersonInput): Promise<Person> {
    const user = await this.database.getConnection().person.delete({
      where: {
        id: input.id,
      },
    });
    return user;
  }
}

export default PersonService;
