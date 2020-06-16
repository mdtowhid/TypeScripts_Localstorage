import * as commonTask from "../models/Common.js";

let { statusDiv } = commonTask;

export const operationStatus = (statusText: string, statusClass: string) => {
  statusDiv.innerHTML = `
    <div class="${statusClass}">${statusText}</div>            
    `;

  setTimeout(() => {
    statusDiv.innerHTML = "";
  }, 2000);
};

export const openStatus = () => (statusDiv.style.display = "block");
