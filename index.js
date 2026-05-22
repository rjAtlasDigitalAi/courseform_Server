const express = require('express');
const cors = require('cors');
require('dotenv').config();
const formRoutes = require('./routes/form');

const app = express();
app.use(cors({ origin: 'https://courseform-chi.vercel.app' }));
app.use(express.json());
app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
