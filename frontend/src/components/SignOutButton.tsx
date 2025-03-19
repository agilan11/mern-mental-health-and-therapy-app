import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import React from "react";


const SignOutButton = () => {
    const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

    const handleClick = () => {
        mutation.mutate();
      };

    return (
      <button onClick={handleClick}
        className="bg-[#00ff00] text-black px-4 py-2 font-bold rounded-md hover:bg-[#008000] transition duration-300"
      >
        Sign Out
      </button>
    );
  };
  
  export default SignOutButton;
  