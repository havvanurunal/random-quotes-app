import { ReactNode } from 'react';

type Body2Prop = {
  children: ReactNode;
};

export function Body2({ children }: Body2Prop) {
  return (
    <span className='text-sm md:text-lg text-end font-sans'>{children}</span>
  );
}
