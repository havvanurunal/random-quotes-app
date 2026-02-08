export function LikeButton({ onClick, disabled, children }) {
  return (
    <button className='text-2xl cursor-pointer' onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}