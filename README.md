# Rahul Sonawane's Portfolio

A personal portfolio website showcasing projects, certifications, and contact information. It features a public-facing portfolio, a certifications page, and an admin dashboard to manage content, powered by a Node.js backend with JSON data storage.

## Features

- **Portfolio Page**: Displays projects with smooth scrolling animations using GSAP and Locomotive Scroll, plus a contact form and resume link.
- **Certifications Page**: Shows a grid of certifications fetched from `certifications.json` with GSAP animations.
- **Admin Dashboard**: Manage projects and certifications (add, edit, delete) and view/delete contact submissions.
- **Backend**: Node.js/Express server serving static files and API endpoints for projects, certifications, and contacts.
- **Responsive Design**: Optimized for desktop and mobile.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, GSAP (3.12.5), Locomotive Scroll (4.1.4), Font Awesome (6.6.0)
- **Backend**: Node.js, Express
- **Data Storage**: JSON files (`projects.json`, `certifications.json`, `contacts.json`)
- **Dependencies**: `express`, `fs` (Node.js built-in)

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- A modern web browser (e.g., Chrome, Firefox)
- Local GSAP files: `gsap.min.js` and `ScrollTrigger.min.js` (version 3.12.5)

## Setup Instructions

1. **Clone the Repository** (or download the files):

   ```bash
   git clone <your-repository-url>
   cd portfolio
   ```

2. **Install Dependencies**:

   ```bash
   npm install express
   ```

3. **Download GSAP Files**:

   - Download `gsap.min.js` and `ScrollTrigger.min.js` (version 3.12.5) from cdnjs.com.
   - Place them in the project root.

4. **Set Up Data Files**:

   - Ensure these JSON files are in the project root:

     - `projects.json`: Project data (headline, title, description, link, image, etc.).
     - `certifications.json`: Certification data (title, issuer, date, link, image, etc.).
     - `contacts.json`: Contact submissions (name, email, message, timestamp).

   - Example `certifications.json`:

     ```json
     [
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
     ```

5. **Add Resume PDF**:

   - Place `resume.pdf` in the project root or update `href` in `index.html` and `certifications.html` to your PDF’s URL.

6. **Run the Server**:

   ```bash
   node server.js
   ```

   - Access the portfolio at `http://localhost:3000`.

## File Structure

```
portfolio/
├── index.html          # Main portfolio page
├── style.css           # Styles for portfolio page
├── script.js           # JavaScript for portfolio page
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
├── README.md           # This file
```

## Usage

1. **View Portfolio**:

   - Open `http://localhost:3000` to see projects, resume link, and contact form.

2. **View Certifications**:

   - Visit `http://localhost:3000/certifications` to view the certifications grid.

3. **Manage Content**:

   - Open `http://localhost:3000/admin.html`.
   - **Projects**: Add, edit, or delete projects.
   - **Certifications**: Add, edit, or delete certifications.
   - **Contacts**: View or delete contact submissions.

4. **Update Data**:

   - Edit `projects.json` or `certifications.json` manually or via the admin dashboard.
   - Ensure JSON IDs are unique numbers (e.g., `1`, not `"1"`).

## Troubleshooting

- **GSAP Error (**`Uncaught ReferenceError: gsap is not defined`**)**:

  - Verify `gsap.min.js` and `ScrollTrigger.min.js` are in the project root and referenced in `certifications.html`.

  - Alternative: Use CDNs in `certifications.html`:

    ```html
    <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    ```

  - Clear browser cache or test in incognito mode.

- **404 Error on Delete (**`Cannot DELETE /api/certifications/:id`**)**:

  - Check `certifications.json` for valid JSON and numeric IDs.
  - Ensure the certification ID exists (e.g., `3` for `/api/certifications/3`).
  - Verify server logs (`node server.js`) for file access errors.
  - Test the GET endpoint: `curl http://localhost:3000/api/certifications`.

- **Server Issues**:

  - Ensure `node server.js` is running and port 3000 is free.
  - Check for errors in server logs (e.g., missing JSON files).

## Future Improvements

- Add authentication to secure the admin dashboard.
- Implement file upload for project/certification images.
- Enhance form validation in the admin dashboard.
- Add more animations to the portfolio and certifications pages.
- Deploy to a hosting service (e.g., Vercel, Netlify).

## License

This project is for personal use and not licensed for distribution.

## Contact

For issues or suggestions, contact Rahul Sonawane via the portfolio’s contact form or email (sorahul54@gmail.com).

---

*Generated on July 31, 2025. Optimized for GitHub Flavored Markdown.*
