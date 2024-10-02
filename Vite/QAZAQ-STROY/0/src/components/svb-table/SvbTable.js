import './styles/svb-table.scss'

export default class SvbTable {
    /** Это пример */
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
}