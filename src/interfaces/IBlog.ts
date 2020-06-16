import { Blog } from "../models/Blog";

export interface IBlog {
  getBlogs(): Blog[];
  getBlog(id: string): Blog;
  postBlog(blog: Blog): Blog;
  putBlog(blog: Blog): Blog;
  deleteBlog(id: string): Blog;
}
