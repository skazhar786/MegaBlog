import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin({ userData }));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] font-bold text-3xl">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-black/60 font-bold">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-400"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 mt-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <Input
                        label=<span className='text-black font-bold text-xl'>Email</span>
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value:
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Please enter a valid email",
                            },
                        })}
                    />

                    <Input
                      
                        label=<span className='text-black font-bold text-xl'>Passowrd</span>
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 rounded-2xl px-4 py-2 hover:bg-blue-400  font-bold text-lg"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;