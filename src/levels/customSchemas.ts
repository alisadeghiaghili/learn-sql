/**
 * Small per-sequence schemas for topics that need data the shop schema
 * intentionally lacks: deliberate NULLs (people) and a self-referencing
 * org tree (employees) for self joins and recursive CTEs.
 */

export const peopleSchema = `
CREATE TABLE people (
  id INTEGER PRIMARY KEY,
  name TEXT,
  city TEXT,
  age INTEGER
);
`;

export const peopleSeed = `
INSERT INTO people (id, name, city, age) VALUES
  (1, 'Ann', 'London', 30),
  (2, 'Bob', NULL, 25),
  (3, 'Cid', 'Paris', NULL),
  (4, 'Dot', NULL, NULL),
  (5, 'Eve', 'Berlin', 41);
`;

export const employeesSchema = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  manager_id INTEGER REFERENCES employees(id)
);
`;

export const employeesSeed = `
INSERT INTO employees (id, name, manager_id) VALUES
  (1, 'CEO', NULL),
  (2, 'CTO', 1),
  (3, 'VP Eng', 2),
  (4, 'Dev A', 3),
  (5, 'Dev B', 3),
  (6, 'Finance', 1);
`;
