'use client';

import { Button } from '@/components/ui/button';

export default function LoginButton() {
  return (
    <Button>
      <a href='/auth/login' className='font-bold p-3 font-sans'>
        Log In
      </a>
    </Button>
  );
}
