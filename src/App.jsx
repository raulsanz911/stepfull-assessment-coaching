import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Coach from './pages/Coach';
import Student from './pages/Student';
import { UsersProvider } from './context/Users';
import { AvailabilityProvider } from './context/Availability';
import { BookingsProvider } from './context/Bookings';
import { ReviewsProvider } from './context/Reviews';

function App() {
  return (
    <UsersProvider>
      <AvailabilityProvider>
        <BookingsProvider>
          <ReviewsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/student" element={<Student />} />
              </Routes>
            </Router>
          </ReviewsProvider>
        </BookingsProvider>
      </AvailabilityProvider>
    </UsersProvider>
  );
}

export default App;

