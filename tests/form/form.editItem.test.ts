import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`PUT: ${route}/:key/:id`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(
      `${route}/key/id`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(`${route}/key/id`)
      .set("Cookie", [
        `user=${data.validFrJwt}!`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie invalid",
    );
  });

  it("it should throw: user not found", async () => {
    const res = await request(app)
      .put(`${route}/key/id`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: data too long", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[1].key}/id`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ tooLong: data.string1_001 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data too long",
    );
  });

  it("it should throw: id invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[1].key}/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id invalid");
  });

  it("it should throw: data required", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data required",
    );
  });

  it("it should throw: key created_at is forbidden", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ created_at: "forbidden key" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key created_at is forbidden",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .put(
        `${route}/${data.objectId}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ test: "test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  it("it should throw: id not found", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ test: "test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should throw: data not equal", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=2&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[18].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        test: "test",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data not equal",
    );
  });

  it("it should throw: data not equal", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=2&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[18].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
        data1: "udpdate 1",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data not equal",
    );
  });

  it("it should update a form item values", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=2&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[18].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
      });

    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });

  it("it should throw: data must be different", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=2&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[18].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data must be different",
    );
  });

  it("it should throw: update in trash is forbidden", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1&trash=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/${items.body.items[0].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "UPDATE 0",
        data1: "1",
        data2: "2",
        data3: "3",
        data4: "4",
        data5: "5",
        data6: "6",
        data7: "7",
        data8: "8",
        data9: "9",
        data10: "10",
        data11: "11",
        data12: "12",
        data13: "13",
        data14: "14",
        data15: "15",
        data16: "16",
        data17: "17",
        data18: "18",
        data19: "19",
        data20: "20",
        data21: "21",
        data22: "22",
        data23: "23",
        data24: "24",
        data25: "25",
        data26: "26",
        data27: "27",
        data28: "28",
        data29: "29",
        data30: "30",
        data31: "31",
        data32: "32",
        data33: "33",
        data34: "34",
        data35: "35",
        data36: "36",
        data37: "37",
        data38: "38",
        data39: "39",
        data40: "40",
        data41: "41",
        data42: "42",
        data43: "43",
        data44: "44",
        data45: "45",
        data46: "46",
        data47: "47",
        data48: "48",
        data49: "49",
        data50: "50",
        data51: "51",
        data52: "52",
        data53: "53",
        data54: "54",
        data55: "55",
        data56: "56",
        data57: "57",
        data58: "58",
        data59: "59",
        data60: "60",
        data61: "61",
        data62: "62",
        data63: "63",
        data64: "64",
        data65: "65",
        data66: "66",
        data67: "67",
        data68: "68",
        data69: "69",
        data70: "70",
        data71: "71",
        data72: "72",
        data73: "73",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "update in trash is forbidden",
    );
  });
});
