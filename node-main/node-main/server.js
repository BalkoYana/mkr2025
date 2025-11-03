const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { port, mongodb_url } = require('./config');




const invoicesRouter = require('./routes/invoices.route'); 


const cookieParser = require('cookie-parser');
const multer = require('multer'); 



mongoose.connect(mongodb_url)
    .then(() => {
        console.log('Mongo DB connected');
        

    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);

        process.exit(1);
    });

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            message: "Node.js ExApp - Invoices Service"
        }
    })
});


app.use('/invoices', invoicesRouter); 


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createError.BadRequest('File size limit exceeded. Please upload a smaller file.'));
        }
    }
    next(err);
});



app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    const erorrStatus = err.status || 500;
    console.error(`${'\x1b[31m'}[${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${erorrStatus}): ${err.message}`, '\x1b[0m');
    res.status(erorrStatus).send({
        status: erorrStatus,
        error: {
             message: err.message,
             status: erorrStatus
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});