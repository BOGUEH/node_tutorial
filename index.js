const express = require('express');
const path = require('path');
const members = require('./router/api/members')


const app = express();

const PORT = process.env.PORT || 4000;

//body parse middleware
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

//to load static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', members);

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));