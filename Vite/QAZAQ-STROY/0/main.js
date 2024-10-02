import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import './src/scss/main.scss';

const request = getList();
const tableWrapper = document.querySelector('#table-wrapper');

request.then((response) => {
    const svbTable = new SvbTable();

    console.log(response);    

    tableWrapper.appendChild(svbTable.element);
})
