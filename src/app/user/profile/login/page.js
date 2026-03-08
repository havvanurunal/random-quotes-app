'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


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

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='w-full items-center max-w-md bg-slate-400 p-8 rounded-lg'>
        <h1 className='text-3xl font-bold text-center mb-6'>Welcome</h1>
        {message && (
          <div className='bg-green-600 text-white p-4 rounded mb-4 text-center'>{message}</div>
        )}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList variant="line" className='gap-4 mb-6'>
            <TabsTrigger value='login' className='text-xl'>Login</TabsTrigger>
            <TabsTrigger value='signup' className='text-xl'>Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'login' ? (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='login-email' className='text-m font-medium'>Email</label>
                <input
                  id='login-email'
                  name='email'
                  autoComplete='email'
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='login-password' className='text-m font-medium'>Password</label>
                <input
                  id='login-password'
                  name='password'
                  autoComplete='current-password'
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <button type='submit' className='w-full px-4 py-2 rounded bg-slate-600 text-white cursor-pointer hover:bg-slate-700'>Submit
              </button>
            </div>
          </form>

        ) : (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='signup-name' className='text-m font-medium'>Name</label>
                <input
                  id='signup-name'
                  name='name'
                  autoComplete='given-name'
                  type='text'
                  placeholder='Name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-2 rounded border text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='signup-surname' className='text-m font-medium'>Surname</label>
                <input
                  id='signup-surname'
                  name='surname'
                  autoComplete='family-name'
                  type='text'
                  placeholder='Surname'
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='signup-email' className='text-m font-medium'>Email</label>
                <input
                  id='signup-email'
                  name='email'
                  autoComplete='email'
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='signup-password' className='text-m font-medium'>Password</label>
                <input
                  id='signup-password'
                  name='password'
                  autoComplete='new-password'
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='signup-confirm-password' className='text-m font-medium'>Confirm Password</label>
                <input
                  id='signup-confirm-password'
                  name='confirmPassword'
                  autoComplete='new-password'
                  type='password'
                  placeholder='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className='w-full px-4 py-2 rounded border  text-shadow-slate-50 border-gray-600 cursor-pointer hover:bg-slate-100 hover:text-slate-600' required />
              </div>

              <button type='submit' className='w-full px-4 py-2 rounded bg-slate-600 text-white cursor-pointer hover:bg-slate-700'>Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}