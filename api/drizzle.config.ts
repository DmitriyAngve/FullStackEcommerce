import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/productsSchema.ts", "./src/db/usersSchema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // verbose устанавливает уровень подробности логов (удобно для отладки)
  strict: true, // указание быть строгой (строгая типизация, управление миграциями)
});
