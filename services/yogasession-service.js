const YogasessionModel = require('../models/yogasession')
const TechyogiModel = require('../models/techyogi')

async function addAttendee(yogasessionId, techyogiId) {
    const yogasession = await YogasessionModel.findOne({ _id: yogasessionId })
    const techyogi = await TechyogiModel.findOne({ _id: techyogiId })

    yogasession.attendees.push(techyogi)

    await yogasession.save()

    return yogasession
}

async function findAll() {
    return YogasessionModel.find().populate('attendees')
}

async function add(techyogi) {
    return YogasessionModel.create(techyogi)
}

async function del(_id) {
    return YogasessionModel.remove({ _id })
}

async function find(_id) {
    return YogasessionModel.findOne({ _id }).populate('attendees')
}

module.exports = {
    addAttendee,
    findAll,
    find,
    add,
    del
}
