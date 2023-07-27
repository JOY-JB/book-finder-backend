import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();

  return result;
};

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });
  return result;
};

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const newUser = await User.create(payload);

  return newUser;
};

const addBookToWishList = async (
  userEmail: string,
  bookId: string
): Promise<string[] | null> => {
  const user = await User.findOne({ email: userEmail });

  if (user && !user.wishlist.includes(bookId)) {
    user.wishlist.push(bookId);
    await user.save();
  }

  return user ? user.wishlist : null;
};

const removeBookFromWishList = async (
  userEmail: string,
  bookId: string
): Promise<null> => {
  const user = await User.findOne({ email: userEmail });

  if (user && user.wishlist.includes(bookId)) {
    user.wishlist = user.wishlist.filter((book) => book.toString() !== bookId);
    await user.save();
  }

  return null;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  addBookToWishList,
  removeBookFromWishList,
};
