import test from "ava";
import request from "supertest";
import app from "../app";

test("Get list of yogasessions", async t => {
  const yogasessionToCreate = {
    name: "Testing Session",
    location: "unu GmbH",
    attendees: []
  };

  const creation = await request(app)
    .post("/yogasession")
    .send(yogasessionToCreate);

  const res = await request(app).get("/yogasession/all");

  t.is(res.status, 200);
  t.true(Array.isArray(res.body), "Body should be an array");
  t.true(res.body.length > 0);
});

test("Create new yogasession", async t => {
  t.plan(4);
  const yogasessionToCreate = {
    name: "Testing Session",
    location: "unu GmbH",
    attendees: []
  };

  const res = await request(app)
    .post("/yogasession")
    .send(yogasessionToCreate);

  t.is(res.status, 200);
  t.is(res.body.name, yogasessionToCreate.name);
  t.is(res.body.location, yogasessionToCreate.location);
  t.deepEqual(res.body.attendees, yogasessionToCreate.attendees);
});

test("Fetch a yogasession", async t => {
  t.plan(2);
  const yogasessionToCreate = {
    name: "Testing Session",
    location: "unu GmbH",
    attendees: []
  };

  const yogasessionCreated = (await request(app)
    .post("/yogasession")
    .send(yogasessionToCreate)).body;

  const fetchRes = await request(app).get(`/yogasession/${yogasessionCreated._id}/json`);

  const yogasessionFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(yogasessionFetched, yogasessionCreated);
});

test("Delete a yogasession", async t => {
  t.plan(3);

  const yogasessionToCreate = {
    name: "Testing Session",
    location: "unu GmbH",
    attendees: []
  };

  const yogasession = (await request(app)
    .post("/yogasession")
    .send(yogasessionToCreate)).body;

  const del = await request(app).delete(`/yogasession/${yogasession._id}`);

  t.is(del.status, 200);
  t.is(del.text, "ok!");

  const fetch = await request(app).get(`/yogasession/${yogasession._id}/json`);

  t.is(fetch.status, 404);
});

test('User can attend to a yogasession', async t => {
  const annaUser = { name: 'Anna Pavlova', age: 29 };

  const yogasessionWTM = { name: 'WTM Testing',
  location: 'Eurostaff',
  attendees: []};

  const createdTechyogi = (await request(app)
  .post("/techyogi")
  .send(annaUser)).body

  const yogasessionCreateRes = await request(app)
  .post("/yogasession")
  .send(yogasessionWTM)

  const createdYogasession = yogasessionCreateRes.body

  const addAttendeeRes = await request(app)
  .post(`/yogasession/${createdYogasession._id}/addAttendee`)
  .send( {techyogiId : createdTechyogi._id} )

  t.is(addAttendeeRes.status, 200)

  const yogasessionAltered = addAttendeeRes.body

  t.is(yogasessionAltered.attendees[0]._id, createdTechyogi._id)

  t.deepEqual(yogasessionAltered.attendees[0], createdTechogi)

  t.notDeepEqual(yogasessionAltered, createdYogasession)
})
