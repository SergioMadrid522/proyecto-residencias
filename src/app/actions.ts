// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
const databaseUrl = process.env.DATABASE_URL;
const sql = neon(databaseUrl!);

export async function getData() {
  const data = await sql`SELECT * FROM roles`;
  return data;
}
