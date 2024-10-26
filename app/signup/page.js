"use client";

import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        } else if (e.target.name == 'email') {
            setEmail(e.target.value)
        } else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

        console.log(name, email, hashedPassword)

        const result = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure data is sent as JSON
            },
            body: JSON.stringify({ name, email, password: hashedPassword }),
        });

        const data = await result.json();
        console.log("API response:", data);

        setName("");
        setEmail("");
        setPassword("");

        toast.success('Your accout created!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <div>
            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="recipe book"
                        src="../icon.png"
                        className="mx-auto h-12 w-auto"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-4">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={name}
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-yellow-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        already a member?{' '}
                        <Link href="/login" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
                            login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
