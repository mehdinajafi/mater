import { Box, Card, Link, styled, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import IProduct from "../interface/product";

const SColorGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  "& :not(style) + :not(style)": {
    marginLeft: "-6px",
  },
});

const SColor = styled("div", {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<{ backgroundColor: string }>(({ backgroundColor }) => ({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: "2px solid rgb(255, 255, 255)",
  boxShadow: "rgba(0, 0, 0, 0.24) -1px 1px 2px inset",
  ...(backgroundColor && {
    backgroundColor,
  }),
}));

interface IProductCard {
  product: IProduct;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const colorsLength = product.colors.length;
  const priceWithDiscount = (price: number, discountPercent: number) => {
    return (price - price * (discountPercent / 100)).toFixed(2);
  };

  return (
    <Card>
      <Box p={8}>
        <Box
          sx={(theme) => ({
            position: "relative",
            overflow: "hidden",
            borderRadius: theme.borderRadius.lg,
            paddingBottom: "100%",
          })}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Box p={24}>
        <Link
          component={RouterLink}
          to={product.url.uri}
          variant="subtitle2"
          color="inherit"
          underline="hover"
        >
          {product.title}
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 20,
          }}
        >
          <Box display="flex" alignItems="center">
            <SColorGroup>
              {product.colors.map(
                ({ code, id }, index) =>
                  index < 3 && <SColor key={code} backgroundColor={code} />
              )}
            </SColorGroup>
            {colorsLength > 3 && (
              <Typography variant="subtitle2">+{colorsLength - 3}</Typography>
            )}
          </Box>

          <div>
            <Typography
              component="span"
              variant="body2"
              fontWeight={600}
              color={product.discountPercent ? "text.disabled" : "text.primary"}
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
                variant="body2"
                fontWeight={600}
                ml={4}
              >
                ${priceWithDiscount(product.price, product.discountPercent)}
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
