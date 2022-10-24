import { rest, RestHandler } from "msw";
import contacts from "./data/contacts";
import notifications from "./data/notifications";

export const handlers: RestHandler[] = [
  rest.get("/api/user/profile", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Mehdi Najafi",
        role: "admin",
        email: "dev.mehdinajafi@gmail.com",
        avatar:
          "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
      })
    );
  }),
  rest.get("/api/user/contacts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contacts));
  }),
  rest.get("/api/user/notifications", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(notifications));
  }),
  rest.post("/api/user/notification/mark-as-read", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(5000));
  }),
];
