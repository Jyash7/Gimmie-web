import { Box, Container, Typography, Skeleton, Grid, Alert } from "@mui/material";
import SwiperComponent from "components/common/swiper-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { productDetailsUnder50 } from "redux/store/slice/dashboard/productSlice";

const AllProduct = () => {
  const dispatch = useDispatch();
  const product = localStorage.getItem("productsInfo");
  const data = product !== null ? JSON.parse(product) : {};
  const { productsInfo50, loading, error } = useSelector((state) => state.product);
  const hasProducts = productsInfo50?.products?.length > 0;


  useEffect(() => {
    if (data?.products === undefined) {
      dispatch(
        productDetailsUnder50({
          type: "keyword",
          keyword: "",
        })
      );
    }
  }, [data?.products, dispatch]);

  return (
    <>
      <Container className="mt-4">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h4" sx={{ color: "#000", fontWeight: 600 }}>
            Most popular products of the year for people under 50
          </Typography>
        </Box>

        {(loading || !hasProducts) && (
          <Grid container spacing={2}>
            {Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && hasProducts && (
          <SwiperComponent slidesData={productsInfo50?.products ?? []} />
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.message || "An error occurred while fetching the products."}
          </Alert>
        )}

      </Container>
    </>
  );
};

export default AllProduct;
