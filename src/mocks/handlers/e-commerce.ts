import { ICartItem } from "@/components/ECommerce/interface/cart";
import { ProductStatus } from "@/components/ECommerce/interface/product";
import { rest } from "msw";
import { nanoid } from "nanoid";
import fakeProducts from "../data/products.json";

let products = fakeProducts;

let cart: {
  payablePrice: number;
  rrpPrice: number;
  itemsCount: number;
  discount: number;
} = {
  payablePrice: 0,
  rrpPrice: 0,
  itemsCount: 0,
  discount: 0,
};

let cartItems: ICartItem[] = [];

const roundPrice = (price: number) => {
  return Math.round(price * 100) / 100;
};

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
        statusArray.indexOf(ProductStatus[status]) > -1;
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
  rest.get("/api/product", async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const id = searchParams.get("id");
    const product = products.find((product) => product.id === id);

    if (!product) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        product,
      })
    );
  }),
  rest.post("/api/products/delete", async (req, res, ctx) => {
    const { ids } = await req.json();
    const isInDeletedIds = (id: string) => ids.indexOf(id) > -1;
    products = products.filter((product) => !isInDeletedIds(product.id));

    return res(
      ctx.status(201),
      ctx.delay(500),
      ctx.json({
        products,
        perpage: 5,
        total: 24,
      })
    );
  }),
  rest.get("/api/cart", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        cart,
        cartItems,
      })
    );
  }),
  rest.get("/api/address/all", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        addresses: [
          {
            id: 1,
            address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
            fullName: "Jayvion Simon",
            label: "Home",
            mobile: 989123456789,
            isDefault: true,
          },
        ],
      })
    );
  }),
  rest.post("/api/shipping-cost", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        shippingCost: 0,
      })
    );
  }),
  rest.get("/api/payment", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        cart: cart,
        cartShipment: {
          address: {
            id: 1,
            address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
            fullName: "Jayvion Simon",
            label: "Home",
            mobile: 989123456789,
            isDefault: true,
          },
          totalCost: 0,
        },
      })
    );
  }),
  rest.post("/api/cart/add", async (req, res, ctx) => {
    const { productId, colorId, size, quantity } = await req.json();
    const product = products.find((product) => product.id === productId);
    const color = product?.colors.find((color) => color.id === colorId);
    const indexInCartItem = cartItems.findIndex(
      (cartItem) => cartItem.product.id === productId
    );

    if (product && color) {
      // Already exist
      if (indexInCartItem > -1) {
        const cartItem = cartItems[indexInCartItem];
        const prevCartItemQuantity = cartItem.quantity;
        cartItem.quantity = quantity;
        cartItem.variant = {
          color,
          size,
        };

        cart = {
          discount: cart.discount,
          itemsCount: cart.itemsCount + (quantity - prevCartItemQuantity),
          payablePrice: roundPrice(
            cart.payablePrice +
              product.price * (quantity - prevCartItemQuantity)
          ),
          rrpPrice: roundPrice(
            cart.payablePrice +
              product.price * (quantity - prevCartItemQuantity)
          ),
        };
      } else {
        let cartItem = {
          id: nanoid(),
          product,
          quantity,
          variant: {
            color,
            size,
          },
        };
        cartItems.push(cartItem);
        cart = {
          discount: cart.discount,
          itemsCount: cart.itemsCount + quantity,
          payablePrice: roundPrice(
            cart.payablePrice + product.price * quantity
          ),
          rrpPrice: roundPrice(cart.payablePrice + product.price * quantity),
        };
      }
    }

    return res(
      ctx.status(201),
      ctx.delay(1000),
      ctx.json({
        cart: cart,
        cartItems: cartItems,
      })
    );
  }),
  rest.post("/api/cart/remove", async (req, res, ctx) => {
    const { cartItemIds } = await req.json();

    cartItemIds.forEach((id: string) => {
      const cartItemIndex = cartItems.findIndex((item) => item.id === id);
      if (cartItemIndex > -1) {
        const cartItem = cartItems[cartItemIndex];
        const cartItemQuantity = cartItem.quantity;
        const cartItemPrice = cartItem.product.price;
        const totalPrice = cartItemQuantity * cartItemPrice;
        cartItems.splice(cartItemIndex, 1);

        cart = {
          discount: cart.discount,
          itemsCount: cart.itemsCount - cartItemQuantity,
          payablePrice: roundPrice(cart.payablePrice - totalPrice),
          rrpPrice: roundPrice(cart.payablePrice - totalPrice),
        };
      }
    });

    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        cart: cart,
        cartItems: cartItems,
      })
    );
  }),
  rest.post("/api/cart/update", async (req, res, ctx) => {
    const { quantity, cartItemId } = await req.json();
    const cartItemIndex = cartItems.findIndex((item) => item.id === cartItemId);

    if (cartItemIndex > -1) {
      const cartItem = cartItems[cartItemIndex];
      const prevQuantity = cartItem.quantity;
      const cartItemPrice = cartItem.product.price;
      const totalPrice = (quantity - prevQuantity) * cartItemPrice;

      cartItem.quantity = quantity;

      cart = {
        discount: cart.discount,
        itemsCount: cart.itemsCount + (quantity - prevQuantity),
        payablePrice: roundPrice(cart.payablePrice + totalPrice),
        rrpPrice: roundPrice(cart.payablePrice + totalPrice),
      };
    }

    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        cart: cart,
        cartItems: cartItems,
      })
    );
  }),
];

export default eCommerceHandlers;
