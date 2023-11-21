import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send({ currentUser: "Sabin" || null });
});

export { router as currentUserRouter };
