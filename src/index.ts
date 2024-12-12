import { Hono } from "hono";
import { sql } from "drizzle-orm";
import { db } from "@/db/connection";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const query = sql`select "hello world" as text`;
const result = db.get<{ text: string }>(query);
console.log(result);

export default app;
