import React, { createContext, useState, useContext } from 'react';

const Bookings = createContext();

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([
  ]);

  return (
    <Bookings.Provider value={{ bookings, setBookings }}>
      {children}
    </Bookings.Provider>
  );
};

export const useBookings = () => useContext(Bookings);
