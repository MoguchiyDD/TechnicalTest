import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import './src/scss/main.scss';

const request = getList();
const tableWrapper = document.querySelector("#table-wrapper");
const addDataToTable = document.getElementById("add-data");
const removeDataToTable = document.getElementById("remove-data");

const svbTable = new SvbTable();

request.then((response) => {
  tableWrapper.appendChild(svbTable.element);
  svbTable.loadRows(response);
  document.querySelector("body").style.overflow = "hidden";
})

addDataToTable.onclick = () => {
  const modalContent = createModal();
  request.then(response => svbTable.addRow(modalContent, response.settings, response.rows.length));
};

removeDataToTable.onclick = () => {
  svbTable.removeRow();
};


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
};
