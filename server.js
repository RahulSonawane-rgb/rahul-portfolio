const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for image uploads (kept for potential future use, but not used in project routes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalName));
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file) {
            return cb(null, false); // Allow no file
        }
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalName).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only (jpeg, jpg, png)!'));
        }
    }
});

// Error handling middleware for multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
        console.error('Server error:', err);
        return res.status(400).json({ message: err.message });
    }
    next();
});

async function readProjects() {
    console.log('Reading projects.json');
    try {
        const data = await fs.readFile('projects.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading projects.json:', error);
        throw error;
    }
}

async function writeProjects(projects) {
    console.log('Writing to projects.json');
    try {
        await fs.writeFile('projects.json', JSON.stringify(projects, null, 2));
    } catch (error) {
        console.error('Error writing to projects.json:', error);
        throw error;
    }
}

async function readContacts() {
    console.log('Reading contacts.json');
    try {
        const data = await fs.readFile('contacts.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('contacts.json not found, returning empty array');
        return [];
    }
}

async function writeContacts(contacts) {
    console.log('Writing to contacts.json');
    try {
        await fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error('Error writing to contacts.json:', error);
        throw error;
    }
}

// API routes
app.get('/api/projects', async (req, res) => {
    console.log('GET /api/projects called');
    try {
        const projects = await readProjects();
        res.set('Cache-Control', 'no-store');
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects: ' + error.message });
    }
});

app.post('/api/projects', async (req, res) => {
    console.log('POST /api/projects called with body:', JSON.stringify(req.body, null, 2));
    try {
        const { headline, subtitle, title, description, link, linkText, image, imageAlt } = req.body;
        if (!headline || !subtitle || !title || !description || !link || !linkText || !image || !imageAlt) {
            return res.status(400).json({ message: 'All fields, including image URL, are required for new projects' });
        }
        const projects = await readProjects();
        const newProject = {
            id: projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1,
            headline,
            subtitle,
            title,
            description,
            link,
            linkText,
            image,
            imageAlt
        };
        projects.push(newProject);
        await writeProjects(projects);
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Error adding project: ' + error.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    console.log('PUT /api/projects/:id called with body:', JSON.stringify(req.body, null, 2));
    try {
        const { id } = req.params;
        const { headline, subtitle, title, description, link, linkText, image, imageAlt } = req.body;
        if (!headline || !subtitle || !title || !description || !link || !linkText || !imageAlt) {
            return res.status(400).json({ message: 'All fields except image URL are required' });
        }
        const projects = await readProjects();
        const index = projects.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const updatedProject = {
            id: parseInt(id),
            headline,
            subtitle,
            title,
            description,
            link,
            linkText,
            image: image || projects[index].image,
            imageAlt
        };
        projects[index] = updatedProject;
        await writeProjects(projects);
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project: ' + error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    console.log('DELETE /api/projects/:id called');
    try {
        const { id } = req.params;
        const projects = await readProjects();
        const filteredProjects = projects.filter(p => p.id !== parseInt(id));
        if (filteredProjects.length === projects.length) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await writeProjects(filteredProjects);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Error deleting project: ' + error.message });
    }
});

app.get('/api/contacts', async (req, res) => {
    console.log('GET /api/contacts called');
    try {
        const contacts = await readContacts();
        res.set('Cache-Control', 'no-store');
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Error fetching contacts: ' + error.message });
    }
});

app.post('/api/contact', async (req, res) => {
    console.log('POST /api/contact called with body:', JSON.stringify(req.body, null, 2));
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const contacts = await readContacts();
        const newContact = {
            id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        contacts.push(newContact);
        await writeContacts(contacts);
        res.status(201).json({ message: 'Contact submission received' });
    } catch (error) {
        console.error('Error saving contact submission:', error);
        res.status(500).json({ message: 'Error saving contact submission: ' + error.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    console.log('DELETE /api/contacts/:id called');
    try {
        const { id } = req.params;
        const contacts = await readContacts();
        const filteredContacts = contacts.filter(c => c.id !== parseInt(id));
        if (filteredContacts.length === contacts.length) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        await writeContacts(filteredContacts);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Error deleting contact: ' + error.message });
    }
});

async function readCertifications() {
    console.log('Reading certifications.json');
    try {
        const data = await fs.readFile('certifications.json', 'utf8');
        const certifications = JSON.parse(data);
        console.log('Certifications loaded:', certifications.length);
        return certifications;
    } catch (error) {
        console.error('Error reading certifications.json:', error);
        return [];
    }
}

async function writeCertifications(certifications) {
    console.log('Writing to certifications.json');
    try {
        await fs.writeFile('certifications.json', JSON.stringify(certifications, null, 2));
        console.log('Certifications written successfully');
    } catch (error) {
        console.error('Error writing certifications:', error);
        throw error;
    }
}

app.get('/api/certifications', async (req, res) => {
    console.log('GET /api/certifications called');
    try {
        const certifications = await readCertifications();
        res.set('Cache-Control', 'no-store');
        res.json(certifications);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        res.status(500).json({ message: 'Error fetching certifications: ' + error.message });
    }
});

app.post('/api/certifications', async (req, res) => {
    console.log('POST /api/certifications called');
    try {
        const certifications = await readCertifications();
        const newCert = req.body;
        newCert.id = certifications.length > 0 ? Math.max(...certifications.map(c => Number(c.id))) + 1 : 1;
        certifications.push(newCert);
        await writeCertifications(certifications);
        res.status(201).json(newCert);
    } catch (error) {
        console.error('Error adding certification:', error);
        res.status(500).json({ message: 'Error adding certification: ' + error.message });
    }
});

app.put('/api/certifications/:id', async (req, res) => {
    console.log(`PUT /api/certifications/${req.params.id} called`);
    try {
        const certifications = await readCertifications();
        const id = Number(req.params.id); // Ensure ID is a number
        console.log('Parsed ID:', id);
        const index = certifications.findIndex(c => Number(c.id) === id);
        console.log('Index found:', index);
        if (index === -1) {
            console.log('Certification not found for ID:', id);
            return res.status(404).json({ message: 'Certification not found' });
        }
        certifications[index] = { ...certifications[index], ...req.body, id };
        await writeCertifications(certifications);
        res.json(certifications[index]);
    } catch (error) {
        console.error('Error updating certification:', error);
        res.status(500).json({ message: 'Error updating certification: ' + error.message });
    }
});

app.delete('/api/certifications/:id', async (req, res) => {
    console.log(`DELETE /api/certifications/${req.params.id} called`);
    try {
        const certifications = await readCertifications();
        const id = Number(req.params.id); // Ensure ID is a number
        console.log('Parsed ID:', id);
        const index = certifications.findIndex(c => Number(c.id) === id);
        console.log('Index found:', index);
        if (index === -1) {
            console.log('Certification not found for ID:', id);
            return res.status(404).json({ message: 'Certification not found' });
        }
        certifications.splice(index, 1);
        await writeCertifications(certifications);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting certification:', error);
        res.status(500).json({ message: 'Error deleting certification: ' + error.message });
    }
});

app.get('/certifications', (req, res) => {
    console.log('Serving certifications.html');
    res.sendFile(path.join(__dirname, 'certifications.html'));
});

// Static file serving (must come after API routes)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    console.log('Serving admin.html');
    res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));