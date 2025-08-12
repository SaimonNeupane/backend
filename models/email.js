import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ["member", "subscription"] },
});

// Create the compound unique index
schema.index({ email: 1, role: 1 }, { unique: true });

const User = mongoose.model("User", schema);

export default User;
