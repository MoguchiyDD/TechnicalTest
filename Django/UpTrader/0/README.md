# Django/UpTrader
**FullStack**. Create and Edit a submenu through the database

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
  <img alt="Started & Finished" src="https://img.shields.io/badge/Started%20&%20Finished-2024.03.05%20/%202024.03.07-F9A825?style=for-the-badge" />
  <img alt="Testing" src="https://img.shields.io/badge/Testing-Google%20Chrome%20and%20Firefox-2E7D32?style=for-the-badge" />
</div>

## URL Addresses
- http://localhost:8000 : The MAIN Page
- http://localhost:8000/creativity : The CREATIVITY Page
- http://localhost:8000/creativity/paintings : The PAINTINGS Page
- http://localhost:8000/creativity/paintings/subjects : The SUBJECTS Page
- http://localhost:8000/creativity/paintings/objects : The OBJECTS Page
- http://localhost:8000/creativity/sculptures : The SCULPTURES Page
- http://localhost:8000/information : The INFORMATION Page

## MENU TABS
- home (URL)
- creativity (URL)
  - paintings (URL, Parent: creativity)
    - subjects (URL, Parent: paintings)
    - objects (URL, Parent: paintings)
  - sculptures (URL, Parent: creativity)
- information (URL)

## Installed
<div id="installed" align="left">
  <a href="https://pypi.org/project/Django/" target="_blank">
    <img alt="PyPi Django" src="https://img.shields.io/badge/PyPi-Django-0073B7?style=for-the-badge" />
  </a>
</div>

## Commands
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
$ python manage.py runserver
```
