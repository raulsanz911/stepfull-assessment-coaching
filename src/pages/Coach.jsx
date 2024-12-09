import React, { useState } from 'react';
import { useUsers } from '../context/Users';
import { useAvailability } from '../context/Availability';
import { useBookings } from '../context/Bookings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Coach = () => {
    const { users } = useUsers();
    const { availabilitySlots, setAvailabilitySlots } = useAvailability();
    const { bookings, setBookings } = useBookings();
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [startDate, setStartDate] = useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 2);
        return now;
    });

    const handleCoachClick = (coach) => {
        setSelectedCoach(coach);
    };

    const handleAddSlot = () => {
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 2);

        const newSlot = {
            id: availabilitySlots.length + 1,
            coach_id: selectedCoach.id,
            start_time: startDate.toISOString(),
            end_time: endDate.toISOString(),
            is_booked: false,
        };
        setAvailabilitySlots([...availabilitySlots, newSlot]);
    };

    const coaches = users.filter(user => user.role === 'coach');
    const coachAvailability = availabilitySlots.filter(slot => slot.coach_id === selectedCoach?.id);
    const bookedSlotIds = new Set(
        bookings
            .filter(booking => booking.coach_id === selectedCoach?.id)
            .map(booking => booking.slot_id)
    );

    const availableSlots = coachAvailability.filter(slot => !bookedSlotIds.has(slot.id));
    const upcomingSlots = bookings
        .filter(booking => booking.coach_id === selectedCoach?.id)
    const pastSlots = coachAvailability.filter(slot => new Date(slot.start_time) < new Date());

    console.log(bookings);

    return (
        <div className="m-4">
            <h1 className="mb-2">Coaches Dashboard</h1>
            <div className="flex space-x-4">
                {coaches.map(coach => (
                    <button
                        key={coach.id}
                        className="border p-2"
                        onClick={() => handleCoachClick(coach)}
                    >
                        {coach.name}
                    </button>
                ))}
            </div>

            {selectedCoach && (
                <div className="mt-8">
                    <div className="mt-4">
                        <h2>Select Date and Time:</h2>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="border-spacing-14 p-2 mt-2"
                        />
                        <button className="mx-4 mt-2 p-2 bg-green-500 text-white" onClick={handleAddSlot}>
                            Add Availability Slot
                        </button>
                    </div>

                    <div className="mt-8">
                        <h3>Available Slots</h3>
                        {availableSlots.length > 0 ? (
                            availableSlots.map(slot => (
                                <div key={slot.id} className="border p-2 mt-2 rounded-lg">
                                    {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
                                    <span className="ml-2 text-green-500">Available</span>
                                </div>
                            ))
                        ) : (
                            <p>No available slots.</p>
                        )}
                    </div>

                    <div className="mt-8">
                        <h3>Upcoming Slots</h3>
                        {upcomingSlots.length > 0 ? (
                            upcomingSlots.map(slot => (
                                <div key={slot.id} className="border p-2 mt-2 rounded-lg">
                                    {new Date(slot.start_time).toLocaleString()}
                                    <span className="ml-2 text-green-500">Booked with Student - {slot.student_name}</span>
                                    {bookings.find(booking => booking.slot_id === slot.id) && (
                                        <div>
                                            <p>Phone Number: {bookings.find(booking => booking.slot_id === slot.id).student_phone_number}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No upcoming slots.</p>
                        )}
                    </div>

                    <div className="mt-8">
                        <h3>Past Slots</h3>
                        {pastSlots.length > 0 ? (
                            pastSlots.map(slot => (
                                <div key={slot.id} className="border p-2 mt-2 rounded-lg">
                                    {new Date(slot.start_time).toLocaleString()}
                                    <span className="ml-2 text-red-500">Past</span>
                                </div>
                            ))
                        ) : (
                            <p>No past slots.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coach;
