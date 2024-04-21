// pages/signup/index.tsx
import React, { FC, useState } from 'react';
import Link from 'next/link';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { useAuth } from '@/context/AuthContext'; // Update the import path as necessary
import { useRouter } from 'next/router';

const SignupPage: FC = () => {
  const { signup } = useAuth(); // Use the signup function from your AuthContext
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (pass !== confirmPass) {
      setError('Passwords do not match');
      return false;
    } else if (pass.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswords(password, confirmPassword)) {
      try {
        // Replace with actual user data from form
        await signup({ email, username: 'NewUser' });
        router.push('/login'); // Redirect to userDetails or dashboard
      } catch (error) {
        // Handle errors (e.g., show message to the user)
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div className="mt-[5rem] flex flex-col items-center justify-center py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <div className="mt-4 w-full p-8 rounded-lg ">
      <h2 className="text-[2rem] font-bold text-center text-purple-700 mb-6">Sign Up for SafeSpace</h2>
      <div className='flex flex-col items-center justify-start'>
        <form className="w-[55%]" onSubmit={handleSignup}>
          <div className="w-full">
          <label className="mt-[2rem] input bg-transparent text-[#fff] flex items-center focus:outline-none focus:border-none">
          Email
            <input id="email"
               type="email"
               placeholder="Enter your email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
              className="w-[75%] ml-auto input input-bordered input-primary w-full text-[#fff] border-[#fff]" />
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
            className="w-[75%] ml-auto input input-bordered input-primary w-full text-[#fff] border-[#fff]" />
          </label>

          <label className="mt-[2rem] input bg-transparent text-[#fff] flex items-center gap-2 focus:outline-none focus:border-none">
          Confirm Password
            <input 
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-[75%] ml-auto input input-bordered input-primary w-full text-[#fff] border-[#fff]" />
          </label>
          </div>
          {error && <p className="mt-[2rem] text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="mt-[3rem] btn w-full bg-purple-600 hover:bg-transparent hover:text-[#fff] hover:border-[#fff]">
            Sign up
          </button>
        </form>
      </div>
      <div className="mt-6 text-center">
        <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Already have an account? Login
        </Link>
      </div>
    </div>
    </div>
  );
  
  
};

export default SignupPage;
