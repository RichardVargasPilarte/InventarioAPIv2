import express from 'express';
import cors from 'cors';

import usuarioRoutes from './Routes/usuarioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuario', usuarioRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});