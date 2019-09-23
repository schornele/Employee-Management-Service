const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee')

router.get('/', (req, res) => {
    res.send("We are on employees home page")
})

router.post('/', (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        role: req.body.role,
        department: req.body.department,
        email: req.body.email
    });

    employee.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ ErrorMessage: err })
    })
})


module.exports = router;