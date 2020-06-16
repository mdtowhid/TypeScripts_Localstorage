//import MODULES from files(from components , models & validators folder)
import { Blog } from "./models/Blog.js";
import { categoryOptionTemplate } from "./components/categories.js";
import * as templateBuilder from "./components/templateBuilder.js";
import * as formValidators from "./validators/formValidators.js";
import * as commonTask from "./models/Common.js";
import * as statusHandler from "./components/statusHandler.js";

//object Destucting...
let {
  blogId,
  categories,
  submitBtn,
  search,
  title,
  body,
  formReset,
  statusClasses,
} = commonTask;
let { formValidator } = formValidators;
let { openStatus, operationStatus } = statusHandler;

//BLOG object creation
let blog = new Blog("", "", "", "");

//touples...
let values: [string, string, string, string];

//setup inital window...
window.addEventListener("load", () => {
  //build initial template...
  templateBuilder.blogTemplateBuilder(blog.getBlogs());
  //dynamic dropdwn input select element
  categories.innerHTML += categoryOptionTemplate();
});

//each form field validations...
title.addEventListener("change", () => formValidator(title));
body.addEventListener("change", () => formValidator(body));
categories.addEventListener("change", () => formValidator(categories));

//SUBMIT button...
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  values = [blogId.value, title.value, body.value, categories.value];
  let blogObj = new Blog(...values);

  //is form valid?
  if (formValidators.formValidator()) {
    //INSERT blog if button text is "store"
    if (submitBtn.value === "store") {
      blog.postBlog(blogObj);
      openStatus();
      operationStatus("New blog added successfully.", statusClasses[0]);
    } else {
      //OTHERWISE update blog
      blog.putBlog(blogObj);

      openStatus();
      operationStatus("Blog updated successfully.", statusClasses[0]);
      //set submit button text to "store" after UPDATES;
      submitBtn.value = "store";
    }
    //set the form in inital state after doing INSERT/UPDATE operations
    templateBuilder.blogTemplateBuilder(blog.getBlogs());
    formReset();
    submitBtn.disabled = true;
  }
});

search.addEventListener("keyup", (e) => {
  let searchText = search.value;
  let blogs: Blog[] = [];
  if (searchText.length > 3) {
    blogs = blog.searchBlog(searchText);
    if (blogs.length > 0) {
      templateBuilder.blogTemplateBuilder(blogs);
    } else {
      commonTask.render.innerHTML = `<h1 class="not-found-searched-blog">Not found any blog with <b>${searchText}</b></h1>`;
    }
  } else {
    templateBuilder.blogTemplateBuilder(blog.getBlogs());
  }
});

//PLEASE READ READ.me file to better understand...
