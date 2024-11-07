import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  // id автоматически генерируется и является первичным ключом
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

// omit - это вспомогательная функция, для исключения определенных полей
export const createProductSchema = createInsertSchema(productsTable).omit({
  id: true,
});

// partial - значит, что все поля опциональны
export const updateProductSchema = createInsertSchema(productsTable)
  .omit({
    id: true,
  })
  .partial();
