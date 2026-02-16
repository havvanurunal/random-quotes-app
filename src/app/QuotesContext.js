'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { quotes as initialQuotes } from './quotes';

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

const QuotesContext = createContext([]);
const QuotesDispatchContext = createContext(undefined);

function shuffleArray(array) {
  const shuffled = [...array]; // make a copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled;
}


export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState(() => {
    // create array and shuffle it
    const indices = Array.from({ length: initialQuotes.length }, (_, i) => i);
    return shuffleArray(indices);
  });
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') { // this code only runs in the browser. 
      const savedQuotes = localStorage.getItem('quotes');
      if (savedQuotes) {
        setQuotes(JSON.parse(savedQuotes)); // converts it into object
      }
    }
  }, [setQuotes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  }, [quotes]);


  useEffect(() => { // runs once when components mounts
    if (typeof window !== 'undefined') { // this code only runs in the browser. 
      const savedCurrentIndex = localStorage.getItem('currentIndex'); // checks localStorage for the key 'currentIndex'
      if (savedCurrentIndex) {
        setCurrentIndex(Number(savedCurrentIndex));
      }
    }
  }, []);

  useEffect(() => { // runs every time currentIndex changes and saves the currentIndex to localStorage. 
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentIndex', String(currentIndex));
    }
  }, [currentIndex]);

  useEffect(() => { // runs once when components mounts
    if (typeof window !== 'undefined') { // this code only runs in the browser. 
      const savedShuffledIndices = localStorage.getItem('shuffledIndices'); // checks localStorage for the key 'currentIndex'
      if (savedShuffledIndices) {
        setShuffledIndices(JSON.parse(savedShuffledIndices));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shuffledIndices', JSON.stringify(shuffledIndices));
    }
  }, [shuffledIndices]);

  function handleUnlike(quoteToUnlike) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map(currentQuote => {
        if (currentQuote.quote === quoteToUnlike.quote && currentQuote.author === quoteToUnlike.author) {
          return { ...currentQuote, likeCount: 0 };
        } else {
          return currentQuote;
        }
      });
      return updatedQuotes;
    });
  }

  function handleLike(quoteToLike) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map(currentQuote => {
        if (currentQuote.quote === quoteToLike.quote && currentQuote.author === quoteToLike.author) {
          return { ...currentQuote, likeCount: currentQuote.likeCount + 1 };
        } else {
          return currentQuote;
        }
      });
      return updatedQuotes;
    });
  }


  function handleNextQuoteClick() {
    const nextIndex = shuffledIndices[position];
    setCurrentIndex(nextIndex);

    if (position === shuffledIndices.length - 1) {
      const newShuffled = shuffleArray(shuffledIndices);
      setShuffledIndices(newShuffled);
      setPosition(0);
      setCurrentIndex(newShuffled[0]);
    } else {
      setPosition(currentPosition => currentPosition + 1);
    }
  }

  return (
    <QuotesContext.Provider value={{ quotes, setQuotes, currentIndex }}>
      <QuotesDispatchContext.Provider value={{ handleUnlike, handleLike, handleNextQuoteClick }}>{children}</QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
}

// useQuotesContext is a custom hook used to simplify the usage of QuotesContext. 
export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);