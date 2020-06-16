export class Blog {
    constructor(id, title, body, category) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.category = category;
        this.blogs = [];
        // private blog = { id: 1, title: "blog 1", body: "blog body", category: "" };
        this.getBlogs = () => this.purseBlogsFromStorage()
            ? this.purseBlogsFromStorage().reverse()
            : this.purseBlogsFromStorage();
        this.getBlog = (id) => {
            this.blogs = this.purseBlogsFromStorage();
            return this.blogs.find((b) => b.id === id);
        };
        this.putBlog = (b) => {
            this.blogs = this.getBlogs();
            let updateBlogObj = {
                id: b.id,
                title: b.title,
                body: b.body,
                category: b.category,
            };
            let index = this.blogs.map((x) => x.id === b.id).indexOf(b.id === b.id);
            this.blogs[index] = updateBlogObj;
            this.setBlog(this.blogs);
            return updateBlogObj;
        };
        this.postBlog = (b) => {
            b.id = Math.ceil(Math.random() * 99999) + "id";
            if (this.blogs.length === 0 && this.purseBlogsFromStorage() === null) {
                this.blogs.push(b);
            }
            else {
                this.blogs = this.purseBlogsFromStorage();
                this.blogs.push(b);
            }
            this.setBlog(this.blogs);
            return b;
        };
        this.deleteBlog = (id) => {
            this.blogs = this.getBlogs();
            let b = this.getBlog(id);
            let index = this.blogs.map((x) => x.id === id).indexOf(id === id);
            this.blogs.splice(index, 1);
            this.setBlog(this.blogs);
            return b;
        };
        this.purseBlogsFromStorage = () => JSON.parse(window.localStorage.getItem("Blogs"));
        this.setBlog = (b) => {
            window.localStorage.setItem("Blogs", JSON.stringify(b));
        };
        this.getBlogCategories = () => [
            "History",
            "Education",
            "Social",
            "Life's",
            "Lorem",
            "Programing",
            "Typescript",
        ];
    }
    //method implementation for ISearch interface.
    searchBlog(query) {
        query.toLowerCase();
        this.blogs = this.getBlogs();
        return this.blogs.filter((b) => b.title.toLowerCase().includes(query) ||
            b.body.toLowerCase().includes(query) ||
            b.category.toLowerCase().includes(query), []);
    }
}
