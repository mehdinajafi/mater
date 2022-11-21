import { Box, Card, Skeleton, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import getProducts from "@/api/e-commerce/getProducts";
import IProduct from "../interface/product";

const SProductsWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: 24,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const ECommerceShop = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useQuery(
    ["products", { search: searchParams.get("search") || "" }],
    getProducts,
    { keepPreviousData: true, staleTime: Infinity }
  );

  if (isLoading) {
    return (
      <>
        <Box mb={40}>
          <Skeleton
            variant="rectangular"
            width={300}
            height={48}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
        <SProductsWrapper>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} sx={{ p: 8 }}>
              <Skeleton
                variant="rounded"
                height={232}
                width="100%"
                sx={{ paddingBottom: "100%" }}
              />

              <Box
                sx={{
                  p: 24,
                }}
              >
                <Skeleton
                  variant="text"
                  width="100%"
                  sx={{ fontSize: "0.875rem" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 15,
                  }}
                >
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton
                    variant="text"
                    width={70}
                    sx={{ fontSize: "1rem" }}
                  />
                </Box>
              </Box>
            </Card>
          ))}
        </SProductsWrapper>
      </>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 40,
        }}
      >
        <SearchBar />
        {/* <ProductsFiltersDrawer minPrice={0} maxPrice={200} /> */}
      </Box>
      <SProductsWrapper>
        {data.products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SProductsWrapper>
    </Box>
  );
};

export default ECommerceShop;
