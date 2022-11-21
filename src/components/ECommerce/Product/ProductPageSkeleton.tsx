import { Divider, Grid, Skeleton, Stack } from "@mui/material";

const ProductPageSkeleton = () => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sx={{ height: 70 }} />

      <Grid item xs={12} md={6} lg={7}>
        <Skeleton
          variant="rounded"
          sx={{ width: "100%", paddingBottom: "100%" }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Stack spacing={16} mt={{ xs: 0, lg: 50 }}>
          <Skeleton variant="rectangular" width={100} height={24} />
          <Skeleton variant="rectangular" width={250} height={24} />
          <Skeleton variant="rectangular" width={150} height={24} />
        </Stack>

        <Divider variant="dashed" sx={{ my: 24 }} />

        <Stack spacing={24}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton
              variant="text"
              sx={{ width: 100, fontSize: "0.875rem" }}
            />
            <Skeleton variant="text" sx={{ width: 50, fontSize: "0.875rem" }} />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton
              variant="text"
              sx={{ width: 100, fontSize: "0.875rem" }}
            />
            <Skeleton variant="text" sx={{ width: 50, fontSize: "0.875rem" }} />
          </Stack>
        </Stack>

        <Divider variant="dashed" sx={{ my: 24 }} />

        <Stack direction="row" alignItems="center" spacing={16}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductPageSkeleton;
