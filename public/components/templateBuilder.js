import { Blog } from "../models/Blog.js";
import { Modal } from "../components/modal.js";
import * as commonTask from "../models/Common.js";
import * as statusHandler from "./statusHandler.js";
let { render, backdrop, submitBtn, statusClasses, formReset, formSetter, } = commonTask;
let { openStatus, operationStatus } = statusHandler;
const blog = new Blog("", "", "", "");
const modal = new Modal();
let blogs = "";
export const blogTemplateBuilder = (allBlogs) => {
    blogs = "";
    //if there is no blog.
    if (allBlogs === null) {
        render.innerHTML = `<h1 class="no-blog">THERE IS NO BLOG.</h1>`;
        commonTask.search.style.display = "none";
        return;
    }
    //if blog exist..
    if (allBlogs.length > 0) {
        //iterate all blogs and build unique blog for each blog.
        for (let b of allBlogs) {
            blogs += `
        <div class="blog" id="${b.id}">
          <div class="desc">
            <h3>${b.title}</h3>
            <p>${b.category}</p>
            <p class="blog-body">${b.body}</p>
          </div>
          <div class="controls">
            <button class="edit" id="${b.id}">Edit</button>
            <button class="delete" id="${b.id}">Delete</button>
          </div>
        </div>
      `;
        }
        render.innerHTML = blogs;
    }
    //THIS TWO METHODS CALLED BY RUNTIME...
    addUpdateEventListenerToEditButton();
    addDeleteEventListenerToEditButton();
};
/*
::
::EDIT blog listener.
::Need to dynamically add to the DOM(Doccument object model)
::
::
*/
const addUpdateEventListenerToEditButton = () => {
    const editBtnCollection = document.getElementsByClassName("edit");
    for (let editBtn of editBtnCollection) {
        editBtn.addEventListener("click", (e) => {
            submitBtn.value = "update";
            let b = blog.getBlog(editBtn.getAttribute("id"));
            formSetter(b);
            submitBtn.disabled = false;
        });
    }
};
/*
::
::after clicKing the delete button we have to show the MODAL eith BACKDROP
::MODAL has also two button EDIT and DELETE. So we need to add this two button
::to the MODAL dynamically depending on which blog has been clcKed by user.
::
*/
const addDeleteEventListenerToEditButton = () => {
    const deleteBtnCollection = document.getElementsByClassName("delete");
    for (let deleteBtn of deleteBtnCollection) {
        deleteBtn.addEventListener("click", () => {
            var _a, _b;
            //GETTING THE blogId
            let id = deleteBtn.getAttribute("id");
            let b = blog.getBlog(id);
            //BECKROP & MODAL
            backdrop.style.display = "block";
            backdrop.innerHTML = modal.modalTemplate(b);
            //Modal edit button
            (_a = document
                .getElementById("modalBlogEdit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                formSetter(b);
                //close the BACKDROP
                backdrop.style.display = "none";
                submitBtn.value = "update";
                submitBtn.disabled = false;
            });
            //Modal DELETE button
            (_b = document
                .getElementById("modalBlogDelete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                //DELETE blog
                blog.deleteBlog(id);
                //close the BACKDROP
                backdrop.style.display = "none";
                openStatus();
                operationStatus("Blog deleted successfully.", statusClasses[1]);
                //hiding currently deleted BLOG
                document.getElementById(b.id).style.display = "none";
            });
            //RESET the form
            formReset();
        });
    }
};
