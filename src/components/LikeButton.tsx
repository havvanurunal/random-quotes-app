import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export function LikeButton({ onClick, disabled, children }: ButtonProps) {
  return (
    <button
      className='text-lg md:text-2xl cursor-pointer self-end'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
