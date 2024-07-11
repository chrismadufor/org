// import postgresql from "pg";
// import os from "os";

const postgresql = require("pg");
const os = require("os");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { Pool } = postgresql;

const pool = new Pool({
  user:
    (process.env.NODE_ENV === "development" &&
      (os.userInfo() || {}).username) ||
    "",
  database: "app",
  password: "",
  host: "127.0.0.1",
  port: 5432,
});

// Read the contents of the user.schema.sql file
const usersSchemaFilePath = path.resolve(__dirname, "./schema/user.schema.sql");
const usersSchemaSQL = fs.readFileSync(usersSchemaFilePath, "utf-8");

// Read the contents of the organisation.schema.sql file
const organisationsSchemaFilePath = path.resolve(__dirname, "./schema/organisation.schema.sql");
const organisationsSchemaSQL = fs.readFileSync(organisationsSchemaFilePath, "utf-8");

// Function to create tables defined in the schema file
const createUserTable = async () => {
  try {
    // Check if the users table already exists
    const result = await pool.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'users' AND table_name = 'users'
        )
      `);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      // Execute the SQL commands to create tables
      await pool.query(usersSchemaSQL);
      console.log(chalk.greenBright("Users tables created successfully"));
    } else {
      console.log(chalk.yellow("Users table already exists"));
    }
  } catch (error) {
    console.error(chalk.red("Error creating users tables:"), error);
  }
};

const createOrganisationTable = async () => {
  try {
    // Check if the users table already exists
    const result = await pool.query(`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'organisations' AND table_name = 'organisations'
        )
      `);
      console.log("Here!", result)
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      // Execute the SQL commands to create tables
      await pool.query(organisationsSchemaSQL);
      console.log(chalk.greenBright("Organisation tables created successfully"));
    } else {
      console.log(chalk.yellow("Organisation table already exists"));
    }
  } catch (error) {
    console.error(chalk.red("Error creating organisation tables:"), error);
  }
};

// configure the database connection
const connectDB = async () => {
  try {
    // Connect to the database
    await pool.connect();
    console.log(chalk.greenBright("Database connected successfully"));

    // Create tables
    await createUserTable();
    await createOrganisationTable();
  } catch (error) {
    console.error(chalk.red("Error connecting to database:"), error);
  }
};

module.exports = connectDB;
