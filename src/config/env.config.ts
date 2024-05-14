// import dotenv from "dotenv";

// dotenv.config();

//Might be helpful for someone, my conenction was created with sid, to find the service name just run this command  show parameter service_name; et bssahtek

import "reflect-metadata";
export const ENV = {
  ORACLE_USER: "BDA",
  ORACLE_PASSWORD: "serine",
  ORACLE_CONNECTION_STRING: "localhost/orcl",
  PORT: 3000,

  // ORACLE_USER: process.env.ORACLE_USER,
  // ORACLE_PASSWORD: process.env.ORACLE_PASSWORD,
  // ORACLE_CONNECTION_STRING: process.env.ORACLE_CONNECTION_STRING,
  // PORT: process.env.PORT,
};
