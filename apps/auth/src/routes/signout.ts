import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
    res.send("Logged Out");
})

export { router as signOutRouter };


