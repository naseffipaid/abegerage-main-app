// Import required modules using ES module syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import meta URL to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express app
const app = express();

// Serve static files from the Vite build output (`dist`)
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect all requests to `index.html`
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Listen on port 80 (requires sudo in some cases)
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});