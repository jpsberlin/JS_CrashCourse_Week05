const mongoose = require('mongoose')

const TechyogiSchema = new mongoose.Schema({
    name: String,
    age: Number
})
module.exports = mongoose.model('Techyogi', TechyogiSchema);
