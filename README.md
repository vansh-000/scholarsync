# ScholarSync – Resume & Google Scholar Integration App

ScholarSync is a Next.js-based full-stack web application that helps users parse resumes, scrape Google Scholar profiles, and receive intelligent project suggestions based on academic data. It uses Redux for state management and includes several middleware layers for security and performance.

---

## Features

- Resume upload and parsing
- Google Scholar scraping
- Project suggestion engine
- CSRF protection, CORS, and rate limiting
- Modular structure with reusable middleware
- State management via Redux Toolkit

---

## Folder Structure

```bash
.
├── components/             # UI components
├── lib/
│   ├── middleware/         # Security and utility middleware
│   └── utils/              # Parsing and scraping logic
├── pages/
│   ├── api/                # Backend API routes
│   └── index.js            # Homepage
├── public/                 # Static files
├── redux/                  # Redux store and slices
├── styles/                 # Tailwind CSS and global styles
└── README.md
```

---

## Middleware Usage

All API routes are secured with the following middlewares:

- **CORS**: Restricts access to specific origins (`lib/middleware/cors.js`)
- **CSRF Protection**: Mitigates cross-site request forgery (`lib/middleware/csrf.js`)
- **Rate Limiting**: Prevents brute-force and abuse (`lib/middleware/rateLimit.js`)
- **File Validation**: Ensures uploaded files are of valid type/size (`lib/middleware/validateFile.js`)


---

## Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/scholarsync.git
cd scholarsync
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

Visit the app at: **http://localhost:3000**

---

## Technologies Used

| Category | Tech Stack |
|----------|------------|
| Frontend | Next.js, React, Tailwind CSS |
| State Mgmt | Redux Toolkit |
| Backend | Next.js API Routes |
| Security | Custom Middleware (CSRF, CORS, Rate Limit) |
| Parsing | Node.js, PDF Parsing Utilities |
| Web Scraping | Google Scholar Scraper |

---

## Security Features

| Feature | Purpose |
|---------|---------|
| CORS | Restricts unwanted origins |
| CSRF Tokens | Prevents cross-site request forgery |
| Rate Limiting | Protects from abuse or brute-force |
| File Validation | Ensures only safe files are processed |

---

## Author

**Vansh Verma**  
📧 23165@iiitu.ac.in  
🔗 [LinkedIn](https://linkedin.com/in/vanshverma000)