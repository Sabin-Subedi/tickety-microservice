import { Router } from "express";

const router = Router();

router.post("/api/users/signup", (req, res) => {
    res.send("Logged In");
})

export { router as signUpRouter };


