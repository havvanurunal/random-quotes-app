'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LogoutButton() {
  return (
    <Button>
      <Link href='/auth/logout' className='font-bold p-3 font-sans'>
        Log Out
      </Link>
    </Button>
  );
}
