import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`DELETE: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).delete(
      `${route}/key/items`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .delete(`${route}/key/items`)
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
      .delete(`${route}/key/items`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: query required", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/items`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "query required",
    );
  });

  it("it should throw: query invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/items?id=invalid`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "query invalid",
    );
  });

  it("it should throw: id invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/items?id=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id invalid");
  });

  it("it should throw: owner role required", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${data.objectId}/items?${data.objectId}=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: cannot test because cannot add another user now, DO IT LATER
  // it("it should throw: owner role required", async () => {
  //       const key = await request(app)
  //         .get(`${route}?page=2`)
  //         .set("Cookie", [
  //           `user=${data.validFrJwt}`,
  //         ]);

  //   const res = await request(app)
  //     .delete(
  //       `${route}/${key.body.forms[1].key}/id`,
  //     )
  //     .set("Cookie", [`user=${data.validFrJwt}`]);
  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.message).toBe(
  //     "owner role required",
  //   );
  // });

  it("it should throw: id not found", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/items?${data.objectId}=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should delete five form item", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/items?${items.body.items[0].id}=true&${items.body.items[1].id}=true&${items.body.items[2].id}=true&${items.body.items[3].id}=true&${items.body.items[4].id}=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
  });
});
