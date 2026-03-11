'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
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
          <div className='bg-green-600 text-white p-4 rounded mb-4 text-center'>
            {message}
          </div>
        )}
        <Tabs
          className=''
          value={activeTab}
          onValueChange={(value: string) => setActiveTab(value)}
        >
          <TabsList variant='line' className='mb-6'>
            <TabsTrigger value='login' className='text-xl'>
              Login
            </TabsTrigger>
            <TabsTrigger value='signup' className='text-xl'>
              Sign Up
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'login' ? (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='login-email'>Email</FieldLabel>
                <Input
                  id='login-email'
                  name='email'
                  autoComplete='email'
                  type='email'
                  placeholder='john@example.com'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='login-password'>Password</FieldLabel>
                <Input
                  id='login-password'
                  name='password'
                  autoComplete='current-password'
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Button
                variant='outline'
                type='submit'
                className='bg-slate-600 text-white'
              >
                Submit
              </Button>
            </FieldGroup>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='signup-name'>Name</FieldLabel>
                <Input
                  id='signup-name'
                  name='name'
                  autoComplete='given-name'
                  type='text'
                  placeholder='Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='signup-surname'>Surname</FieldLabel>
                <Input
                  id='signup-surname'
                  name='surname'
                  autoComplete='family-name'
                  type='text'
                  placeholder='Surname'
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='signup-email'>Email</FieldLabel>
                <Input
                  id='signup-email'
                  name='email'
                  autoComplete='email'
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='signup-password'>Password</FieldLabel>
                <Input
                  id='signup-password'
                  name='password'
                  autoComplete='new-password'
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='signup-confirm-password'>
                  Confirm Password
                </FieldLabel>
                <Input
                  id='signup-confirm-password'
                  name='confirmPassword'
                  autoComplete='new-password'
                  type='password'
                  placeholder='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='bg-amber-50'
                  required
                />
              </Field>

              <Button
                variant='outline'
                type='submit'
                className='bg-slate-600 text-white'
              >
                Submit
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </main>
  );
}
