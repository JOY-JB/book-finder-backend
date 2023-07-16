import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const newAdmin = await Admin.create(admin);

  return newAdmin;
};

const adminLogin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  const { id, adminData } = isAdminExist;

  if (!adminData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }

  if (
    adminData.password &&
    !(await Admin.isPasswordMatched(password, adminData.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    { id, role: adminData.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role: adminData.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const getAllUsers = async (): Promise<IUser[] | null> => {
//   const users = await User.find();

//   return users;
// };

// const getSingleUser = async (id: string): Promise<IUser | null> => {
//   const isExist = await User.findById(id);

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const user = await User.findById(id);

//   return user;
// };

// const updateUser = async (
//   id: string,
//   updatedData: Partial<IUser>
// ): Promise<IUser | null> => {
//   const isExist = await User.findById(id);

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const { name, ...userData } = updatedData;
//   const updatedUserData: Partial<IUser> = { ...userData };

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach((key) => {
//       const nameKey = `name.${key}` as keyof Partial<IUser>;
//       (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
//     new: true,
//   });

//   return updatedUser;
// };

// const deleteUser = async (id: string): Promise<IUser | null> => {
//   const isExist = await User.findById(id);

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }
//   const user = await User.findByIdAndDelete(id);

//   return user;
// };

export const AdminService = {
  createAdmin,
  adminLogin,
  // getAllUsers,
  // getSingleUser,
  // updateUser,
  // deleteUser,
};
