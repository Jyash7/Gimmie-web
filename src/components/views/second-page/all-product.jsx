import { Box, Container, Typography } from "@mui/material";
import SwiperComponent from "components/common/swiper-component";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AllProduct = () => {
  // const dispatch = useDispatch();

  // Extract products, loading, and error states from Redux
  const { productsInfo, loading, error } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <Container className="mt-4">
        <Typography variant="h3" sx={{ color: "#000", fontWeight: 700 }}>
          Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h3" sx={{ color: "#000", fontWeight: 600 }}>
            All Products
          </Typography>
        </Box>
        <SwiperComponent slidesData={productsInfo?.products ?? []} />
      </Container>
    </>
  );
};

export default AllProduct;
