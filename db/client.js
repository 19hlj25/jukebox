import pg from "pg";
const db = new pg.Client({
  database: "jukebox",
});
export default db;
