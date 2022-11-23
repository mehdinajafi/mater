import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ProductNotAvailableBox from "./ProductNotAvailableBox";
import QuantityInput from "../QuantityInput";
import ColorCheckbox from "../ColorCheckbox";
import IProduct, { ProductStatus } from "../interface/product";
import Carousel from "@/components/ui/Carousel";
import kFormatter from "@/utils/kFormatter";
import addToCart from "@/api/e-commerce/addToCart";
import { ReactComponent as ShoppingCartPlusIcon } from "@/assets/icons/shopping-cart-plus.svg";

interface IProductComponent {
  product: IProduct;
}

const statusVariant: Record<
  number,
  { color: "error" | "warning" | "success"; title: string }
> = {
  0: {
    color: "success",
    title: "In Stock",
  },
  1: {
    color: "warning",
    title: "Low Stock",
  },
  2: {
    color: "error",
    title: "Out Of Stock",
  },
};

const Product: React.FC<IProductComponent> = (props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState("0");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const addToCartMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], {
        cart: data.cart,
        cartItems: data.cartItems,
      });
      enqueueSnackbar("Added to cart.", {
        autoHideDuration: 2000,
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Something went wrong!", {
        autoHideDuration: 2000,
        variant: "error",
      });
    },
  });

  const buyNowMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], {
        cart: data.cart,
        cartItems: data.cartItems,
      });
      navigate("/e-commerce/checkout/cart");
    },
    onError: () => {
      enqueueSnackbar("Something went wrong!", {
        autoHideDuration: 2000,
        variant: "error",
      });
    },
  });

  const { product } = props;

  const priceWithDiscount = (price: number, discountPercent: number) => {
    return (price - price * (discountPercent / 100)).toFixed(2);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };
  const handleSizeChange = (e: SelectChangeEvent<string>) => {
    setSelectedSize(e.target.value);
  };
  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(value);
  };

  const handleAddToCard = () => {
    addToCartMutation.mutate({
      productId: product.id,
      colorId: Number(selectedColor) || product.colors[0].id,
      size: Number(selectedSize) || product.sizes[0],
      quantity: Number(selectedQuantity) || 1,
    });
  };

  const handleBuynow = () => {
    buyNowMutation.mutate({
      productId: product.id,
      colorId: Number(selectedColor) || product.colors[0].id,
      size: Number(selectedSize) || product.sizes[0],
      quantity: Number(selectedQuantity) || 1,
    });
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={6} lg={7}>
        <Carousel
          disableDots
          thumbs={product.gallery}
          arrowPosition="bottom-right"
          withCounter
        >
          {product.gallery.map((image) => (
            <Carousel.Item key={image}>
              <img src={image} alt="product-image" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Grid>

      <Grid item xs={12} md={6} lg={5}>
        <Stack spacing={16} mt={{ xs: 0, lg: 50 }}>
          <div>
            <Chip
              label={statusVariant[product.status].title}
              color={statusVariant[product.status].color}
            />
          </div>
          <Typography variant="h5">{product.title}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={product.rating.rate} readOnly size="large" />
            <Typography variant="body2" color="text-secondary" ml={8}>
              ({kFormatter(product.rating.count)} reviews)
            </Typography>
          </Box>
          {product.status !== ProductStatus.OutOfStock && (
            <Box>
              <Typography
                component="span"
                variant="h4"
                fontWeight={600}
                color={
                  product.discountPercent ? "text.disabled" : "text.primary"
                }
                sx={{
                  textDecoration: product.discountPercent
                    ? "line-through"
                    : "none",
                }}
              >
                ${product.price}
              </Typography>
              {product.discountPercent !== 0 && (
                <Typography
                  component="span"
                  variant="h4"
                  fontWeight={600}
                  ml={4}
                >
                  ${priceWithDiscount(product.price, product.discountPercent)}
                </Typography>
              )}
            </Box>
          )}
          {product.status === ProductStatus.OutOfStock && (
            <ProductNotAvailableBox />
          )}
        </Stack>

        {product.status !== ProductStatus.OutOfStock && (
          <>
            <Divider variant="dashed" sx={{ my: 24 }} />
            <Stack spacing={24}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Color</Typography>
                <Box maxWidth={144}>
                  {product.colors.map(({ code, id }) => (
                    <ColorCheckbox
                      key={id}
                      colorCode={code}
                      value={String(id)}
                      checked={selectedColor === String(id)}
                      onChange={handleColorChange}
                    />
                  ))}
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Size</Typography>
                <Select
                  native
                  size="small"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Select>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Quantity</Typography>
                <QuantityInput
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                />
              </Stack>

              <Divider variant="dashed" />

              <Stack direction="row" spacing={16}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  size="large"
                  startIcon={<ShoppingCartPlusIcon width={20} height={20} />}
                  onClick={handleAddToCard}
                  disabled={addToCartMutation.isLoading}
                >
                  Add To Cart
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleBuynow}
                  disabled={buyNowMutation.isLoading}
                >
                  Buy Now
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Product;
