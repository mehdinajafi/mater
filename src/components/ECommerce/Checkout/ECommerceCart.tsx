import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import QuantityInput from "../QuantityInput";
import CheckoutStepper from "./CheckoutStepper";
import OrderSummeryCard from "./OrderSummeryCard";
import OrderSummeryRow from "./OrderSummeryRow";
import { ICartItem } from "../interface/cart";
import getCart from "@/api/e-commerce/getCart";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as ChevronLeftIcon } from "@/assets/icons/chevron-left.svg";
import deleteCartItems from "@/api/e-commerce/deleteCartItems";
import updateCartItem from "@/api/e-commerce/updateCartItem";
import { useSnackbar } from "notistack";

const ECommerceCart = () => {
  const { data: cartData, isLoading: cartLoading } = useQuery(
    ["cart"],
    getCart
  );

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={8}>
        <CheckoutStepper activeStep="cart" />
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart&nbsp;
                {cartData && cartData.cart.itemsCount !== 0 && (
                  <Typography component="span" color="text-secondary">
                    ({cartData.cart.itemsCount} item)
                  </Typography>
                )}
              </Typography>
            }
          />
          {cartData && cartData.cart.itemsCount === 0 ? (
            <EmptyCart />
          ) : (
            <TableContainer sx={{ mt: 24 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Total Price
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartLoading && (
                    <>
                      <ProductRowSkeleton />
                      <ProductRowSkeleton />
                    </>
                  )}
                  {cartData &&
                    cartData.cartItems.map((cartItem: ICartItem) => (
                      <ProductRow key={cartItem.id} cartItem={cartItem} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
        <Button
          component={Link}
          to="/e-commerce/shop"
          color="dark"
          sx={{ mt: 24 }}
          startIcon={<ChevronLeftIcon width={20} height={20} />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <OrderSummeryCard>
          <Stack spacing={16}>
            <OrderSummeryRow
              title={`Sub Total ${
                cartData && "(" + cartData.cart.itemsCount + ")"
              }`}
              value={cartData && "$" + cartData.cart.rrpPrice}
              isLoading={cartLoading}
            />
            {cartData && cartData.cart.discount !== 0 && (
              <OrderSummeryRow
                title="Discount"
                value={cartData && "-$" + cartData.cart.discount}
                isLoading={cartLoading}
              />
            )}
            {cartData && cartData.cart.discount !== 0 && <Divider />}
            <OrderSummeryRow
              isBold
              title="Total"
              value={cartData && "$" + cartData.cart.payablePrice}
              isLoading={cartLoading}
            />
          </Stack>
        </OrderSummeryCard>

        <Button
          component={Link}
          to="/e-commerce/checkout/shipping"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 24 }}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
};

// ----------------------- Empty Cart ----------------------- //
const EmptyCart = () => {
  return (
    <Stack alignItems="center" sx={{ py: 64, px: 16 }}>
      <Box sx={{ mb: 24, width: 320, maxWidth: "100%" }}>
        <img
          src="/assets/images/illustrations/empty-cart.svg"
          alt="empty-cart"
        />
      </Box>
      <Typography variant="h5">Cart is empty</Typography>
      <Typography variant="body2" color="text-secondary" textAlign="center">
        Look like you have no items in your shopping cart.
      </Typography>
    </Stack>
  );
};

// ----------------------- Product Row ----------------------- //
interface IProductRow {
  cartItem: ICartItem;
}

const ProductRow: React.FC<IProductRow> = ({ cartItem }) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const removeMutation = useMutation(deleteCartItems, {
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], {
        cart: data.cart,
        cartItems: data.cartItems,
      });
      enqueueSnackbar("Removed successfully.", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    },
  });
  const updateMutation = useMutation(updateCartItem, {
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], {
        cart: data.cart,
        cartItems: data.cartItems,
      });
    },
    onError: () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    },
  });

  const formatPrice = (
    quantity: number,
    price: number,
    discountPersent: number
  ) => {
    if (discountPersent) {
      const priceWithDiscount = price - (price * discountPersent) / 100;
      return (priceWithDiscount * quantity).toFixed(2);
    }
    return (quantity * price).toFixed(2);
  };

  const handleChangeQuantity = (val: number) => {
    updateMutation.mutate({ cartItemId: cartItem.id, quantity: val });
  };

  const handleDeleteProduct = () => {
    removeMutation.mutate({ cartItemIds: [cartItem.id] });
  };

  return (
    <TableRow key={cartItem.id}>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={16}>
          <Box
            sx={{
              borderRadius: "0.75rem",
              width: 64,
              height: 64,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={cartItem.product.image}
              alt="product-img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">
              {cartItem.product.title}
            </Typography>
            <Stack direction="row" alignItems="center" mt={4}>
              <Typography
                component="span"
                variant="body2"
                color="text-secondary"
              >
                size:
              </Typography>
              <Box
                sx={(theme) => ({
                  backgroundColor: "rgba(145, 158, 171, 0.16)",
                  borderRadius: theme.borderRadius.md,
                  px: 8,
                  ml: 8,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                })}
              >
                {cartItem.variant.size}
              </Box>
              <Divider orientation="vertical" sx={{ mx: 8, height: 16 }} />
              <Box
                sx={{
                  backgroundColor: cartItem.variant.color.code,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  boxShadow: "rgb(0 0 0 / 24%) -1px 1px 2px inset",
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>${cartItem.product.price}</TableCell>
      <TableCell>
        <Box width={96}>
          <QuantityInput
            value={cartItem.quantity}
            onChange={handleChangeQuantity}
            isLoading={updateMutation.isLoading}
            isDisabled={updateMutation.isLoading}
          />
        </Box>
      </TableCell>
      <TableCell>
        $
        {formatPrice(
          cartItem.quantity,
          cartItem.product.price,
          cartItem.product.discountPercent
        )}
      </TableCell>
      <TableCell>
        <IconButton
          onClick={handleDeleteProduct}
          sx={{ minWidth: 40, minHeight: 40 }}
          disabled={removeMutation.isLoading}
        >
          {removeMutation.isLoading ? (
            <CircularProgress disableShrink size={20} color="inherit" />
          ) : (
            <TrashIcon width={20} height={20} />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

// ----------------------- Product Row Skeleton ----------------------- //
const ProductRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Stack direction="row" alignItems="center" spacing={8}>
        <Skeleton variant="rounded" width={64} height={64} />
        <Box>
          <Skeleton variant="text" width={150} sx={{ fontSize: "0.875rem" }} />
          <Skeleton variant="text" width={50} sx={{ fontSize: "0.875rem" }} />
        </Box>
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={50} sx={{ fontSize: "0.875rem" }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={50} sx={{ fontSize: "0.875rem" }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={50} sx={{ fontSize: "0.875rem" }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={20} sx={{ fontSize: "0.875rem" }} />
    </TableCell>
  </TableRow>
);

export default ECommerceCart;
