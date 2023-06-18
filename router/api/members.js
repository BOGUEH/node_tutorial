const express = require('express');

const path = require('path');
const uuid = require('uuid')

const contacts = require('../../contact')

const router = express.Router();

router.get('/', (req, res) =>{
    res.json(contacts)
});

router.get('/:id', (req, res) =>{

    const found = contacts.some(contacts => contacts.id == req.params.id);
    if(found){
        
        res.json(contacts.filter(contacts=>contacts.id == req.params.id));
    } else{
        res.status(400).json({msg: `no contacts with the id of ` })
    }

});
router.delete('/:id', (req, res) =>{

    const found = contacts.some(contacts => contacts.id == req.params.id);
    if(found){
        
        res.json({ msg:"contact has been deleted", contacts: contacts.filter(contacts=>contacts.id !== parseInt(req.params.id))});
    } else{
        res.status(400).json({msg: `no contacts with the id of ` })
    }

});
router.put('/:id', (req, res) =>{

    const found = contacts.some(contacts => contacts.id == req.params.id);
    if(found){
      const upMember = req.body;
      contacts.forEach(contacts => {
        if (contacts.id === parseInt(req.params.id)) {
            contacts.name = upMember.name? upMember.name : contacts.name;
            contacts.email = upMember.email? upMember.email : contacts.email;

            res.json({msg: 'contact has been updated', contacts})
            
        }
        
      });
    } else{
        res.status(400).json({msg: `no contacts with the id of ` })
    }

});

router.post('/', (req, res) =>{

    const newContact  = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
        if (!newContact.name || !newContact.email) {
            return res.status(400).json({msg: "please enter name and email"})
                        
        }
     contacts.push(newContact); 
     res.json(contacts)   
    
});

module.exports = router