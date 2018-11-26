import test from "ava";
import request from "supertest";
import app from "../app";

test("Get list of people", async t => {
  const techyogiToCreate = { name: "Armagan Amcalar", age: 33 };

  const creation = await request(app)
    .post("/techyogi")
    .send(techyogiToCreate);

  const res = await request(app).get("/techyogi/all");

  t.is(res.status, 200);
  t.true(Array.isArray(res.body), "Body should be an array");
  t.true(res.body.length > 0);
});

test("Create new techyogi", async t => {
  t.plan(3);
  const techyogiToCreate = { name: "Armagan Amcalar", age: 33 };

  const res = await request(app)
    .post("/techyogi")
    .send(techyogiToCreate);

  t.is(res.status, 200);
  t.is(res.body.name, techyogiToCreate.name);
  t.is(res.body.age, techyogiToCreate.age);
});

test("Fetch a techyogi", async t => {
  t.plan(2);
  const techyogiToCreate = { name: "Armagan Amcalar", age: 33 };

  const armaganUserCreated = (await request(app)
    .post("/techyogi")
    .send(techyogiToCreate)).body;

  const fetchRes = await request(app).get(
    `/techyogi/${armaganUserCreated._id}/json`
  );

  const armaganUserFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(armaganUserFetched, armaganUserCreated);
});

test("Delete a techyogi", async t => {
  t.plan(3);

  const techyogi = (await request(app)
    .post("/techyogi")
    .send({ name: "Armagan Amcalar", age: 33 })).body;

  const del = await request(app).delete(`/techyogi/${techyogi._id}`);

  t.is(del.status, 200);
  t.is(del.text, "ok!");

  const fetch = await request(app).get(`/techyogi/${techyogi._id}/json`);

  t.is(fetch.status, 404);
});
