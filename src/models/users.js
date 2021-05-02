const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('invalid email')
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be "password"')
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value) {
            if (value < 0) 
                throw new Error('age must be positive number')
        }
    }
})

const Me = new User({
    name:" Night  ",
    email:'adjJKAS@gmail.com',
    password:'1asdas23'
})

Me.save().then(() => {
    console.log(Me)
}).catch((error) =>{
    console.log(error)
})

module.exports = User