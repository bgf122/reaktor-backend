require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const glovesRoute = require('./routes/gloves');
const facemasksRoute = require('./routes/facemasks');
const beaniesRoute = require('./routes/beanies');
const cors = require('cors');
const { insertData } = require('./service/insertData');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
db.dropDatabase(() => console.log('Database dropped'));

const updateData = async () => {
    await insertData();
}

updateData();


app.use(cors());
app.use(express.json())
app.use('/api/gloves', glovesRoute);
app.use('/api/facemasks', facemasksRoute);
app.use('/api/beanies', beaniesRoute);
app.listen(PORT, () => console.log(`Server started`))
