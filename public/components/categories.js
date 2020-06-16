import { Blog } from "../models/Blog.js";
export const categoryOptionTemplate = () => {
    const blog = new Blog("", "", "", "");
    let categories = blog.getBlogCategories();
    let data = "";
    for (let category of categories) {
        data += `<option>${category}</option>`;
    }
    return data;
};
