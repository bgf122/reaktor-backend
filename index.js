require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fetchData = require("./service/fetchData");
const glovesRoute = require('./routes/gloves');
const facemasksRoute = require('./routes/facemasks');
const beaniesRoute = require('./routes/beanies');
const { getAvailability } = require('./service/getAvailability');
const availabilitiesRoute = require('./routes/availabilities');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
db.dropDatabase(() => console.log('Database dropped'));

const updateData = async () => {
    await fetchData.getGloves();
    await fetchData.getFacemasks();
    await fetchData.getBeanies();
    await getAvailability();
}

updateData();


app.use(cors());
app.use(express.json())
app.use('/api/gloves', glovesRoute);
app.use('/api/facemasks', facemasksRoute);
app.use('/api/beanies', beaniesRoute);
app.use('/api/availabilities', availabilitiesRoute);
app.listen(PORT, () => console.log(`Server started`))
