'use client';
import { Subtitle } from '@/components/Subtitle';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/Button'
import { LikeButton } from '@/components/LikeButton';
import { useQuotesContext } from '@/app/QuotesContext';
import { useQuotesDispatchContext } from '@/app/QuotesContext';
import { useTheme } from '@/app/ThemeContext';


export default function Home() {
  const { quotes, currentIndex } = useQuotesContext();
  const { handleNextQuoteClick, handleLike } = useQuotesDispatchContext();
  const { theme } = useTheme();

  function handleLikeClick() {
    handleLike(quotes[currentIndex]);
  }

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className={`flex flex-col w-full max-w-md mx-auto bg-slate-400 p-10 rounded-md  ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}>
        <div className='flex flex-row items-center justify-end gap-1'>
          <LikeButton onClick={handleLikeClick}>❤️</LikeButton>
          <span className='text-lg md:text-xl justify-end'>{quotes[currentIndex].likeCount}</span>
        </div>
        <Subtitle title={quotes[currentIndex].quote} />
        <Body2>{quotes[currentIndex].author}</Body2>
        <Button onClick={handleNextQuoteClick}>Next Quote</Button>
      </div>
    </main >
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags. 