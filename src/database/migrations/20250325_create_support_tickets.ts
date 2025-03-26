// This is a sample migration file
// The actual implementation would depend on your migration system

import type { Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  // Create support_tickets table
  await db.schema
    .createTable("support_tickets")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement())
    .addColumn("user_id", "bigint", (col) => col.notNull())
    .addColumn("category", "varchar(20)", (col) => col.notNull())
    .addColumn("subject", "varchar(150)", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .addColumn("admin_id", "bigint")
    .addColumn("created_at", "bigint", (col) => col.notNull())
    .addColumn("updated_at", "bigint", (col) => col.notNull())
    .addForeignKeyConstraint("fk_support_tickets_user", ["user_id"], "users", ["id"])
    .addForeignKeyConstraint("fk_support_tickets_admin", ["admin_id"], "users", ["id"])
    .execute()

  // Add indexes for better performance
  await db.schema.createIndex("idx_support_tickets_user_id").on("support_tickets").column("user_id").execute()

  await db.schema.createIndex("idx_support_tickets_admin_id").on("support_tickets").column("admin_id").execute()

  await db.schema.createIndex("idx_support_tickets_status").on("support_tickets").column("status").execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("support_tickets").execute()
}

