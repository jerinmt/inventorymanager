#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS all_items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL UNIQUE,
  quantity INTEGER NOT NULL,
  price NUMERIC(6, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS milk_Chocolates (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dark_Chocolates (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS white_Chocolates (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO
  all_items (name, quantity, price)
VALUES
  ('Galaxy 100gm', 50, 30),
  ('Bourneville 100gm', 20, 30),
  ('Milkybar 100gm', 30, 20);

INSERT INTO
  milk_Chocolates (name)
VALUES
  ('Galaxy 100gm');

INSERT INTO
  dark_Chocolates (name)
VALUES
  ('Bourneville 100gm');

INSERT INTO
  white_Chocolates (name)
VALUES
  ('Milkybar 100gm');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,//environment variable
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();