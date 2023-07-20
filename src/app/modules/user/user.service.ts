import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();

  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const newUser = await User.create(payload);

  return newUser;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
};
