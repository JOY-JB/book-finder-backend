import { IBook } from "./book.interface";
import { Book } from "./book.model";

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find();

  return result;
};

export const BookService = {
  getAllBooks,
};
