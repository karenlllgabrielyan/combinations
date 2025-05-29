export const createTableSchemas: string[] = [
  `
  CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(3) NOT NULL UNIQUE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination JSON NOT NULL,
    alias VARCHAR(255) NOT NULL UNIQUE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination JSON NOT NULL
);`,
];
