# МогучийДД (MoguchiyDD)
# 2024.08.14, 11:34 PM
# first.py

from database import DatabaseCompanies


db = DatabaseCompanies()
db.db_connect()
db.db_create_table()
db.db_insert_data_into_table()
db.db_close()
