import { Box, Container, Typography, Skeleton, Grid, Alert } from "@mui/material";
import SwiperComponent from "components/common/swiper-component";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AllProduct = () => {
  const { productsInfo, loading, error } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const keyword = "Most popular products of the year for people under 50";
  
  const hasProducts = productsInfo?.products?.length > 0;

  // Function to filter products by keyword
  const filterProductsByKeyword = (products) => {
    return products.filter((product) =>
      // Assuming your product has a 'description' or 'tags' field where the keyword can be matched
      product.description?.toLowerCase().includes(keyword.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  useEffect(() => {
    if (hasProducts) {
      // Filter products that match the keyword
      const matchedProducts = filterProductsByKeyword(productsInfo.products);
      setFilteredProducts(matchedProducts);

      // Save the filtered products to localStorage
      localStorage.setItem("popularProducts", JSON.stringify(matchedProducts));
    }
  }, [productsInfo, hasProducts]);

  // Load products from localStorage if available
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("popularProducts"));
    if (storedProducts) {
      setFilteredProducts(storedProducts);
    }
  }, []);

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
          <Typography variant="h3" sx={{ color: "#000", fontWeight: 600 }}>
            Most Popular Gifts for People Under 50
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

        {!loading && filteredProducts.length > 0 && (
          <SwiperComponent slidesData={filteredProducts} />
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.message || "An error occurred while fetching the products."}
          </Alert>
        )}

        {!loading && filteredProducts.length === 0 && (
          <Typography sx={{ mt: 4, textAlign: "center" }}>
            No products found matching the keyword.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default AllProduct;
