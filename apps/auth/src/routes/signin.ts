import { Router } from "express";

const router = Router();

router.post("/api/users/signin", (req, res) => {
    res.send("Logged In");
})

export { router as signInRouter };


