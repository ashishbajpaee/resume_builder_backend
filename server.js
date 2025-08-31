import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js'; // check exact file name
import resumeRoutes from './routes/resumeRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);

app.use('/uploads',
    express.static(path.join(__dirname ,'uploads'),{
        setHeaders :(res,path)=>{
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        }
    })
)

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
