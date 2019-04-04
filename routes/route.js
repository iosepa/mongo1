const express = require('express');
const router = express.Router();


const Contact = require('../models/contacts')

//get whole list
router.get('/contacts', (req, res, next) =>{
    Contact.find(function(err,contacts){
        res.json(contacts);
    })
    //res.send('Retrieving the contact list')
});

//add contact
router.post('/contact', (req, res, next)=>{
    //console.log('contact!')
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    })
//console.log(req)
    newContact.save((err, contact)=>{
        if (err){
            res.json({msg: 'Failed to add contact'})
        }
        else {
            res.json({msg: 'Contact added successfully'})
        }
    })
});

//delete
router.delete('/contact/:id', (req, res, next)=>{
    Contact.remove({ _id: req.params.id}, function(err, result){
        if (err){
            res.json({msg: 'Failed to delete contact'});
        }
        else {
            res.json({msg: 'Contact deleted successfully'});
        }
    })
});

//delete
router.put('/contact/:id', (req, res, next)=>{
    let updatedContact = {};

    Object.keys(req.body).filter(key => key.indexOf('_') != 0).forEach(val => { //don't input null values into db
        if (req.body[val])
          updatedContact[val] = req.body[val]
      })

    Contact.findByIdAndUpdate({ _id: req.params.id}, updatedContact, function(err, result){
        if (err){
            res.json({msg: 'Failed to update contact'});
        }
        else {
            res.json({msg: 'Contact updated successfully'});
        }
    })
});



module.exports = router;