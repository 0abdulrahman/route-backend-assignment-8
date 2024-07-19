import { dbConnection } from "../database/dbConnection.js";
import { app } from "./app.js";

app.listen(8800, async () => {
  await dbConnection;
  console.log(`💿 The server is running on port 8800!`);
});
