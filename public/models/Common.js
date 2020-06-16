export const render = document.querySelector("#render");
export const backdrop = document.querySelector("#backdrop");
export const statusDiv = document.querySelector("#statusDiv");
export const errors = document.querySelector("#errors");
export const blogId = document.querySelector("#id");
export const title = document.querySelector("#title");
export const body = document.getElementById("body");
export const categories = document.querySelector("#categories");
export const submitBtn = document.getElementById("submitBtn");
export const search = document.getElementById("search");
export const errorClasses = ["alert alert-danger"];
// export const statusText: string = "";
export const statusClasses = ["success", "error"];
export const formSetter = (b) => {
    blogId.value = b.id.toString();
    title.value = b.title;
    body.value = b.body;
    categories.value = b.category;
    return;
};
export const formReset = () => {
    title.value = "";
    body.value = "";
    categories.value = "none";
};
export const backdropCloser = () => (backdrop.style.display = "none");
