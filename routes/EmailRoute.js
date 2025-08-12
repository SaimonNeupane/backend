import { Router } from "express";
import { EmailValidator } from "../controller/emailValidator.js";
import { sendEmailForVolunteer } from "../controller/emailSender.js";
const router = Router();

router.post("/verify", EmailValidator);
router.post("/send", sendEmailForVolunteer);
router.get("/", (req, res) => {
  res.status(200).json({ message: "Email route is working" });
});

export default router;
