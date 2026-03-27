'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Button>
      <Link href='/auth/login' className='font-bold p-3 font-sans'>
        Log In
      </Link>
    </Button>
  );
}
