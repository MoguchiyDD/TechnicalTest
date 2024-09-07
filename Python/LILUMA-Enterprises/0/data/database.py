# МогучийДД (MoguchiyDD)
# 2024.08.14, 05:34 PM
# database.py

from psycopg2 import connect
from psycopg2.errors import SyntaxError

from pickle import load
from dotenv import load_dotenv
from os import getenv

load_dotenv()


class DatabaseCompanies:
    """
    Works with PostgreSQL

    ---
    FUNCTIONS:
    - db_connect() -> None : Connecting a database
    - db_close() -> None : Closing a database session
    - db_create_table() -> None : Creating a table in a database
    - db_insert_data_into_table(data: list[tuple] = [()]) -> None :
    Adding data to a database
    - db_name_year_select_table(name: str, year: int) -> list[tuple] | None :
    Takes data from a table in a database by columns name and year
    - db_one_company_select_table(name: str, type: str) -> list[tuple] | None :
    Takes all data from a table in a database by columns name
    """

    CONFIG = {
        "dbname": getenv("POSTGRES_DB"),
        "user": getenv("POSTGRES_USER"),
        "password": getenv("POSTGRES_PASSWORD"),
        "host": getenv("POSTGRES_HOST"),
        "port": getenv("POSTGRES_PORT")
    }
    ERROR_CONNECTION = "Run the function: db_connect"
    ERROR_INSERT_ARGS = "Arguments do not match a table in a database"

    def __init__(self) -> None:
        self.__table = "companies"
        self.__args = ("name", "year", "revenue", "expenses", "profit", "kpn")
        self._db = None
        self._db_cursor = None

    def __get_data(self) -> list[tuple]:
        """
        Gets the primary data from a pickle for a database
        """

        with open("data.pickle", "rb") as file:
            data = load(file)

        result = []
        for dt in data:
            result.append((
                dt["name"],
                dt["year"],
                dt["revenue"],
                dt["expenses"],
                dt["profit"],
                dt["kpn"]
            ))

        return result

    def db_connect(self) -> None:
        """
        Connecting a database

        ---
        RETURN: Cursor for processing commands
        """

        self._db = connect(**self.CONFIG)
        self._db_cursor = self._db.cursor()

    def db_close(self) -> None:
        """
        Closing a database session
        """

        self._db_cursor.close()
        self._db.close()

    def db_create_table(self) -> None:
        """
        Creating a table in a database
        """

        schema = """
            id SERIAL PRIMARY KEY,
            %s VARCHAR(255) NOT NULL,
            %s INT NOT NULL,
            %s FLOAT NOT NULL,
            %s FLOAT NOT NULL,
            %s FLOAT NOT NULL,
            %s FLOAT NOT NULL
        """ % self.__args

        if hasattr(self, "_db_cursor") and hasattr(self, "_db"):
            query = f"CREATE TABLE IF NOT EXISTS {self.__table} "
            query += f"({schema})"
            self._db_cursor.execute(query)
            self._db.commit()
        else:
            print(self.ERROR_CONNECTION)

    def db_insert_data_into_table(self, data: list[tuple] = [()]) -> None:
        """
        Adding data to a database

        ---
        - data: list[tuple] -> Data for adding to the table in the database,
        if not specified then will be added from the «data.pickle» file
        """

        if hasattr(self, "_db_cursor") and hasattr(self, "_db"):
            insert_query = f"INSERT INTO {self.__table}"

            # to create a query generation
            text_args = ", ".join(self.__args)
            generate_values = ", ".join(["%s" for _ in self.__args])
            insert_query += f" ({text_args}) VALUES ({generate_values})"

            # insert
            try:
                if len(data[0]) == 0:
                    data = self.__get_data()

                self._db_cursor.executemany(insert_query, data)
                self._db.commit()
            except SyntaxError:
                print(self.ERROR_INSERT_ARGS)
        else:
            print(self.ERROR_CONNECTION)

    def db_name_year_select_table(
        self,
        name: str,
        year: int
    ) -> list[tuple] | None:
        """
        Takes data from a table in a database by columns name and year

        ---
        - name: str -> Column name
        - year: int -> Column year
        """

        if hasattr(self, "_db_cursor"):
            query = f"SELECT * FROM {self.__table} WHERE "
            query += f"name = '{name}' AND year = {year}"
            self._db_cursor.execute(query)
            rows = self._db_cursor.fetchall()
            return rows
        else:
            print(self.ERROR_CONNECTION)

    def db_one_company_select_table(
        self,
        name: str,
        type: str
    ) -> list[tuple] | None:
        """
        Takes all data from a table in a database by columns name

        ---
        - name: str -> Company name
        - type: str -> Type of Field
        """

        if hasattr(self, "_db_cursor"):
            query = f"SELECT year, {type} FROM {self.__table} "
            query += f"WHERE name = '{name}'"
            query += "ORDER BY year ASC"
            self._db_cursor.execute(query)
            rows = self._db_cursor.fetchall()
            return rows
        else:
            print(self.ERROR_CONNECTION)
