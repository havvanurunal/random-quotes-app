export function LikeButton({ onClick, disabled, children }) {
  return (
    <button className='text-lg md:text-2xl cursor-pointer self-end' onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}