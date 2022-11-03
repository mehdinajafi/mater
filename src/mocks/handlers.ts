import { rest, RestHandler } from "msw";
import contacts from "./data/contacts.json";
import currentUser from "./data/currentUser.json";
import notifications from "./data/notifications.json";
import invoices from "./data/invoices.json";
import topApplications from "./data/topApplications.json";
import topAuthors from "./data/topAuthors.json";
import topCountries from "./data/topCountries.json";
import totalStats from "./data/totalStats.json";
import appTotalStats from "./data/appTotalStats.json";

export const handlers: RestHandler[] = [
  rest.get("/api/user/profile", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(currentUser));
  }),
  rest.get("/api", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        totalStats,
        invoices,
        topApplications,
        topAuthors,
        topCountries,
        appTotalStats,
      })
    );
  }),
  rest.get("/profile/name", (req, res, ctx) => {
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
