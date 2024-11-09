# Python/LILUMA Enterprises (1st) | #9
**Telegram Bot**. A hard-coded financial bot with four companies. It allows adding data to predefined companies and displaying information in the form of graphs. No filtering capabilities

**Stack**: Python, Aiogram, Matplotlib, PostgreSQL

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Date/Time" src="https://img.shields.io/badge/Date/Time-~1 day-F9A825?style=for-the-badge" />
  <img alt="Language" src="https://img.shields.io/badge/Language-Russian-00897b?style=for-the-badge" />
  <a href="https://youtu.be/GS9dPssV1y8" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a>
</div>

## Bot Commands
- **/start**: Launch bot
- **/append**: Add an annual report for a company
- **/graphic**: Display company data as a graph

## Steps before launch
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
