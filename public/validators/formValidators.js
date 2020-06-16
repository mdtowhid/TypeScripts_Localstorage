import * as common from "../models/Common.js";
export let errorText = "";
export let hasError = false;
let { title, body, categories, errors, errorClasses, submitBtn } = common;
export const formValidator = (element) => {
    let targetElemnt = element === null || element === void 0 ? void 0 : element.getAttribute("id");
    errorText = "";
    if (title.value.length < 5 && targetElemnt === "title") {
        errorText += `<p class="${errorClasses.join(" ")}">
                    Blog title must be grater than five characters
                </p>`;
        addValidationError();
        return false;
    }
    else if (body.value.length < 10 && targetElemnt === "body") {
        errorText += `<p class="${errorClasses.join(" ")}">
                        Blog descriptioin must be grater than ten characters
                    </p>`;
        addValidationError();
        return false;
    }
    else if (categories.value === "none" && targetElemnt === "categories") {
        errorText += `
                <p class="${errorClasses.join(" ")}">Please select blog category.</p>
                        `;
        addValidationError();
        return false;
    }
    else {
        errors.innerHTML = "";
    }
    if (title.value.length > 5 &&
        body.value.length > 10 &&
        categories.value !== "none") {
        submitBtn.disabled = false;
        return true;
    }
};
const addValidationError = () => {
    errors.innerHTML = errorText;
    submitBtn.disabled = true;
};
