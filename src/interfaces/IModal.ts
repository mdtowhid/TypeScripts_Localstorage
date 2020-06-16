import { Blog } from "../models/Blog";

export interface IModal<T> {
  modalBlogEdit(id: string): T;
  modalBlogDelete(id: string): void;
}
