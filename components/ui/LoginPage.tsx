import React from 'react';
import Google from '@/public/google.svg';
import Github from '@/public/github.svg';
import { LoginButton } from './LoginButton';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await auth();
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Welcome to FloraLens
        </h1>
        {session?.user ? (
          redirect('/')
        ) : (
          <div>
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <LoginButton
                icon={Github}
                provider="Github"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
              />
            </form>
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <LoginButton
                icon={Google}
                provider="Google"
                className="mt-3 bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
