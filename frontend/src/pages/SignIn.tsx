import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import React from "react";



export type SignInFormData = {
    email: string;
    password: string;
  };

const SignIn=()=>{
  const { register, formState: { errors }, handleSubmit }=useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      //showToast({ message: error.message, type: "ERROR" });
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
<form className="flex flex-col gap-6 bg-black p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto overflow-hidden" onSubmit={onSubmit}>
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
    className="bg-[#00ff00] text-black py-3 rounded-xl font-bold text-lg transition-all hover:bg-green-500 mt-4 w-full"
  >
    Login
  </button>
</form>

  )
}

export default SignIn;