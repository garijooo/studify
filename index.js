const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler');

app.use(fileUpload());
app.use(bodyParser.json());
app.use('/static/public', express.static(__dirname + '/public'));
app.use('/api/auth/', require('./routes/authRoutes'));
app.use('/api/courses/', require('./routes/courseRoutes'));
app.use('/api/upload/', require('./routes/uploadRoutes'));

app.use('/api/private/', require('./routes/privateRoutes'));

app.use(errorHandler);
 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => app.listen(PORT, () => console.log(`The server is running on port ${PORT}`)));

