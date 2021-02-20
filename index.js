require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const errorHandler = require('./middleware/errorHandler');

app.use(bodyParser.json());
app.use('/api/auth/', require('./routes/authRoutes'));
app.use('/api/private/', require('./routes/privateRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./config/dev');

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(
    () => {
        const server = app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
        process.on('unhandledRejection', (e, promise) => {
            console.log(`Logged error: ${e}`);
            server.close(() => process.exit(1));
        });
    }
);

