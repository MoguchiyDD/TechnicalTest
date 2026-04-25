# Kivy/SIMUComp (1st) | #6
**FrontEnd**. Desktop software design. It was required to create only one tab without functionality

**Stack**: Python, Kivy

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Language" src="https://img.shields.io/badge/Language-Russian-00897b?style=for-the-badge" />
  <a href="https://youtu.be/IzQOuXnBJ0E" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a>
</div>

## Steps before launch
```BASH
$ # 1 OPTION
$ docker build -t simucomp .
$ xhost +local:docker
$ docker run --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix simucomp
$ 
$ # 2 OPTION
$ 
$ # Virtual Window (Python)
$ python -m venv <NAME>
$ # for Linux and MacOS : source <NAME>/bin/activate
$ # for Windows : <NAME>\Scripts\activate
$ pip install -r requirements.txt  # Installation of Packages 
$ 
$ # RUN
$ cd src
$ python main.py
```
