import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find();

  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedBook;
};

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(payload);

  return newBook;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
