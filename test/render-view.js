import test from "ava";
import request from "supertest";
import app from "../app";

test("Index page should be rendered", async t => {
    const res = await request(app).get("/");

    t.is(res.status, 200);
    t.true(res.text.includes('Namaste 👋'));
});


test("List of people view render", async t => {
  const techyogiToCreate = { name: "Armagan Amcalar Render", age: 33 };

  const creation = await request(app)
    .post("/techyogi")
    .send(techyogiToCreate);

  const res = await request(app).get("/techyogi/all-list");

  t.is(res.status, 200);
  t.true(res.text.includes('Armagan Amcalar Render'));
});

test("People detail view render", async t => {
  const techyogiToCreate = { name: "Armagan Amcalar Detail Render", age: 33 };

  const createdTechyogi = (await request(app)
    .post("/techyogi")
    .send(techyogiToCreate)).body;

  const res = await request(app).get(`/techyogi/${createdTechyogi._id}`);

  t.is(res.status, 200);
  t.true(res.text.includes('Armagan Amcalar Detail Render'));
});

test("List of yogasession view render", async t => {
    const yogasessionToCreate = {
        name: 'WTM Testing Render',
        location: 'Eurostaff',
        attendees: []
    };

    const creation = await request(app)
      .post("/yogasession")
      .send(yogasessionToCreate);

    const res = await request(app).get("/yogasession/all-list");

    t.is(res.status, 200);
    t.true(res.text.includes('WTM Testing Render'));
  });

  test("Yogasession detail render", async t => {
    const yogasessionToCreate = {
        name: 'WTM Testing Detail Render',
        location: 'Eurostaff',
        attendees: []
    };

    const createdYogasession = (await request(app)
      .post("/yogasession")
      .send(yogasessionToCreate)).body;

    const res = await request(app).get(`/yogasession/${createdYogasession._id}`);

    t.is(res.status, 200);
    t.true(res.text.includes('WTM Testing Detail Render'));
  });
