import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    time: { type: Date, default: Date.now, index: { expires: 20 } },
  },
  { collection: "otp" }
);

export default mongoose.model("otp", OtpSchema);
