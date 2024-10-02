import './styles/svb-table.scss'

export default class SvbTable {
  constructor() {
    this.element = null;
    this.render();
  }

  render() {
    this.element = SvbTable.createElement('table', 'doc-list-table', 'svb-table', `
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
      </tbody>    
    `);
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

  /**
   * @author MoguchiyDD
   * @description Clears the current table rows and loads new data
   * @param {object} list Result from getList() function
   * @returns {None}
   */
  loadRows(list) {
    const { settings, columns, rows } = list;

    // HEAD
    const thead = this.element.querySelector("thead");
    let head = document.createElement("tr");
    let th = document.createElement("th");
    th.textContent = '#';
    head.appendChild(th);

    Object.entries(settings).forEach(([key, value]) => {
      th = document.createElement("th");
      th.textContent = value.represent;
      th.dataset.name = value.name;
      if (value.textAlign !== '') th.style.textAlign = value.textAlign;
      head.appendChild(th);
    });
    thead.innerHTML = head.innerHTML;

    // BODY
    const tbody = this.element.querySelector("tbody");
    tbody.innerHTML = '';

    rows.forEach((row, i) => {
      const tr = document.createElement("tr");

      columns.forEach((column, j) => {
        const td = document.createElement("td");
        const cellValue = row[j];

        if (settings[column]) {
          switch(j) {
            case 1:  // docdate
              td.textContent = this.formatDate(cellValue);
              break;
            case 3:  // contract
              const link = document.createElement('a');
              link.href = '#';
              link.target = "_blank";
              link.textContent = cellValue.r;
              td.appendChild(link);
              td.dataset.uuid = cellValue.v;
              break;
            case 8:  // sum
            case 9:  // sumfact
              td.textContent = cellValue + " ₸";
              break;
            default:
              if (typeof cellValue === "object" && cellValue.r) {
                td.textContent = cellValue.r;
                td.dataset.uuid = cellValue.v;
              } else td.textContent = cellValue;
              break;
          }

          if (settings[column].textAlign) td.style.textAlign = settings[column].textAlign;
        } else td.textContent = ++i;

        if (j === 0) tr.dataset.uuid = cellValue;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  formatDate(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${year}.${month}.${day}`;
  }
}