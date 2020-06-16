import { Blog } from "../models/Blog.js";
export class Modal {
    constructor() {
        this.blog = new Blog("", "", "", "");
        this.modalBlogEdit = (id) => this.blog.getBlog(id);
        this.modalTemplate = (b) => {
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
    modalBlogDelete(id) {
        let b = this.blog.deleteBlog(id);
    }
}
