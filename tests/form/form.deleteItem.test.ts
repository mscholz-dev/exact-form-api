import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`DELETE: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).delete(
      `${route}/key/id`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
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
      .delete(`${route}/key/id`)
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
      .delete(
        `${route}/${data.objectId}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "trash required",
    );
  });

  it("it should throw: trash invalid", async () => {
    const res = await request(app)
      .delete(
        `${route}/${data.objectId}/${data.objectId}?trash=invalid`,
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
        `${route}/${data.objectId}/${data.objectId}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: cannot test because cannot add another user now, DO IT LATER

  it("it should throw: id invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/id?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id invalid");
  });

  it("it should throw: id not found", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/${data.objectId}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should throw: delete forbidden outside the trash", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}?trash=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "delete forbidden outside the trash",
    );
  });

  let keyItemTrashId = "";
  let itemTrashId = "";
  it("it should set to trash a form item", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    keyItemTrashId = key.body.forms[1].key;

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1&trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    itemTrashId = items.body.items[0].id;

    const res = await request(app)
      .delete(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}?trash=false`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
  });

  it("it should delete a trash form item", async () => {
    const res = await request(app)
      .delete(
        `${route}/${keyItemTrashId}/${itemTrashId}?trash=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
  });
});
