import React from "react";
import { Typography, Box } from "@mui/material";
import { productData } from "services/ProductData";
import { useParams } from "react-router-dom";
// import PersonIcon from "@mui/icons-material/Person";
// import imageurl from "services/images";

// const reviews = [
//   {
//     name: "Name",
//     rating: "⭐⭐⭐⭐",
//     reviewText: "Product is very good, fit is good",
//     date: "14 June 2024",
//     size: "10 UK",
//     color: "White,Orange",
//     loremText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac aliquet dolor, sit amet ultrices dui. Quisque ornare tellus et lorem lobortis tempus. Cras tempor, risus at gravida finibus, turpis massa malesuada lectus, eget rhoncus erat libero nec nulla.",
//     images: [
//       { src: `${imageurl.smallShoes}`, alt: "Image 1" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//     ],
//   },
//   {
//     name: "Name",
//     rating: "⭐⭐⭐⭐",
//     reviewText: "Product is very good, fit is good",
//     date: "14 June 2024",
//     size: "10 UK",
//     color: "White,Orange",
//     loremText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac aliquet dolor, sit amet ultrices dui. Quisque ornare tellus et lorem lobortis tempus. Cras tempor, risus at gravida finibus, turpis massa malesuada lectus, eget rhoncus erat libero nec nulla.",
//     images: [
//       { src: `${imageurl.smallShoes}`, alt: "Image 1" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//       { src: `${imageurl.smallShoes}`, alt: "Image 2" },
//     ],
//   },
// ];

const ReviewsComponent = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Box className="mb-4">
      <Typography variant="h4" sx={{ color: "#000", mt: 4 }}>
        Reviews
      </Typography>
      <Box sx={{ mt: 2 }}>
        {/* <Grid container spacing={4}>
                {reviews.map((review, index) => (
                    <Grid container item key={index} sx={{ borderBottom: "1px solid #E3E3E3", p: 2 }} >
                        <Grid item xs={12} md={6} sx={{ borderRight: "1px solid #E3E3E3", p: 2 }}>
                            <Box className="d-flex gap-1">
                                <Box>
                                    <PersonIcon />
                                </Box>
                                <Typography>{review.name}</Typography>
                            </Box>
                            <Typography>{review.rating}</Typography>
                            <Typography>{review.reviewText}</Typography>
                            <Typography>Reviewed on {review.date}</Typography>
                            <Typography>Size: {review.size}</Typography>
                            <Typography>Colour: {review.color}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ p: 2 }}>
                            <Typography>{review.loremText}</Typography>
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                {review.images.map((image, imgIndex) => (
                                    <Box key={imgIndex}>
                                        <img
                                            style={{
                                                border: "1px solid #E3E3E3",
                                                borderRadius: 8,
                                                padding: 3,
                                            }}
                                            src={image.src}
                                            alt={image.alt}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                ))}

            </Grid> */}

        <Typography variant="h6">{product.Reviews}</Typography>
      </Box>
    </Box>
  );
};
export default ReviewsComponent;
