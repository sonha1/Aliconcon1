"use strict";

import _User from "../models/user.model.js";
import otpGenerator from "otp-generator";
import { insertOtp, validOtp } from "./otp.service.js";
import _Otp from "../models/otp.model.js";

export const checkEmail = async email => {
  return (await _User.findOne({ email: email })) ? true : false;
};
export const register = async ({ email }) => {
  const user = await _User.findOne({ email: email });

  if (user) {
    return { code: 400, message: "this email is already in user" };
  }
  // const num = Math.floor(Math.random() * (999999 - 100000) + 1000000);
  // const otp = num.toString();
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  }); // chi lay so

  return { code: 200, elements: await insertOtp({ otp, email }) };
};

export const verifyOtp = async ({ email, otp, name }) => {
  try {
    const otpHolder = await _Otp.find({ email });
    if (!otpHolder.length) {
      return { code: 404, message: "Expired OTP!" };
    }

    const lastOtp = otpHolder[otpHolder.length - 1];
    console.log(otp, lastOtp.otp);

    const isOtpMatch = await validOtp({ otp, hOtp: lastOtp.otp });
    console.log(isOtpMatch);
    if (!isOtpMatch) {
      if (!otpHolder.length) {
        return { code: 401, message: "OTP not match" };
      }
    }
    const user = await _User.create({ email: email, name: name });

    return { code: 200, message: "OTP is correct", user };
  } catch (error) {
    console.log(error);
  }
};

export const createUSer = async ({ email, name }) => {};
