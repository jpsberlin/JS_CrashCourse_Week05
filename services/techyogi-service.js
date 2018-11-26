const TechyogiModel = require('../models/techyogi')

async function findAll() {
    return TechyogiModel.find()
}

async function add(techyogi) {
    return TechyogiModel.create(techyogi)
}

async function del(_id) {
    return TechyogiModel.remove({ _id })
}

async function find(_id) {
    return TechyogiModel.findOne({ _id })
}

module.exports = {
    findAll,
    find,
    add,
    del
}
