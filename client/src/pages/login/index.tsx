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

    const handleLogin = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      const loginData = {
          email: email,
          password: password
      };
  
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginData)
          });
  
          const data = await response.json();
  
          if (response.ok) {
              router.push('/healthcare/assessment');
          } else {
              throw new Error(data.message || "Failed to log in");
          }
      } catch (error) {
          setError((error as Error).message);
      }
  };
  
  

  return (
    <div className="mt-[5rem] flex flex-col items-center py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <div className="mt-4 w-full p-8 rounded-lg">
      <h2 className="text-[2rem] font-bold text-center text-purple-700 mb-6">Login to SafeSpace</h2>
      <div className='flex flex-col items-center justify-start'>
        <form className="w-[35%]" onSubmit={handleLogin}>
          <div className="">
          <label className="mt-[2rem] input bg-transparent text-[#fff] flex items-center focus:outline-none focus:border-none">
          Email
            <input id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)} 
              className="w-[73%] ml-auto input input-bordered input-primary w-full text-[#fff] border-[#fff]" />
          </label>
            
          <label className="mt-[2rem] input bg-transparent text-[#fff] flex items-center gap-2 focus:outline-none focus:border-none">
          Password
            <input 
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[73%] ml-auto input input-bordered input-primary w-full text-[#fff] border-[#fff]" />
          </label>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <div className='flex align-center justify-center'>
          <button
            type="submit"
            className="mt-[3rem] btn w-full text-[#fff] bg-purple-600 hover:bg-transparent hover:text-[#fff] hover:border-[#fff]">
            Login
          </button>
          </div>
        </form>
      </div>
      <div className="mt-6 text-center">
        <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
            Do not have an account? Sign up
        </Link>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
