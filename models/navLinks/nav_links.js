const { Schema, model } = require('mongoose')

const navLinkSchema = new Schema({
    navLink: String,
    navUrl: String
})
module.exports = model('NavLink', navLinkSchema);