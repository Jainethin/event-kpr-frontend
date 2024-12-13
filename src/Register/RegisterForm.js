import React, { useRef, useState } from 'react';
import { baseURL } from '../constant/url.js';
import toast from 'react-hot-toast'

const RegisterForm = () => {
    const [isRegistered, setIsRegistered] = useState(false); // Track registration status

    // Create refs for each form input field
    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const collegeRef = useRef('');
    const regnoRef = useRef('');
    const genderRef = useRef('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        

        // Collect data only when the submit button is clicked
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            college: collegeRef.current.value,
            regno: regnoRef.current.value,
            gender: genderRef.current.value,
        };
        if(!data.name){
            toast.error('name missing')
            nameRef.current.focus();
            return
        }else if(!data.email){
            toast.error('email missing')
            emailRef.current.focus();
            return
        }else if(!data.phone){
            toast.error('phone missing')
            phoneRef.current.focus();
            return
            
        }else if(!data.college){
            toast.error('college missing')
            collegeRef.current.focus();
            return
            
        }else if(!data.regno){
            toast.error('regno missing')
            regnoRef.current.focus();
            return
        
        }

        try {
            const res = await fetch(`${baseURL}/api/participant/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the collected data
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.error || 'Something went wrong');
            }

            // Set the registration status to true on success
            toast.success('Registeration success')
            setIsRegistered(true);
        } catch (err) {
            // console.error('Error during registration:', err.message);
            toast.error(err.message)
            switch (err.message){
                case 'invalid email format' :
                case 'email already exists' :
                    emailRef.current.focus();
                    break;
                case 'regno already exists' :
                    regnoRef.current.focus();
                    break;
                case 'invalid phone number' :
                    phoneRef.current.focus();
                    break;
                
                
                        
            }
        }
    };

    // Render success component if registration is successful
    if (isRegistered) {
        return (
            <div className="w-screen h-screen flex justify-center items-center text-lg text-green-600">
                <h1>Thank you! Your registration has been completed successfully.</h1>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 h-screen bg-green-500 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>

            <form className="space-y-5 border-2 p-4 rounded-2xl">
                {/* Name Input */}
                <div>
                    <label htmlFor="Name" className="block text-sm font-medium text-black">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="Name"
                        placeholder="Your name"
                        autoComplete="on"
                        ref={nameRef} // Store the value in this ref
                        required
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit"
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="abc@gmail.com"
                        ref={emailRef} // Store the value in this ref
                        autoComplete="on"
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit"
                    />
                </div>

                {/* Phone Number Input */}
                <div>
                    <label htmlFor="phonenumber" className="block text-sm font-medium text-black">
                        Mobile:
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        id="phonenumber"
                        placeholder="1236547890"
                        ref={phoneRef} // Store the value in this ref
                        pattern="[0-9]{10}"
                        required
                        autoComplete="on"
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit"
                    />
                </div>

                {/* College Name Input */}
                <div>
                    <label htmlFor="college_name" className="block text-sm font-medium text-black">
                        College Name:
                    </label>
                    <input
                        type="text"
                        name="college"
                        id="college_name"
                        placeholder="Your college name"
                        ref={collegeRef} // Store the value in this ref
                        autoComplete="on"
                        required
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit "
                    />
                </div>

                {/* Gender Select */}
                <div>
                    <label htmlFor="select" className="block text-sm font-medium text-black">
                        Gender:
                    </label>
                    <select
                        name="gender"
                        id="select"
                        ref={genderRef} // Store the value in this ref
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit"
                    >
                        <option value="M">MALE</option>
                        <option value="F">FEMALE</option>
                        <option value="O">OTHERS</option>
                    </select>
                </div>

                {/* Register Number Input */}
                <div>
                    <label htmlFor="Register_no" className="block text-sm font-medium text-black">
                        Register Number:
                    </label>
                    <input
                        type="text"
                        name="regno"
                        id="Register_no"
                        placeholder="Your register number"
                        ref={regnoRef} // Store the value in this ref
                        autoComplete="on"
                        required
                        className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 p-2 bg-inherit"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 p-2  border focus:ring-offset-2"
                        onClick={handleSubmit} // Handle the submission
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
