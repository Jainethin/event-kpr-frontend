import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const pass = "KINGcas654";
    const navigate = useNavigate();

    const handlePassword = () => {
        const input = prompt("Enter PassKey");
        if (input === pass) {
            return 1;
        } else {
            alert("Incorrect PassKey");
        }
    };
    const handleNavigate = (path) => {
        handlePassword() && navigate(path)
    }

    return (
        <div className="relative h-screen bg-gray-100">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-green-600 shadow-md py-4 text-center text-lg font-bold z-10">
                KPRCAS
            </header>

            {/* Body */}
            <main className="flex flex-col gap-3 justify-center items-center h-full pt-16 pb-16 bg-blue-700">
                <button
                className="btn btn-outline  bg-white w-screen md:w-48"
                onClick={() => navigate('/register')}
                >
                Register
                </button>
                <button
                className="btn btn-outline   bg-white w-screen md:w-48"
                onClick={() => handleNavigate('/printid')}
                >
                Print ID
                </button>
                <button
                className="btn btn-outline   bg-white w-screen md:w-48"
                onClick={() => handleNavigate('/attendance')}
                >
                Attendance
                </button>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-green-500 shadow-md py-3 text-center text-sm font-semibold z-10">
                TECH BLAST
            </footer>
        </div>

    );
};

export default HomePage;
