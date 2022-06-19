"use strict";

import bcrypt from "bcrypt";
import _Otp from "../models/otp.model.js";

export const insertOtp = async ({ otp, email }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(otp, salt);
    console.log(otp);
    const OTP = await _Otp.create({ email, otp: hashOtp });
    return OTP ? 1 : 0; // NẾU TẠO THÀNH CÔNG THÌ TRẢ VỀ 1
  } catch (error) {
    console.error(error);
  }
};

export const validOtp = async ({ otp, hashOtp }) => {
  try {
    const isValid = await bcrypt.compare(otp, hashOtp);

    return isValid;
  } catch (error) {
    console.error(error);
  }
};
