# Django/UpTrader (1st) | #7
**FullStack**. Create and Edit a menu through the database.

**Stack**: Python, Django, SQLite3, CSS

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
  <a href="https://youtu.be/KPfGGGur7Fs" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a>
</div>

## URL Addresses
- http://localhost:8000 : main page
- http://localhost:8000/creativity : creativity page
- http://localhost:8000/creativity/paintings : paintings page
- http://localhost:8000/creativity/paintings/subjects : subjects page
- http://localhost:8000/creativity/paintings/objects : objects page
- http://localhost:8000/creativity/sculptures : sculptures page
- http://localhost:8000/information : information page

## MENU TABS
- home (URL)
- creativity (URL)
  - paintings (URL, Parent: creativity)
    - subjects (URL, Parent: paintings)
    - objects (URL, Parent: paintings)
  - sculptures (URL, Parent: creativity)
- information (URL)

## Steps before launch
```Bash
# Virtual Window (Python)
$ python -m venv <NAME>
# for Linux and MacOS : source <NAME>/bin/activate
# for Windows : <NAME>\Scripts\activate
$ pip install -r requirements.txt  # Installation of Packages 

# RUN
$ cd src
$ python manage.py makemigrations menu
$ python manage.py migrate
# Create 1 SUPER USER and ADD 1 MENU (type «main») following the INSTRUCTION
# in the «MENU TABS» Block from the «README.md» to the MENU DATABASE
# (the parent is saved automatically when creating 1 new tab for the menu)
$ python manage.py fullmenu
$ python manage.py runserver
```
