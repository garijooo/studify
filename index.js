const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler');
 
const HTTP_SERVER_ERROR = 500;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.status || HTTP_SERVER_ERROR).render('500');
});
app.use(express.json());
app.use('/static/public', express.static(__dirname + '/public'));
app.use('/api/auth/', require('./routes/authRoutes'));
app.use('/api/courses/', require('./routes/courseRoutes'));
app.use('/api/tests/', require('./routes/testRoutes'));
app.use('/api/learner/', require('./routes/learnerRoutes'));

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

