import { Blog } from "./Blog.js";

export type HI = HTMLInputElement;
export type HD = HTMLDivElement;
export const render = document.querySelector("#render") as HD;
export const backdrop = document.querySelector("#backdrop") as HD;
export const statusDiv = document.querySelector("#statusDiv") as HD;
export const errors = document.querySelector("#errors") as HD;
export const blogId = document.querySelector("#id") as HI;
export const title = document.querySelector("#title") as HI;
export const body = document.getElementById("body") as HI;
export const categories = document.querySelector("#categories") as HI;
export const submitBtn = document.getElementById("submitBtn") as HI;
export const search = document.getElementById("search") as HI;
export const errorClasses = ["alert alert-danger"];
// export const statusText: string = "";
export const statusClasses: string[] = ["success", "error"];

export const formSetter = (b: Blog) => {
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
