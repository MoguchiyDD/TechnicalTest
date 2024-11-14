# ReactJS/Decathlon (1st) | #14
**FrontEnd**. A web application for employee attendance tracking. A QR code is generated on the main screen, which is recreated if not scanned within 10 minutes or after navigating to the URL in the QR code. Upon the first launch, the app prompts for the user's name and stores it in localStorage for subsequent scans.

**Stack**: ReactJS, NodeJS, shadcn/ui, Tailwind CSS, SQLite

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Date/Time" src="https://img.shields.io/badge/Date/Time-~1 Day-F9A825?style=for-the-badge" />
  <img alt="Language" src="https://img.shields.io/badge/Language-Russian-00897b?style=for-the-badge" />
  <!-- <a href="https://youtu.be/FOalhy-8uvM" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a> -->
</div>

## URL Addresses
- FrontEnd
  - http://localhost:5173/ : Generate QR
  - http://localhost:5173/timekeeping/:uuid : Employee confirmation after scanning the QR code
- BackEnd
  - http://localhost:5000/api/timekeeping : for 1st time
  - http://localhost:5000/api/timekeeping/confirm : for some times
  - http://localhost:5000/api/timekeeping/create : saved data into database

## Steps before launch
```Bash
$ yarn install
$ yarn run start  # NodeJS + ReactJS

# or ...
$ yarn run start:server  # NodeJS
$ yarn run start:client  # ReactJS
```
