import { rest } from "msw";
import fakeProducts from "../data/products.json";

let products = fakeProducts;

const eCommerceHandlers = [
  rest.get("/api/products", (req, res, ctx) => {
    return res(
      ctx.json({
        products,
        perpage: 5,
        total: 24,
      })
    );
  }),
  rest.post("/api/products/delete/:productId", (req, res, ctx) => {
    const { productId } = req.params as { productId: string };
    products = products.filter((product) => product.id !== productId);

    return res(
      ctx.status(201),
      ctx.json({
        products,
        perpage: 5,
        total: 24,
      })
    );
  }),
];

export default eCommerceHandlers;
