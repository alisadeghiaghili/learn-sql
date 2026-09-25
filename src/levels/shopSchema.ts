/**
 * Shared shop schema + seed used by most tutorial sequences.
 */

export const shopSchema = `
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  signup_year INTEGER
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
`;

export const shopSeed = `
INSERT INTO customers (id, name, city, signup_year) VALUES
  (1, 'Ada Lovelace', 'London', 2019),
  (2, 'Alan Turing', 'Manchester', 2020),
  (3, 'Grace Hopper', 'New York', 2018),
  (4, 'Edsger Dijkstra', 'Rotterdam', 2021),
  (5, 'Barbara Liskov', 'Los Angeles', 2022);

INSERT INTO products (id, name, price, category) VALUES
  (1, 'Keyboard', 89.5, 'Hardware'),
  (2, 'Mouse', 24.0, 'Hardware'),
  (3, 'SQL Handbook', 39.9, 'Books'),
  (4, 'Monitor', 249.0, 'Hardware'),
  (5, 'Query Tuning', 45.0, 'Books');

INSERT INTO orders (id, customer_id, product_id, quantity, order_date) VALUES
  (1, 1, 1, 1, '2024-01-12'),
  (2, 1, 3, 2, '2024-02-03'),
  (3, 2, 4, 1, '2024-02-14'),
  (4, 3, 2, 3, '2024-03-01'),
  (5, 3, 5, 1, '2024-03-18'),
  (6, 4, 1, 2, '2024-04-02'),
  (7, 5, 3, 1, '2024-04-21'),
  (8, 2, 5, 2, '2024-05-05'),
  (9, 1, 4, 1, '2024-05-19'),
  (10, 4, 2, 1, '2024-06-01');
`;
