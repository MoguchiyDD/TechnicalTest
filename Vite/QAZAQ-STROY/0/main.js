import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import createModal from './src/components/svb-table/modal';
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
