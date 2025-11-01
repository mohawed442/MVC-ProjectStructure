import { mongoose } from "../config/connect-mongo.js";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accessability: {
      type: String,
      enum: ["private", "public"],
      default: "public",
    },
    profile_pic: {
      public_id: { type: String, default: null },
      url: {
        type: String,
        default:
          "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg",
      },
    },
    bio: {
      type: String,
      maxlength: 160,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    phoneNumber: String,
    date_of_birth: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    followCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// 🔹 slugify username automatically before save
userSchema.pre("save", function (next) {
  this.userName = slugify(this.userName, { lower: true });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
