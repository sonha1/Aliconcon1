import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    name: { type: String, required: true },
  },
  { collection: "user", timestamps: true }
);

export default mongoose.model("user", UserSchema);
