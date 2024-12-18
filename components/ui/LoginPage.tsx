import React from "react";
import { LoginButton } from "./LoginButton";
import { auth, signIn } from "@/auth";

const LoginPage = async () => {
  const session = await auth();
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        {session?.user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to DevPlus-Gemini-Project
            </h2>
            <p className="text-gray-600">You are successfully logged in.</p>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <LoginButton className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white" />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
