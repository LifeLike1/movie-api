import { zodParseId } from "../src/lib/ZodParseId";
import { describe, expect, test } from "@jest/globals";
import { zodParseDate } from "./../src/lib/ZodParseDate";

describe("Parsing zod id", () => {
  test("parse correct number id", () => {
    const exampleId = zodParseId();
    expect(exampleId.parse(1)).toBe(1);
  });
  test("parse correct string id", () => {
    const exampleId = zodParseId();
    expect(exampleId.parse("1")).toBe(1);
  });
  test("parse incorrect number id lower than 0", () => {
    const exampleId = zodParseId();
    expect(() => exampleId.parse(-1)).toThrow();
  });
  test("parse incorrect floating number id", () => {
    const exampleId = zodParseId();
    expect(() => exampleId.parse(1.1)).toThrow();
  });
  test("parse incorrect floating number id as string", () => {
    const exampleId = zodParseId();
    expect(() => exampleId.parse("1.1")).toThrow();
  });
  test("parse string not a number id", () => {
    const exampleId = zodParseId();
    expect(() => exampleId.parse("a")).toThrow();
  });
});

describe("Parsing zod date", () => {
  test("parse correct full date", () => {
    const exampleDate = zodParseDate;
    expect(exampleDate.parse("2022-09-01T17:27:38.560Z")).toEqual(
      new Date("2022-09-01T17:27:38.560Z")
    );
  });
  test("parse correct only year", () => {
    const exampleDate = zodParseDate;
    expect(exampleDate.parse("2022")).toEqual(
      new Date("2022-01-01T00:00:00.000Z")
    );
  });
  test("parse correct only year and month", () => {
    const exampleDate = zodParseDate;
    expect(exampleDate.parse("2022-09")).toEqual(
      new Date("2022-09-01T00:00:00.000Z")
    );
  });
  test("parse correct only year and month and day", () => {
    const exampleDate = zodParseDate;
    expect(exampleDate.parse("2022-09-03")).toEqual(
      new Date("2022-09-03T00:00:00.000Z")
    );
  });
  test("parse incorrect date as string", () => {
    const exampleDate = zodParseDate;
    expect(() => exampleDate.parse("asdasd")).toThrow();
  });
});
