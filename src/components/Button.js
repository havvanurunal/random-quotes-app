import { useTheme } from '@/app/ThemeContext';

export function Button({ onClick, disabled, children }) {
  const { theme } = useTheme();
  return (
    <button className={`bg-slate-600 p-2 mt-4 text-white rounded-md hover:bg-slate-700 disabled:bg-gray-400 cursor-pointer ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-900' : 'bg-slate-300'}`} onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}