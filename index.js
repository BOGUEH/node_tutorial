const express = require('express');
const path = require('path');
const contacts = require('./Public/contact')


const app = express();

const PORT = process.env.PORT || 4000;



app.get('/api/members', (req, res) =>{
    res.json(contacts)
});

app.get('/api/members/:id', (req, res) =>{
    res.json(contacts.filter(contacts=>contacts.id == req.params.id));
});




app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));