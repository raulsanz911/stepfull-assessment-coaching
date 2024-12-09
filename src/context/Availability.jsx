import React, { createContext, useState, useContext } from 'react';

const Availability = createContext();

export const AvailabilityProvider = ({ children }) => {
  const [availabilitySlots, setAvailabilitySlots] = useState([
  ]);

  return (
    <Availability.Provider value={{ availabilitySlots, setAvailabilitySlots }}>
      {children}
    </Availability.Provider>
  );
};

export const useAvailability = () => useContext(Availability);
