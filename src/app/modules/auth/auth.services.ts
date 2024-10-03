import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { USER_Role } from "./auth.constant";
import bcryptJs from "bcryptjs";

const loginUser = async (payload: ILogin) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.CONFLICT, "User not found");
  } else {
    if (payload.password) {
      const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, "Password Incorrect!");
      }
    }
    const jwtPayload = {
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expire as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expire as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  // checking if the user is already deleted
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string
  );

  return {
    accessToken,
  };
};

const registerUser = async (userData: ILogin) => {
  if (userData.password) {
    userData.password = await bcryptJs.hash(
      userData.password,
      Number(config.bcrypt_salt)
    );
  }
  const user = await User.create({
    ...userData,
    role: USER_Role.user,
  });

  return user;
};

export const AuthServices = {
  loginUser,
  registerUser,
  refreshToken,
};
