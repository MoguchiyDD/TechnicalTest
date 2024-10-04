import createModal from './modal';
import './styles/svb-table.scss'
import './styles/modal.scss'

export default class SvbTable {
  constructor() {
    this.element = null;
    this.render();
  }

  render() {
    this.element = SvbTable.createElement('table', 'doc-list-table', 'svb-table', SvbTable.getTableHTML());
  }

  static CURRENCY = " ₸";
  static INDEX_WITHOUT_CURRENCY = 0;
  static COLUMN_DOCDATE = 1;
  static COLUMN_CONTRACT = 3;
  static COLUMN_SUM = 8;
  static COLUMN_SUMFACT = 9;
  static COLUMNS_WITH_UUID = [3, 4, 5, 7];
  static COLUMNS_WITH_NUMBER_TYPE = [9, 10, 11];
  static COLUMNS_WITH_NUMBER_TYPE_INTEGER = [11];
  static COLUMNS_WITH_NUMBER_TYPE_FLOAT_WITHOUT_START = [7, 8];
  static START_INDEX_CHECKBOX = 0;
  static START_INDEX_NUMBER = 1;
  static START_INDEX_TO_TABLE = 2;

  // ------------ CREATE ------------

  /**
   * @description text: thead, tbody
   * @returns string
   */
  static getTableHTML() {
    return `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Country</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
        ${SvbTable.getInitialRowsHTML()}
      </tbody>
    `;
  }

  /**
   * @description text fpr tbody
   * @returns string
   */
  static getInitialRowsHTML() {
    return `
      <tr>
        <td>1</td>
        <td>John Doe</td>
        <td>25</td>
        <td>USA</td>
        <td>john.doe@example.com</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Smith</td>
        <td>30</td>
        <td>Canada</td>
        <td>jane.smith@example.com</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Mike Johnson</td>
        <td>28</td>
        <td>UK</td>
        <td>mike.johnson@example.co.uk</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Emily White</td>
        <td>22</td>
        <td>Australia</td>
        <td>emily.white@example.au</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Chris Brown</td>
        <td>35</td>
        <td>Germany</td>
        <td>chris.brown@example.de</td>
      </tr> 
    `;
  }

  /**
   * 
   * @param {string} tagname 
   * @param {string | null} id 
   * @param {string | null} classList 
   * @param {string | null} innerHTML 
   * @returns {HTMLElement}
   */
  static createElement(tagname, id = null, classList = null, innerHTML = null) {
    const element = document.createElement(tagname);
    if (id) element.id = String(id);
    if (classList) {
      const classNames = classList.split(' ');
      classNames.forEach((name) => {
        element.classList.add(name);
      });
    }
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }

  // --------------------------------


  // ------------- LOAD -------------

  /**
   * @author MoguchiyDD
   * @description Clears the current table rows and loads new data
   * @param {object} list Result from getList() function
   * @returns {None}
   */
  loadRows(list) {
    const { settings, columns, rows } = list;
    SvbTable.updateTableHead(this.element, settings);
    SvbTable.updateTableBody(this.element, settings, columns, rows);
  }

  /**
   * @author MoguchiyDD
   * @description Adding header for table
   * @param {HTMLElement} element HTML Element
   * @param {object} settings from getList function
   * @returns header
   */
  static updateTableHead(element, settings) {
    const thead = element.querySelector("thead");
    const head = document.createElement("tr");
    head.appendChild(SvbTable.createHeaderCell(' '));
    head.appendChild(SvbTable.createHeaderCell('#'));
    thead.innerHTML = '';

    Object.entries(settings).forEach(([_, value]) => {
      head.appendChild(SvbTable.createHeaderCell(value.represent, value.name, value.textAlign));
    });

    thead.appendChild(head);
  }

  /**
   * @author MoguchiyDD
   * @description Adding body for table
   * @param {HTMLElement} element HTML Element
   * @param {object} settings from getList function
   * @param {Array} columns from getList function
   * @param {Array} rows from getList function
   * @returns body
   */
  static updateTableBody(element, settings, columns, rows) {
    const tbody = element.querySelector("tbody");
    tbody.innerHTML = '';

    rows.forEach((row, i) => {
      const tr = SvbTable.createTabRow(i, settings, columns, row);
      tbody.appendChild(tr);
    });

    tbody.appendChild(SvbTable.addEmptyTR(columns));
  }

  /**
   * @author MoguchiyDD
   * @description Create th for header in table
   * @param {string} text title
   * @param {string} [name=''] for dataset.name
   * @param {string} [textAlign=''] alignment
   * @returns th tag
   */
  static createHeaderCell(text, name = '', textAlign = '') {
    const th = document.createElement("th");
    th.textContent = text;
    th.dataset.name = name;
    if (textAlign) th.style.textAlign = textAlign;
    return th;
  }

  /**
   * @author MoguchiyDD
   * @description Create an input for remove row(s) to table
   * @returns td tag
   */
  static createCheckTabRow() {
    const td = document.createElement("td");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    label.className = "custom-checkbox";
    input.type = "checkbox";
    input.name = "checkbox";
    span.className = "checkmark";

    label.appendChild(input);
    label.appendChild(span);
    td.appendChild(label);

    return td;
  }

  /**
   * 
   * @param {int} index index row
   * @param {object} settings from getList function
   * @param {Array} columns from getList function
   * @param {string | object} row from getList function : rows
   * @returns tr tag
   */
  static createTabRow(index, settings, columns, row) {
    const tr = document.createElement("tr");
    tr.appendChild(SvbTable.createCheckTabRow());
    
    columns.forEach((column, j) => {
      const td = document.createElement("td");
      const cellValue = row[j];
      
      if (settings[column]) SvbTable.rowsTable(settings[column], j, td, cellValue);
      else {
        td.textContent = ++index;
        td.style.textAlign = "center";
      }

      if (j === SvbTable.START_INDEX_NUMBER) tr.dataset.uuid = cellValue;
      tr.appendChild(td);
    });
    
    tr.onclick = (e) => {
      const tds = e.currentTarget.querySelectorAll("td");
      SvbTable.getActiveRow(tds, settings);
    }
    return tr;
  }

  // --------------------------------


  // ------------- ADD --------------

  /**
   * @author MoguchiyDD
   * @description Add one row to table
   * @param {HTMLElement} modalContent Modal Window (content)
   * @param {object} settings from getList function
   * @param {int} rowLength length of row (from getList function)
   */
  addRow(modalContent, settings, rowLength) {
    const form = SvbTable.createForm(settings);
    modalContent.appendChild(form);
    form.addEventListener("submit", (e) => SvbTable.handleFormSubmit(e, this.element, modalContent, form, settings, rowLength));
  }

  /**
   * @author MoguchiyDD
   * @description Create a form to table (add) for modal window
   * @param {object} settings from getList function
   * @returns form tag
   */
  static createForm(settings, tds = null) {
    const fields = SvbTable.getFormFields(settings);
    const form = document.createElement("form");
    let index = 0;

    fields.forEach(field => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = field.name;
      form.appendChild(label);

      const input = document.createElement("input");
      input.id = field.name;
      input.type = field.type;
      input.name = field.name;
      input.required = true;

      if (SvbTable.COLUMNS_WITH_NUMBER_TYPE_FLOAT_WITHOUT_START.includes(index)) {
        input.step = "0.1";
      }
      if (tds !== null) {
        input.value = tds[index];
        input.readOnly = true;
      }
      ++index;

      form.appendChild(input);
      form.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Добавить";
    form.appendChild(submitButton);

    return form;
  }

  /**
   * @author MoguchiyDD
   * @description Generate fields for form to table
   * @param {object} settings from getList function
   * @returns fields
   */
  static getFormFields(settings) {
    return Object.entries(settings).map(([key, value], index) => {
      return {
        label: value.represent,
        name: key,
        textAlign: value.textAlign,
        type: index === 0 ? "date" : (index >= 7 && index <= 9 ? "number" : "text")
      };
    });
  }

  /**
   * @author MoguchiyDD
   * @description Submit Event for adding row
   * @param {object} e event
   * @param {HTMLElement} element HTML Element
   * @param {HTMLElement} modalContent Modal Window (content)
   * @param {HTMLElement} form Form for Table
   * @param {object} settings from getList function
   * @param {int} rowLength length of row (from getList function)
   */
  static handleFormSubmit(e, element, modalContent, form, settings, rowLength) {
    e.preventDefault();

    const formData = new FormData(form);
    SvbTable.addRowToTable(element, formData, settings, rowLength);
    form.reset();

    const modal = modalContent.parentElement;
    modal.style.display = "none";
    document.body.removeChild(modal);
  }

  /**
   * @author MoguchiyDD
   * @description Adding one row for table
   * @param {HTMLElement} element HTML Element
   * @param {object} formData from FormData
   * @param {object} settings from getList function
   * @param {int} rowLength length of row (from getList function)
   */
  static addRowToTable(element, formData, settings, rowLength) {
    const tbody = element.querySelector("tbody");
    const tbodyLastTR = tbody.lastElementChild;
    tbody.removeChild(tbodyLastTR);

    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = rowLength + 1;
    td.dataset.uuid = SvbTable.generateUUID();
    tr.appendChild(td);

    const keys = Object.keys(settings);
    let index = SvbTable.START_INDEX_TO_TABLE;
    for (let [_, value] of formData.entries()) {
      const td = document.createElement("td");
      if (SvbTable.COLUMNS_WITH_UUID.includes(index)) value = {'v': SvbTable.generateUUID(), 'r': value};
      SvbTable.rowsTable(settings[keys[index - 1]], index, td, value);
      tr.appendChild(td);
      index++;
    }

    tbody.appendChild(tr);
    tbody.appendChild(SvbTable.addEmptyTR(settings));
  }

  /**
   * @author MoguchiyDD
   * @description Adding one empty row
   * @param {object} settings from getList function
   * @returns tr tag
   */
  static addEmptyTR(settings) {
    const tr = document.createElement("tr");
    Object.entries(settings).forEach(_ => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    return tr;
  }

  // --------------------------------


  // ------------ REMOVE ------------

  /**
   * @author MoguchiyDD
   * @description Remove some rows or one row to table
   */
  removeRow() {
    const tbody = this.element.querySelector("tbody");
    const trWithoutLast = [...tbody.querySelectorAll("tr")].slice(0, -1);
    const rowsToDelete = [];

    trWithoutLast.forEach(row => {
      const td = row.querySelectorAll("td")[SvbTable.START_INDEX_CHECKBOX];
      const input = td.querySelector("input");
      if (input.checked) rowsToDelete.push(row);
    });

    rowsToDelete.forEach(row => {
      tbody.removeChild(row);
    });

    const _trWithoutLast = [...tbody.querySelectorAll("tr")].slice(0, -1);
    let index = SvbTable.START_INDEX_NUMBER;
    _trWithoutLast.forEach(key => {
      const td = key.querySelectorAll("td")[SvbTable.START_INDEX_NUMBER];
      td.textContent = index;
      index++;
    });
  }

  // --------------------------------


  // ------------ ACTIVE ------------

  /**
   * @author MoguchiyDD
   * @param {HTMLElement} tds Many td from tr to table
   * @param {object} settings from getList function
   */
  static getActiveRow(tds, settings) {
    const modalContent = createModal();
    const rows = [];

    tds.forEach((td, index) => {
      if (index > SvbTable.START_INDEX_NUMBER) {
        if (SvbTable.COLUMNS_WITH_NUMBER_TYPE.includes(index)) {
          let num = td.textContent.split(SvbTable.CURRENCY)[SvbTable.INDEX_WITHOUT_CURRENCY];
          if (SvbTable.COLUMNS_WITH_NUMBER_TYPE_INTEGER.includes(index)) num = parseInt(num);
          else num = parseFloat(num);
          rows.push(num);
        } else if (index === SvbTable.COLUMN_DOCDATE + SvbTable.START_INDEX_NUMBER) {
          rows.push(SvbTable.formatDateDotsToDashes(td.textContent));
        } else rows.push(td.textContent);
      }
    });

    const form = SvbTable.createForm(settings, rows);
    modalContent.appendChild(form);
  }

  // --------------------------------


  // ------------ OTHER -------------

  /**
   * @author MoguchiyDD
   * @description From **2024-10-03 20:30:00** to **03.10.2024**
   * @param {string} dateString 2024-10-03 20:30:00
   * @returns 03.10.2024
   */
  static formatDateDots(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${day}.${month}.${year}`;
  }

  /**
   * @author MoguchiyDD
   * @description From **03.10.2024** to **2024-10-03**
   * @param {string} dateString 03.10.2024
   * @returns 2024-10-03
   */
  static formatDateDotsToDashes(dateString) {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  }

  /**
   * @author MoguchiyDD
   * @description Generate UUID
   * @returns UUID
   */
  static generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * @author MoguchiyDD
   * @description Fills in rows for a table
   * @param {object} column Response from API data
   * @param {int} index Index for correct formatting of rows in table from API data
   * @param {HTMLElement} td Link **td** element to **tr**
   * @param {string | object} cellValue Values ​​for the table
   */
  static rowsTable(column, index, td, cellValue) {
    switch(index) {
      case SvbTable.COLUMN_DOCDATE:
        td.textContent = SvbTable.formatDateDots(cellValue);
        break;
      case SvbTable.COLUMN_CONTRACT:
        const link = document.createElement('a');
        link.href = '#';
        link.target = "_blank";
        link.textContent = cellValue.r;
        td.appendChild(link);
        td.dataset.uuid = cellValue.v;
        break;
      case SvbTable.COLUMN_SUM:
      case SvbTable.COLUMN_SUMFACT:
        td.textContent = cellValue + SvbTable.CURRENCY;
        break;
      default:
        if (typeof cellValue === "object" && cellValue.r) {
          td.textContent = cellValue.r;
          td.dataset.uuid = cellValue.v;
        } else td.textContent = cellValue;
        break;
    }

    if (column.textAlign) td.style.textAlign = column.textAlign;
  }

  // --------------------------------
}
