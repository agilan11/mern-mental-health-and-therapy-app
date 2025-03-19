import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import React from "react";



export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

const Register=()=>{
    const { register, watch, handleSubmit, formState: { errors }, }=useForm<RegisterFormData>();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate=useNavigate();

    const mutation = useMutation(apiClient.register, {
      onSuccess: async () => {
        showToast({ message: "Registration Success!", type: "SUCCESS" });
        await queryClient.invalidateQueries("validateToken");
        navigate("/");
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    });

    const onSubmit = handleSubmit((data) => {
     mutation.mutate(data);
    });

    return (
<form className="flex flex-col gap-6 bg-black p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto overflow-hidden" onSubmit={onSubmit}>
  <h2 className="text-4xl font-bold text-[#00ff00] text-center mb-4">Create an Account</h2>

  {/* First & Last Name Fields */}
  <div className="flex flex-col md:flex-row gap-5 w-full">
    <label className="text-white text-sm font-semibold flex-1">
      First Name
      <input
        className="border border-gray-600 bg-gray-900 text-white rounded-xl w-full py-2 px-4 mt-1 focus:ring-2 focus:ring-[#00ff00] outline-none"
        {...register("firstName", { required: "This field is required" })}
      />
      {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
    </label>

    <label className="text-white text-sm font-semibold flex-1">
      Last Name
      <input
        className="border border-gray-600 bg-gray-900 text-white rounded-xl w-full py-2 px-4 mt-1 focus:ring-2 focus:ring-[#00ff00] outline-none"
        {...register("lastName", { required: "This field is required" })}
      />
      {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
    </label>
  </div>

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

  {/* Confirm Password Field */}
  <label className="text-white text-sm font-semibold w-full">
    Confirm Password
    <input
      type="password"
      className="border border-gray-600 bg-gray-900 text-white rounded-xl w-full py-2 px-4 mt-1 focus:ring-2 focus:ring-[#00ff00] outline-none"
      {...register("confirmPassword", {
        validate: (val) => {
          if (!val) return "This field is required";
          if (watch("password") !== val) return "Your passwords do not match";
        },
      })}
    />
    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
  </label>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-[#00ff00] text-black py-3 rounded-xl font-bold text-lg transition-all hover:bg-green-500 mt-4 w-full"
  >
    Create Account
  </button>
</form>


    );
};
export default Register;



