const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const presenceRouter =require('./routes/presence')
const dotenv=require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userRouter)
app.use('/api/presence', presenceRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
