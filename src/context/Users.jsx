import React, { createContext, useState, useContext } from 'react';

const Users = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Coach 1', role: 'coach', phone_number: '123-456-7890' },
        { id: 2, name: 'Coach 2', role: 'coach', phone_number: '123-456-7891' },
        { id: 3, name: 'Coach 3', role: 'coach', phone_number: '123-456-7892' },
        { id: 4, name: 'Student 1', role: 'student', phone_number: '098-765-4321' },
        { id: 5, name: 'Student 2', role: 'student', phone_number: '098-765-4322' },
        { id: 6, name: 'Student 3', role: 'student', phone_number: '098-765-4323' },


    ]);

    return (
        <Users.Provider value={{ users, setUsers }}>
            {children}
        </Users.Provider>
    );
};

export const useUsers = () => useContext(Users);