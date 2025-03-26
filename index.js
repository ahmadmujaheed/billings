import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'


dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

const corOptions = {
    origin:process.env.CLIENT_URL || ['http://localhost:3000'],
    credential:true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}

app.use(cors(corOptions))

//
app.use('/api/V1', authRoutes)

app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`))