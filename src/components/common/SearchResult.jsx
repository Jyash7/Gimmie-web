import he from "he";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsSearch } from "redux/store/slice/dashboard/productSlice";
import {
    Box,
    Typography,
    Grid,
    CardContent,
    Skeleton,
    Button,
    TextField,
    CircularProgress,
    Pagination,
} from "@mui/material";
import { truncate } from "lodash";
import CommonHeader from "components/views/Product-details/common-header";
import Footer from "components/views/second-page/footer";
import { renderStars } from "services/utiles";

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productsInfoDetail, error } = useSelector((state) => state.product);
    const hasProducts = productsInfoDetail?.products?.length > 0;
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const searchBarRef = useRef(null);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = async () => {
        if (searchInput.trim()) {
            setLoading(true);
            setCurrentPage(1);
            try {
                // await dispatch(productDetailsSearch(searchInput)).unwrap();
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
            navigate(`/search-gifts?query=${searchInput}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    const handleProductClick = (asin) => {
        navigate(`/product/${asin}`);
    };

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchInput(query);
            setLoading(true);
            setCurrentPage(1);
            dispatch(productDetailsSearch(query)).finally(() => setLoading(false));
        }
    }, [searchParams, dispatch]);

    const totalProducts = productsInfoDetail?.products?.length || 0;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = productsInfoDetail?.products?.slice(startIndex, startIndex + itemsPerPage) || [];

    return (
        <Box sx={{ background: '#fff' }}>
            <CommonHeader />
            <Box
                sx={{
                    transition: "width 0.5s ease-in-out, opacity 0.3s ease-in-out",
                    overflow: "hidden",
                    borderRadius: "25px",
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    gap: 3,
                    alignItems: 'center',
                    position: "relative",
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search for Gifts"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    inputRef={searchBarRef}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                        },
                        width: { xs: "200px", md: "300px", lg: "400px" },
                    }}
                    InputProps={{
                        endAdornment: loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : null,
                    }}
                />
                <Button
                    type="button"
                    onClick={handleSearch}
                    className="search-btn"
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ padding: 6 }}>
                {loading && (
                    <Grid container spacing={2}>
                        {[...Array(itemsPerPage)].map((_, index) => (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                                <Skeleton variant="rounded" height={300} />
                                <CardContent>
                                    <Skeleton
                                        variant="text"
                                        height={20}
                                        width="80%"
                                        sx={{ mt: 2 }}
                                    />
                                    <Skeleton variant="text" height={20} width="60%" />
                                    <Skeleton
                                        variant="text"
                                        height={20}
                                        width="40%"
                                        sx={{ mt: 1 }}
                                    />
                                    <Skeleton variant="text" height={20} width="40%" />
                                </CardContent>
                            </Grid>
                        ))}
                    </Grid>
                )}
                {!loading && hasProducts && (
                    <Grid container spacing={4}>
                        {currentProducts.map((product) => {
                            const starRating = parseFloat(product.product_star_rating) || 0;

                            return (
                                <Grid item xs={12} md={6} lg={3} key={product.asin}>
                                    <Box className="product-cards">
                                        <Box
                                            className="card-box mt-2"
                                            sx={{ height: "100%", width: "100%" }}
                                        >
                                            <Box
                                                component="img"
                                                src={product.product_photo}
                                                alt={product.product_title}
                                                sx={{
                                                    height: 160,
                                                    width: "100%",
                                                    objectFit: "contain",
                                                    mixBlendMode: "darken",
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "#000",
                                                fontWeight: 700,
                                                lineHeight: 1.3,
                                                mt: 2
                                            }}
                                        >
                                            {truncate(he.decode(product.product_title), { length: 60 })}

                                        </Typography>
                                        <Typography variant="body2">
                                            {truncate(product.sales_volume || "No volume availble", { length: 25 })}
                                        </Typography>
                                        <Typography variant="body2" className="mt-2">
                                            {renderStars(starRating)}
                                            <span className="mx-4">{product.product_num_ratings}</span>
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: "#000", fontWeight: 700, mt: 1 }} >
                                            {product.product_price || "No price"}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                                mb: 5,
                                            }}
                                        >
                                            <Button
                                                onClick={() => handleProductClick(product.asin)}
                                                variant="body2"
                                                className="card-link"
                                            >
                                                View Gift
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
                {!loading && !hasProducts && !error && (
                    <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                        No products found. Please try another search.
                    </Typography>
                )}
                {error && (
                    <Typography color="error" variant="h6" sx={{ textAlign: "center", my: 4 }}>
                        Error fetching products: {error.message || "An error occurred. Please try again."}
                    </Typography>
                )}
                {!loading && hasProducts && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                    
                        />
                    </Box>
                )}
            </Box>
            <Footer />
        </Box>
    );
};

export default SearchResultsPage;
