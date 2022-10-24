import { rest, RestHandler } from "msw";

export const handlers: RestHandler[] = [
  rest.get("/api/user/profile", (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        name: "Mehdi Najafi",
        role: "admin",
        email: "dev.mehdinajafi@gmail.com",
        avatar:
          "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
      })
    );
  }),
];
