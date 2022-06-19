import _User from "../models/user.model.js";
import { register, checkEmail, verifyOtp } from "../services/user.service.js";

export const regisUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!checkEmail(email)) {
      return res.status(401).json({ message: " email is existed" });
    }
    const { code, elements } = await register({ email });
    res.status(code).json({ code, elements });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const checkOtp = async (req, res, next) => {
  try {
    const { email, otp, name } = req.body;
    const { code, message, user } = await verifyOtp({ email, otp, name });
    res.status(code).json({ message, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// regis => generate otp = > send  => enter otp ? create user : bad
