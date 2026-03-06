# IGNOU GradeCard Analyzer

A full-stack web application that automatically fetches and analyzes IGNOU grade card data.
The application uses web scraping to retrieve grade information and displays it through a modern Angular interface.

---

## Features

* Fetch IGNOU grade card using enrollment number
* Automatic data extraction using Puppeteer
* Displays subject-wise marks and status
* Percentage calculation
* Clean Angular UI
* Full-stack architecture

---

## Tech Stack

**Frontend**

* Angular
* TypeScript
* SCSS

**Backend**

* Node.js
* Express.js

**Web Scraping**

* Puppeteer

**Tools**

* Git
* GitHub
* VS Code

---

## Project Structure

```
ignou-gradecard-analyzer
│
├── client
│   └── Angular frontend
│
├── server
│   └── Node.js + Express backend
│       ├── controllers
│       ├── routes
│       └── services
│
├── README.md
└── .gitignore
```

---

## How It Works

1. User enters **Program** and **Enrollment Number**
2. Angular frontend sends request to backend API
3. Backend launches Puppeteer browser
4. IGNOU grade card page is scraped
5. Extracted data is processed
6. Result is sent back to frontend and displayed

---

## Installation

### Clone the repository

```
git clone https://github.com/your-username/ignou-gradecard-analyzer.git
```

```
cd ignou-gradecard-analyzer
```

---

### Install backend dependencies

```
cd server
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### Install frontend dependencies

```
cd client
npm install
ng serve
```

Frontend will run on:

```
http://localhost:4200
```

---

## Example Usage

1. Select program (BCA / MCA)
2. Enter enrollment number
3. Click **Search**
4. View grade card and percentage instantly

---

## Future Improvements

* Faster scraping using HTTP requests
* Deployment (Docker / VPS)
* Job queue for handling multiple requests
* Authentication system
* Improved UI/UX

---

## Author

Manav Pal
GitHub: https://github.com/manavpal-dev

---

## License

This project is for educational purposes.
