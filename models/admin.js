const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto');
const {GenerateToken} = require('../services/auth')
const { throws } = require('assert');
// const { type } = require('@testing-library/user-event/dist/type');

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true, })

adminSchema.pre('save', function (next) {
    console.log(this, "this")
    const admin = this;
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac('sha256', salt).update(admin.password).digest("hex");

    this.salt = salt;
    this.password = hashPassword;

    next();

})

adminSchema.static('matchPasswordAndGenerateToken', async( password, admin) => {

    try {
       
        const salt = admin.salt;
        const hashedPass = admin.password;

        const providedPass = await createHmac('sha256', salt).update(password).digest('hex');
        if (providedPass !== hashedPass) throw new Error("Invalid Password");

        return {
            token: GenerateToken(admin),
            user: admin,
        }



    } catch (error) {

        console.log("Internal Error Occurred", error)

    }
})

const ADMIN = new mongoose.model('admin', adminSchema);

module.exports = ADMIN;