import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Track login state

  const mutation = useMutation(apiClient.signIn, {
    onMutate: () => setIsLoggingIn(true),  // Disable button on start
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
    onSettled: () => setIsLoggingIn(false) // Re-enable button after completion
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 bg-black p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto overflow-hidden"
    >
      <h2 className="text-4xl font-bold text-[#00ff00] text-center mb-4">Sign In</h2>

      {/* Email Field */}
      <label className="text-white text-sm font-semibold w-full">
        Email
        <input
          type="email"
          className="border border-gray-600 bg-gray-900 text-white rounded-xl w-full py-2 px-4 mt-1 focus:ring-2 focus:ring-[#00ff00] outline-none"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </label>

      {/* Password Field */}
      <label className="text-white text-sm font-semibold w-full">
        Password
        <input
          type="password"
          className="border border-gray-600 bg-gray-900 text-white rounded-xl w-full py-2 px-4 mt-1 focus:ring-2 focus:ring-[#00ff00] outline-none"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </label>

      {/* Sign Up Link */}
      <span className="text-sm text-white text-center mt-2">
        Not Registered?{" "}
        <Link className="underline text-[#00ff00] hover:text-green-400" to="/register">
          Create an account here
        </Link>
      </span>

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-[#00ff00] text-black py-3 rounded-xl font-bold text-lg transition-all mt-4 w-full flex justify-center items-center ${
          isLoggingIn ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"
        }`}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default SignIn;
