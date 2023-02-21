import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`DELETE: ${route}/:key`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).delete(
      `${route}/key`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .delete(`${route}/key`)
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
      .delete(`${route}/key`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: trash required", async () => {
    const res = await request(app)
      .delete(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "trash required",
    );
  });

  it("it should throw: trash invalid", async () => {
    const res = await request(app)
      .delete(
        `${route}/${data.objectId}?trash=invalid`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "trash invalid",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .delete(
        `${route}/${data.objectId}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: need test with adding user to the form group, DO IT LATER

  let keyTrash = "";
  it("it should set to trash 2 forms", async () => {
    const key = await request(app)
      .get(`${route}?page=1&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    keyTrash = key.body.forms[0].key;

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[0].key}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);

    const res2 = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res2.statusCode).toBe(200);
  });

  it("it should delete in trash a form", async () => {
    const res = await request(app)
      .delete(`${route}/${keyTrash}?trash=true`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });
});
