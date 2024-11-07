import { Router } from "express";
import { createUserSchema } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";

const router = Router();

router.post("/register", validateData(createUserSchema), (req, res) => {
  console.log(req.cleanBody);
  res.send(200);
});

router.post("/login", (req, res) => {
  res.send(200);
});

export default router;
