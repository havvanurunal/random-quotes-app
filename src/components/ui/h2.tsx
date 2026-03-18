import { ReactNode } from 'react';

export function TypographyH2({ children }: { children: ReactNode }) {
  return (
    <h2 className='scroll-m-20 pb-4 text-3xl font-bold font-sans tracking-tight'>
      {children}
    </h2>
  );
}
