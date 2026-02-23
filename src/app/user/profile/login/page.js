'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleSubmit() {
    if (activeTab === 'login') {
      setMessage(`Welcome back, ${formData.email}!`);
    } else {
      setMessage(`Welcome, ${formData.name}! Account created.`);
    }

    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  console.log('formData:', formData);

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='w-full items-center max-w-md bg-slate-400 p-8 rounded-lg'>
        <h1 className='text-3xl font-bold text-center mb-6'>Welcome</h1>
        {message && (
          <div className='bg-green-600 text-white p-4 rounded mb-4 text-center'>{message}</div>
        )}
        <div className='flex gap-2 justify-between mb-6'>
          <button className={`px-6 py-2 rounded cursor-pointer ${activeTab === 'login' ? 'bg-slate-600 text-white' : 'bg-slate-500 text-gray-300'}`} onClick={() => setActiveTab('login')}>Login
          </button>
          <button className={`px-6 py-2 rounded cursor-pointer ${activeTab === 'signup' ? 'bg-slate-600 text-white' : 'bg-slate-500 text-gray-300'}`} onClick={() => setActiveTab('signup')}>Sign Up
          </button>
        </div>
        {activeTab === 'login' ? (
          <div className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />

            <input
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />
            <button className='w-full px-4 py-2 rounded bg-slate-600 text-white cursor-pointer hover:bg-slate-700' onClick={handleSubmit}>Submit
            </button>
          </div>

        ) : (
          <div className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-4 py-2 rounded border text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />

            <input
              type='text'
              placeholder='Surname'
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />

            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />

            <input
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />

            <input
              type='password'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' />
            <button className='w-full px-4 py-2 rounded bg-slate-600 text-white cursor-pointer hover:bg-slate-700' onClick={handleSubmit}>Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}