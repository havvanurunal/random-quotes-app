export function Button({ onClick, disabled, children }) {
  return (
    <button className='bg-slate-600 p-2 mt-4 text-white rounded-md hover:bg-slate-600/50 disabled:bg-gray-400 cursor-pointer' onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}