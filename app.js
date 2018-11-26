const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const TechyogiService = require('./services/techyogi-service')
const YogasessionService = require('./services/yogasession-service')

require('./mongo-connection')

const app = express()
app.use(cors())

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

// techyogi ENDPOINTs

app.get('/techyogi/all-list', async (req, res) => {
  const people = await TechyogiService.findAll()
  res.render('people', { people })
})

app.get('/techyogi/all', async (req, res) => {
  const people = await TechyogiService.findAll()
  res.send(people)
})

app.get('/techyogi/:id', async (req, res) => {
  const user = await TechyogiService.find(req.params.id)
  res.render('data', { data: user })
})

app.get('/techyogi/:id/json', async (req, res) => {
  const user = await TechyogiService.find(req.params.id)
  if (!user) res.status(404)
  res.send(user)
})

app.post('/techyogi', async (req, res, next) => {
  const techyogi = await TechyogiService.add(req.body)
  res.send(techyogi)
})

app.delete('/techyogi/:id', async (req, res) => {
  const user = await TechyogiService.del(req.params.id)
  res.send('ok!')
})

// yogasession ENDPOINTS

app.get('/yogasession/all-list', async (req, res) => {
  const yogasessions = await YogasessionService.findAll()
  res.render('data', { data: yogasessions })
})

app.get('/yogasession/all', async (req, res) => {
  const yogasessions = await YogasessionService.findAll()
  res.send(yogasessions)
})

app.get('/yogasession/:id', async (req, res) => {
  const yogasession = await MogasessionService.find(req.params.id)
  res.render('data', { data: yogasession })
})

app.get('/yogasession/:id/json', async (req, res) => {
  const yogasession = await YogasessionService.find(req.params.id)
  if (!yogasession) res.status(404)
  res.send(yogasession)
})


app.post('/yogasession', async (req, res) => {
  const yogasession = await YogasessionService.add(req.body)
  res.send(yogasession)
})

app.post('/yogasession/:id/addAttendee', async (req, res) => {
  const yogasession = await YogasessionService.addAttendee(req.params.id, req.body.techyogiId)
  res.send(yogasession)
})

app.delete('/yogasession/:id', async (req, res) => {
  await MogasessionService.del(req.params.id)
  res.send('ok!')
})
module.exports = app
