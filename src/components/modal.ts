import { IModal } from "../interfaces/IModal.js";
import { Blog } from "../models/Blog.js";

export class Modal implements IModal<object> {
  blog = new Blog("", "", "", "");

  modalBlogDelete(id: string) {
    let b: Blog = this.blog.deleteBlog(id);
  }

  modalBlogEdit = (id: string) => this.blog.getBlog(id);

  modalTemplate = (b: Blog) => {
    return `
    <div id="singleBlog">
      <div>${b.title}</div>
      <div>${b.category}</div>
      <div>${b.body}</div>
      <br>
      <button id="modalBlogEdit">Edit</button>
      <button id="modalBlogDelete">Delete</button>
    </div>
  `;
  };
}
