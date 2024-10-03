import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

// user Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    img: {
      type: String,
      default: "https://i.ibb.co.com/Xjjd68g/default-user.jpg",
    },
    following: [
      {
        type: Schema.Types.ObjectId, 
        ref: "User", 
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId, 
        ref: "User", 
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  doc.isSelected("password");
  next();
});

export const User = model<IUser>("User", userSchema);
