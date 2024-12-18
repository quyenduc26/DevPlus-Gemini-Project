import React from "react";
import { LoginButton } from "./LoginButton";
import { auth, signIn } from "@/auth";

const LoginPage = async () => {
  const session = await auth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        {session && session?.user ? (
          <>
            <h1 className="text-2xl font-bold">Welcome to Home page của DevPlus-Gemini-Project</h1>
            <p>This is the home page content.</p>
          </>
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
