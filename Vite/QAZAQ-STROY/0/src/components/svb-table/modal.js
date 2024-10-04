/**
 * @author MoguchiyDD
 * @description Create the modal window
 * @returns Modal Window (content)
 */
const createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add("modal");

  const modalContentDiv = document.createElement("div");
  modalContentDiv.classList.add("modal-content");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close");
  closeButton.innerHTML = "&times;";

  modalContentDiv.appendChild(closeButton);
  modal.appendChild(modalContentDiv);
  document.body.appendChild(modal);
  modal.style.display = "block";

  closeButton.onclick = function () {
    modal.style.display = "none";
    document.body.removeChild(modal);
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.removeChild(modal);
    }
  };

  return modalContentDiv;
}

export default createModal;
