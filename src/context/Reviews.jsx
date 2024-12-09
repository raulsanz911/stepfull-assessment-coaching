import React, { createContext, useState, useContext } from 'react';

const Reviews = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([
  ]);

  return (
    <Reviews.Provider value={{ reviews, setReviews }}>
      {children}
    </Reviews.Provider>
  );
};

export const useReviews = () => useContext(Reviews);
