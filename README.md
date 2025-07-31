Rahul Sonawane's Portfolio
This is a personal portfolio website showcasing my projects, certifications, and contact information. It includes a public-facing portfolio page, a certifications page, and an admin dashboard to manage projects and certifications. The portfolio is built with a Node.js backend to serve static files and manage data via JSON files.
Features

Portfolio Page (index.html): Displays projects and contact form with smooth scrolling animations powered by GSAP and Locomotive Scroll.
Certifications Page (certifications.html): Shows a grid of certifications fetched from certifications.json with GSAP animations.
Admin Dashboard (admin.html): Allows adding, editing, and deleting projects and certifications, plus viewing and deleting contact submissions.
Backend (server.js): Node.js server with Express to serve static files and provide API endpoints for projects, certifications, and contacts.
Responsive Design: Optimized for desktop and mobile devices.

Tech Stack

Frontend: HTML, CSS, JavaScript, GSAP (3.12.5), Locomotive Scroll (4.1.4), Font Awesome (6.6.0)
Backend: Node.js, Express
Data Storage: JSON files (projects.json, certifications.json, contacts.json)
Dependencies: express, fs (Node.js built-in)

Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)
A modern web browser (Chrome, Firefox, etc.)
GSAP and ScrollTrigger JavaScript files (downloaded locally as gsap.min.js and ScrollTrigger.min.js)

Setup Instructions

Clone the Repository (or download the project files):git clone <repository-url>
cd portfolio


Install Dependencies:npm install express


Download GSAP Files:
Download gsap.min.js and ScrollTrigger.min.js (version 3.12.5) from cdnjs.com/libraries/gsap.
Place them in the project root directory.


Set Up Data Files:
Ensure the following JSON files are in the project root:
projects.json: Stores project data (e.g., headline, title, description, link, image).
certifications.json: Stores certification data (e.g., title, issuer, date, link, image).
contacts.json: Stores contact form submissions (e.g., name, email, message, timestamp).


Example certifications.json:[
  {
    "id": 1,
    "title": "Full Stack Web Development",
    "issuer": "Coursera",
    "date": "2024-06-15",
    "link": "https://www.coursera.org/certificates/full-stack-web-development",
    "linkText": "View Certificate",
    "image": "https://via.placeholder.com/300x200?text=Full+Stack+Certificate",
    "imageAlt": "Full Stack Web Development Certificate"
  }
]




Add Resume PDF:
Place your resume PDF as resume.pdf in the project root or update the href in index.html and certifications.html to your PDF’s URL.


Run the Server:node server.js


The server runs on http://localhost:3000.



File Structure
portfolio/
├── index.html          # Main portfolio page
├── style.css           # Styles for portfolio page
├── script.js           # JavaScript for portfolio page (GSAP, Locomotive Scroll)
├── certifications.html # Certifications page
├── certifications.css  # Styles for certifications page
├── certifications.js   # JavaScript for certifications page
├── admin.html          # Admin dashboard for managing content
├── server.js           # Node.js/Express backend
├── projects.json       # Project data
├── certifications.json # Certification data
├── contacts.json       # Contact submissions
├── resume.pdf          # Resume file (optional)
├── gsap.min.js         # Local GSAP library
├── ScrollTrigger.min.js # Local ScrollTrigger library

Usage

View Portfolio:
Open http://localhost:3000 to see the main portfolio page with projects, resume link, and contact form.


View Certifications:
Navigate to http://localhost:3000/certifications to view the certifications grid.


Manage Content via Admin Dashboard:
Open http://localhost:3000/admin.html.
Projects: Add, edit, or delete projects using the project form and list.
Certifications: Add, edit, or delete certifications using the certification form and list.
Contacts: View and delete contact submissions.


Update Data:
Edit projects.json or certifications.json manually or via the admin dashboard.
Ensure IDs in JSON files are unique numbers (e.g., 1, not "1").



Troubleshooting

GSAP Error (Uncaught ReferenceError: gsap is not defined):
Ensure gsap.min.js and ScrollTrigger.min.js are in the project root.
Verify <script> tags in certifications.html point to the correct paths.
Alternative: Use CDN links in certifications.html:<script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>


Clear browser cache or test in incognito mode.


404 Error on Delete (Cannot DELETE /api/certifications/:id):
Check certifications.json for valid JSON and numeric IDs.
Verify the certification ID exists in certifications.json.
Check server logs for errors (e.g., node server.js output).
Ensure the DELETE /api/certifications/:id endpoint is active in server.js.


Server Not Running:
Ensure node server.js is running and port 3000 is free.
Check for file access errors in server logs (e.g., missing certifications.json).



Future Improvements

Add authentication to the admin dashboard for security.
Implement file upload for project and certification images.
Add input validation in the admin dashboard forms.
Enhance animations on the portfolio and certifications pages.
Deploy the portfolio to a hosting service (e.g., Vercel, Netlify).

License
This project is for personal use and not licensed for distribution.
Contact
For issues or suggestions, contact Rahul Sonawane via the portfolio’s contact form or email (add your email here).
