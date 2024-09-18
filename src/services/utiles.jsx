export const saveSession = (data) => {
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("id", data.id);
  localStorage.setItem("email", data.email);
  localStorage.setItem("userType", data.user_type);
  localStorage.setItem("code", data.code);
};

export const getSession = () => {
  return {
    authToken: localStorage.getItem("authToken"),
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    userType: localStorage.getItem("userType"),
    code: localStorage.getItem("code"),
  };
};

export const clearSession = () => {
  localStorage.clear();
};

// "homepage": "https://gimmie.ai/web",

// export const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//   const emptyStars = 5 - fullStars - halfStar;

//   return (
//     <>
//       {Array(fullStars)
//         .fill()
//         .map((_, index) => (
//           <span
//             key={`full-${index}`}
//             style={{
//               color: "rgba(255, 202, 16, 1)",
//               fontSize: "22px",
//               fontWeight:600
//             }}
//           >
//             &#9733;
//           </span>
//         ))}
//       {halfStar === 1 && <span style={{ fontSize: "22px" }}>&#9734;</span>}
//       {Array(emptyStars)
//         .fill()
//         .map((_, index) => (
//           <span key={`empty-${index}`} style={{ fontSize: "22px" }}>
//             &#9734;
//           </span>
//         ))}
//     </>
//   );
// };


// export const renderStars = (rating) => {
//   if (!rating || isNaN(rating)) {
//     return "No Rating";  // Gracefully handle invalid ratings
//   }

//   const stars = Math.round(rating);  // Round to the nearest whole number

//   // Create an array of stars, with the length of the rounded rating
//   return Array(stars)
//     .fill('★')
//     .join('');  // Join to create the star string
// };



export const renderStars = (rating = 0) => {
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    rating = 0; // Fallback to 0 if rating is invalid
  }
  
  const stars = Array(Math.round(rating)).fill(1); // Create stars based on the rounded rating

  return (
    <span>
      {stars.map((_, index) => (
        <span key={index}>⭐</span> // Replace this with your actual star rendering logic
      ))}
    </span>
  );
};