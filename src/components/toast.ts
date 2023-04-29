import successToast from "@assets/toast-success.svg";
import failureToast from "@assets/error-white.svg";

import { $, createElement } from "@utils";

export const generateToast = (msg: string, success: boolean) => {
  const toast = createElement("div", { class: ["toast", success ? "success" : "error"] });
  const toastWrapper = createElement("div", { class: ["toast-wrapper"] });

  const toastStatus = createElement("div", { class: ["toast-status"] });
  const toastStatus__image = createElement("img", {
    class: ["toast-status__image"],
    src: success ? successToast : failureToast,
  });
  toastStatus.appendChild(toastStatus__image);

  const toastText__paragraph = createElement("p", { class: ["toast-text__paragraph"] }, msg);

  const toastButtonClose = createElement("button", { class: ["toast-button--close"] });
  const toastButton__CloseText = createElement("p", { class: ["toast-button__close-text"] }, "X");
  toastButtonClose.appendChild(toastButton__CloseText);

  toastWrapper.append(toastStatus, toastText__paragraph, toastButtonClose);
  toast.append(toastWrapper);

  const container = $("toast-container")!;
  container.insertBefore(toast, container.firstChild);
  console.log("toast generated");

  toast.classList.add("fadeInUpBig");

  setTimeout(() => {
    toast?.classList.add("fadeOutDownBig");
    Promise.all(toast.getAnimations().map((animation) => animation.finished)).then(() => toast?.remove());
  }, 3000);

  toastButtonClose.addEventListener("click", () => toast.remove());
  // return toast;
};
