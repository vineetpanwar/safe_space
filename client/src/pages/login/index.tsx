import React, { FC, useState } from 'react';
import Link from 'next/link';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { useAuth } from '@/context/AuthContext'; // Update the import path as necessary
import { useRouter } from 'next/router';

const LoginPage: FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pass: string) => {
        if (pass.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        setError('');
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validatePassword(password)) {
            try {
                // Assume login is successful
                await login({ email, username: 'JohnDoe' }); 
                router.push('/userDetails'); 
            } catch (error) {
               
                setError('Failed to log in. Please try again.');
            }
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <div className="mt-4 w-full max-w-md p-8 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Login to SafeSpace</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link href="/signup">
          <a className="font-medium text-purple-600 hover:text-purple-500">
            Do not have an account? Sign up
          </a>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
