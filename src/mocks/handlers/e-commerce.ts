import { rest } from "msw";
import fakeProducts from "../data/products.json";

let products = fakeProducts;

enum ProductsStatus {
  "In Stock",
  "Low Stock",
  "Out Of Stock",
}

const eCommerceHandlers = [
  rest.get("/api/products", (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const searchParam = searchParams.get("search");
    const statusParam = searchParams.get("status");

    let filteredProducts = products;

    if (searchParam) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title
          .toLocaleLowerCase()
          .includes(searchParam.toLocaleLowerCase())
      );
    }

    if (statusParam) {
      const statusArray = statusParam.split(",");
      const hasThisStatus = (status: number) =>
        statusArray.indexOf(ProductsStatus[status]) > -1;
      filteredProducts = filteredProducts.filter((product) =>
        hasThisStatus(product.status)
      );
    }

    return res(
      ctx.delay(1000),
      ctx.json({
        products: filteredProducts,
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
