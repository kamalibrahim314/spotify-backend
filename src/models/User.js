import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export const roles = {
  user: "user",
  admin: "admin",
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, validate: (v) => validator.isEmail(v), },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: [roles.user, roles.admin], default: roles.user },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
