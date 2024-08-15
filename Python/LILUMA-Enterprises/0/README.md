# Python/LILUMA Enterprises
**Telegram Bot**. Hard-coded financial bot with four companies. It is possible to add and display information in the form of graphs. No filtering.

The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Started & Finished" src="https://img.shields.io/badge/Started%20&%20Finished-~1 day-F9A825?style=for-the-badge" />
  <img alt="Language" src="https://img.shields.io/badge/Language-Russian-3E2723?style=for-the-badge" />
</div>

## Installed
<div id="installed" align="left">
  <a href="https://pypi.org/project/aiogram/" target="_blank">
    <img alt="PyPi aiogram" src="https://img.shields.io/badge/PyPi-aiogram-0073B7?style=for-the-badge" />
  </a>
  <a href="https://pypi.org/project/matplotlib/" target="_blank">
    <img alt="PyPi matplotlib" src="https://img.shields.io/badge/PyPi-matplotlib-0073B7?style=for-the-badge" />
  </a>
  <a href="https://pypi.org/project/psycopg2-binary/" target="_blank">
    <img alt="PyPi psycopg2-binary" src="https://img.shields.io/badge/PyPi-psycopg2--binary-0073B7?style=for-the-badge" />
  </a>
  <a href="https://pypi.org/project/python-dotenv/" target="_blank">
    <img alt="PyPi python-dotenv" src="https://img.shields.io/badge/PyPi-python--dotenv-0073B7?style=for-the-badge" />
  </a>
</div>

## Bot Commands
- **/start**: Launch bot
- **/append**: Add an annual report for a company
- **/graphic**: Display company data as a graph

## Commands
```Bash
# Virtual Window (Python)
$ python -m venv <NAME>
# for Linux and MacOS : source <NAME>/bin/activate
# for Windows : <NAME>\Scripts\activate
$ pip install -r requirements.txt  # Installation of Packages 

# RUN
# ```First fill out the «.env» file like «.env.test»```
$ docker compose up -d
# Create the table in a database and Load 4 companies
$ cd data && python first.py
$ cd .. && python main.py
```
