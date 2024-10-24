import React, { } from "react";
import SwiperComponent from "components/common/swiper-component";
import { Box, Skeleton, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";


const RelatedProducts = () => {
  const { productsInfo, loading } = useSelector(
    (state) => state.product
  );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "#000", fontWeight: 600 }}>
          Other Gifts
        </Typography>
      </Box>
      {loading ? (
        <Skeleton variant="text" width="100%" height={60} />
      ) : (
        <SwiperComponent slidesData={productsInfo?.products ?? []} />
      )}
    </Container>
  );
};

export default RelatedProducts;
