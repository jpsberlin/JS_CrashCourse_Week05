const mongoose = require('mongoose')

const YogasessionSchema = new mongoose.Schema({
    name: String,
    location: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Techyogi'
    }]
})

module.exports = mongoose.model('Yogasession', YogasessionSchema);
