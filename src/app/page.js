'use client';
import { useState, useEffect } from 'react';
import { quotes as initialQuotes } from './quotes';
import { Subtitle } from '@/components/Subtitle';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/Button'
import { LikeButton } from '@/components/LikeButton';

/* function getRandomIndex(currentIndex, arrayLength) {
  const random = () => Math.floor(Math.random() * arrayLength);

  const result = random();
  if (result === currentIndex) {
    getRandomIndex(currentIndex, arrayLength);
  } else {
    return result;
  }
} */

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') { // this code only runs in the browser. 
      const savedQuotes = localStorage.getItem('quotes');
      if (savedQuotes) {
        setQuotes(JSON.parse(savedQuotes)); // converts it into object
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  }, [quotes]);

  function handleNextClick() {
    if (typeof window !== 'undefined') {
      console.log('Next quote button is clicked');
      const nextIndex = Math.floor(Math.random() * quotes.length);
      setCurrentIndex(nextIndex);
    }
  }

  function handleLikeClick() {
    const updatedQuotes = [...quotes];
    updatedQuotes[currentIndex].likeCount += 1;
    setQuotes(updatedQuotes);
  }

  return (
    <main className='min-h-dvh flex items-center'>
      <div className='flex flex-col w-md mx-auto bg-slate-400 p-10 rounded-md'>
        <Subtitle title={quotes[currentIndex].quote} />
        <Body2>{quotes[currentIndex].author}</Body2>
        <div className='flex flex-row items-center gap-1'>
          <LikeButton onClick={handleLikeClick}>❤️</LikeButton>
          <span className='text-lg'>{quotes[currentIndex].likeCount}</span>
        </div>
        <Button onClick={handleNextClick}>Next Quote</Button>
      </div>
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags. 