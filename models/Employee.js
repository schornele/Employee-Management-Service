const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        default:Date.now
    },
    role: {
        type:String,
        required:true
    },
    department: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Employees',EmployeeSchema);
