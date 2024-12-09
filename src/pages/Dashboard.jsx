import React, { useState } from 'react';
import Coach from './Coach';
import Student from './Student';

function DashBoard() {
    const [activeComponent, setActiveComponent] = useState('coach');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'coach':
                return <Coach />;
            case 'student':
                return <Student />;
            default:
                return <Coach />;
        }
    };

    return (
        <div className="flex items-center flex-col min-h-screen">
            <div className="w-full items-center bg-gray-400 text-white p-4 flex items-center justify-center">
                <p className="text-2xl font-bold mb-4 text-center mr-4">Scheduler</p>
                <button
                    className={`mb-2 w-1/7 px-4 py-2 mr-2 rounded-lg transition-colors duration-300 ${activeComponent === 'coach' ? 'bg-blue-600' : 'bg-green-700 hover:bg-gray-600'}`}
                    onClick={() => setActiveComponent('coach')}
                >
                    Coach
                </button>
                <button
                    className={`mb-2 w-1/7 px-4 py-2 rounded-lg transition-colors duration-300 ${activeComponent === 'student' ? 'bg-blue-600' : 'bg-green-700 hover:bg-gray-600'}`}
                    onClick={() => setActiveComponent('student')}
                >
                    Student
                </button>
            </div>
            <div className="w-2/4 p-6 ">
                {renderComponent()}
            </div>
        </div>
    );
}

export default DashBoard;
