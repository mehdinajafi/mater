import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Divider,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ColorCheckbox from "../ColorCheckbox";
import QuantityInput from "../QuantityInput";
import IProduct from "../interface/product";
import addToCart from "@/api/e-commerce/addToCart";
import { ReactComponent as ShoppingCartPlusIcon } from "@/assets/icons/shopping-cart-plus.svg";

interface IOrderProductForm {
  product: IProduct;
}

const OrderProductForm: React.FC<IOrderProductForm> = (props) => {
  const { product } = props;
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
    <Stack spacing={24}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
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
  );
};

export default OrderProductForm;
