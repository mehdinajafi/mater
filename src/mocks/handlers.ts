import { rest, RestHandler } from "msw";
import contacts from "./data/contacts";
import currentUser from "./data/currentUser";
import notifications from "./data/notifications";

export const handlers: RestHandler[] = [
  rest.get("/api/user/profile", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(currentUser));
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
