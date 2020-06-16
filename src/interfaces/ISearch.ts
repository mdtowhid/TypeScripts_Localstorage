import { Blog } from "../models/Blog";

export interface ISearch {
  searchBlog(query: string): Blog[];
}
