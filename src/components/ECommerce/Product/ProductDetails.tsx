import { Box, Chip, Rating, Stack, Typography } from "@mui/material";
import kFormatter from "@/utils/kFormatter";
import IProduct, { ProductStatus } from "../interface/product";

interface IProductDetails {
  product: IProduct;
}

const statusVariant: Record<
  number,
  {
    title: string;
    color: "success" | "warning" | "error";
  }
> = {
  [ProductStatus.InStock]: {
    title: "In Stock",
    color: "success",
  },
  [ProductStatus.LowStock]: {
    title: "Low Stock",
    color: "warning",
  },
  [ProductStatus.OutOfStock]: {
    title: "Out Of Stock",
    color: "error",
  },
};

const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const priceWithDiscount = (price: number, discountPercent: number) => {
    return (price - price * (discountPercent / 100)).toFixed(2);
  };

  return (
    <Stack spacing={16} mt={{ xs: 0, lg: 50 }}>
      <div>
        <Chip
          label={statusVariant[product.status].title}
          color={statusVariant[product.status].color}
        />
      </div>
      <Typography variant="h5">{product.title}</Typography>
      <Stack direction="row" alignItems="center">
        <Rating value={product.rating.rate} readOnly size="large" />
        <Typography variant="body2" color="text-secondary" ml={8}>
          ({kFormatter(product.rating.count)} reviews)
        </Typography>
      </Stack>
      {product.status !== ProductStatus.OutOfStock && (
        <Box>
          <Typography
            component="span"
            variant="h4"
            fontWeight={600}
            color={product.discountPercent ? "text.disabled" : "text.primary"}
            sx={{
              textDecoration: product.discountPercent ? "line-through" : "none",
            }}
          >
            ${product.price}
          </Typography>
          {product.discountPercent !== 0 && (
            <Typography component="span" variant="h4" fontWeight={600} ml={4}>
              ${priceWithDiscount(product.price, product.discountPercent)}
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default ProductDetails;
