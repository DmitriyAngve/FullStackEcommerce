import { Router } from "express";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();
    res.status(201).json({ user });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword !== hashedPassword) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // create jwt token
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
