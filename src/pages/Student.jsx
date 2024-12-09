import React, { useState } from 'react';
import { useUsers } from '../context/Users';
import { useAvailability } from '../context/Availability';
import { useBookings } from '../context/Bookings';

const Student = () => {
    const { users } = useUsers();
    const { availabilitySlots, setAvailabilitySlots } = useAvailability();
    const { bookings, setBookings } = useBookings();
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleCoachClick = (coach) => {
        setSelectedCoach(coach);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    const handleBookSlot = (slotId) => {
        if (!selectedStudent) {
            alert('Please select a student first.');
            return;
        }

        const slotToBook = availabilitySlots.find(slot => slot.id === slotId);
        const newBooking = {
            id: bookings.length + 1,
            slot_id: slotId,
            coach_id: selectedCoach.id,
            student_id: selectedStudent.id,
            student_name: selectedStudent.name,
            coach_name: selectedCoach.name,
            coach_phone_number: selectedCoach.phone_number,
            student_phone_number: selectedStudent.phone_number,
            start_time: slotToBook.start_time
        };
        setBookings([...bookings, newBooking]);
        const updatedSlots = availabilitySlots.map(slot =>
            slot.id === slotId
                ? { ...slot, is_booked: true }
                : slot
        );
        setAvailabilitySlots(updatedSlots);
    };

    const coaches = users.filter(user => user.role === 'coach');
    const students = users.filter(user => user.role === 'student');
    const coachAvailability = availabilitySlots.filter(slot => slot.coach_id === selectedCoach?.id);
    const bookedSlotIds = new Set(bookings.map(booking => booking.slot_id));
    const availableSlots = coachAvailability.filter(slot => !bookedSlotIds.has(slot.id));
    const studentBookings = bookings.filter(booking => booking.student_id === selectedStudent?.id);

    return (
        <div className="m-4">
            <div>
                <h1 className="mb-2">Student Dashboard</h1>

                <p className="mb-2">Select a Student</p>
                <div className="flex space-x-4 mb-4">
                    {students.map(student => (
                        <button
                            key={student.id}
                            className={`border p-2 ${selectedStudent?.id === student.id ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => handleStudentClick(student)}
                        >
                            {student.name}
                        </button>
                    ))}
                </div>

                {selectedStudent && (
                    <div className="my-4">
                        <h2>Bookings for {selectedStudent.name}</h2>
                        {studentBookings.length > 0 ? (
                            studentBookings.map(slot => (
                                <div key={slot.id} className="border p-2 mt-2">
                                    {new Date(slot.start_time).toLocaleString()}
                                    <span className="ml-2 text-green-500">Booked with {slot.coach_name}</span>
                                    <p> Phone Number: {slot.coach_phone_number}</p>
                                </div>
                            ))
                        ) : (
                            <p>No bookings for this student.</p>
                        )}
                    </div>
                )}
            </div>

            <p className="mb-2">Available Coaches</p>
            <div className="flex space-x-4 mb-4">
                {coaches.map(coach => (
                    <button
                        key={coach.id}
                        className={`border p-2 ${selectedCoach?.id === coach.id ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleCoachClick(coach)}
                    >
                        {coach.name}
                    </button>
                ))}
            </div>

            {selectedCoach && (
                <div className="mt-8">
                    <h2>Available Slots for {selectedCoach.name}</h2>
                    <div className="mt-4">
                        {availableSlots.length > 0 ? (
                            availableSlots.map(slot => (
                                <div key={slot.id} className="border p-2 mt-2 flex justify-between items-center">
                                    <span>
                                        {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
                                    </span>
                                    <button
                                        className="ml-4 p-2 bg-blue-500 text-white"
                                        onClick={() => handleBookSlot(slot.id)}
                                    >
                                        Book
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No available slots for this coach.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Student;

