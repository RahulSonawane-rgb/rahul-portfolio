const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

// Configure ImgBB API
const IMGBB_API_KEY = '3a81f5e9b2b12ca4aa90c7c712c8fee8'; // Replace with your ImgBB API key

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error: ' + err.message });
});

// Helper functions
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

// Function to upload image to ImgBB
async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file.buffer, file.originalname);
  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      params: {
        key: IMGBB_API_KEY,
      },
    });
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw new Error('Failed to upload image to ImgBB');
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
  console.log('POST /api/projects called with body:', req.body, 'file:', req.files);
  try {
    const { headline, subtitle, title, description, link, linkText, imageAlt } = req.body;
    if (!headline || !subtitle || !title || !description || !link || !linkText || !imageAlt || !req.files || !req.files.image) {
      return res.status(400).json({ message: 'All fields, including image, are required for new projects' });
    }
    const imageUrl = await uploadImageToImgBB(req.files.image);
    const projects = await readProjects();
    const newProject = {
      id: projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      headline,
      subtitle,
      title,
      description,
      link,
      linkText,
      image: imageUrl,
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
  console.log('PUT /api/projects/:id called with body:', req.body, 'file:', req.files);
  try {
    const { id } = req.params;
    const { headline, subtitle, title, description, link, linkText, imageAlt } = req.body;
    if (!headline || !subtitle || !title || !description || !link || !linkText || !imageAlt) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const projects = await readProjects();
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    let imageUrl = projects[index].image;
    if (req.files && req.files.image) {
      imageUrl = await uploadImageToImgBB(req.files.image);
    }
    const updatedProject = {
      id: parseInt(id),
      headline,
      subtitle,
      title,
      description,
      link,
      linkText,
      image: imageUrl,
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
  console.log('POST /api/contact called with body:', req.body);
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

// Static file serving
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  console.log('Serving admin.html');
  res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
