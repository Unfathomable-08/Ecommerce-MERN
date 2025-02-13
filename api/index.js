const express = require('express');
const cors =require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/users')

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api', userRouter)

app.listen(5050, ()=>{
    console.log('Server running on port 5050');
});