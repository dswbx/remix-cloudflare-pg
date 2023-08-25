import { type LoaderArgs, json } from "@remix-run/cloudflare";
import { Client } from "pg";

export const loader = async (args: LoaderArgs) => {
   const client = new Client(
      "postgresql://postgres:postgres@localhost:54322/postgres"
   );
   await client.connect();

   const result = await client.query("SELECT * FROM posts");

   return json({ hello: "world1", result: result.rows });
};
