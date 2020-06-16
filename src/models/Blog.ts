import { IBlog } from "../interfaces/IBlog";
import { ISearch } from "../interfaces/ISearch.js";

export class Blog implements IBlog, ISearch {
  constructor(
    public id: string,
    public title: string,
    public body: string,
    public category: string
  ) {}

  private blogs = [] as Blog[];

  // private blog = { id: 1, title: "blog 1", body: "blog body", category: "" };

  getBlogs = () =>
    this.purseBlogsFromStorage()
      ? this.purseBlogsFromStorage().reverse()
      : this.purseBlogsFromStorage();

  getBlog = (id: string) => {
    this.blogs = this.purseBlogsFromStorage();
    return this.blogs.find((b) => b.id === id) as Blog;
  };

  putBlog = (b: Blog) => {
    this.blogs = this.getBlogs();
    let updateBlogObj = {
      id: b.id,
      title: b.title,
      body: b.body,
      category: b.category,
    } as Blog;

    let index = this.blogs.map((x) => x.id === b.id).indexOf(b.id === b.id);
    this.blogs[index] = updateBlogObj;
    this.setBlog(this.blogs);
    return updateBlogObj;
  };

  postBlog = (b: Blog) => {
    b.id = Math.ceil(Math.random() * 99999) + "id";
    if (this.blogs.length === 0 && this.purseBlogsFromStorage() === null) {
      this.blogs.push(b);
    } else {
      this.blogs = this.purseBlogsFromStorage() as Blog[];
      this.blogs.push(b);
    }

    this.setBlog(this.blogs);
    return b;
  };

  deleteBlog = (id: string) => {
    this.blogs = this.getBlogs();
    let b = this.getBlog(id);
    let index = this.blogs.map((x) => x.id === id).indexOf(id === id);
    this.blogs.splice(index, 1);
    this.setBlog(this.blogs);
    return b;
  };

  private purseBlogsFromStorage = () =>
    JSON.parse(window.localStorage.getItem("Blogs")!);

  private setBlog = (b: Blog[]) => {
    window.localStorage.setItem("Blogs", JSON.stringify(b));
  };

  getBlogCategories = () => [
    "History",
    "Education",
    "Social",
    "Life's",
    "Lorem",
    "Programing",
    "Typescript",
  ];

  //method implementation for ISearch interface.
  searchBlog(query: string) {
    query.toLowerCase();
    this.blogs = this.getBlogs();
    return this.blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.body.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query),
      []
    );
  }
}
