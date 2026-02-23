'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { quotes as initialQuotes } from './quotes';

const QuotesContext = createContext([]);
const QuotesDispatchContext = createContext(undefined);

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  function handleUnlike(quoteToUnlike) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map(currentQuote => {
        if (currentQuote.quote === quoteToUnlike.quote && currentQuote.author === quoteToUnlike.author) {
          return { ...currentQuote, likeCount: Math.max(0, currentQuote.likeCount - 1) };
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
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while
      (nextIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(nextIndex);
  }

  return (
    <QuotesContext.Provider value={{ quotes, currentIndex }}>
      <QuotesDispatchContext.Provider value={{ handleUnlike, handleLike, handleNextQuoteClick }}>{children}</QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
}

// useQuotesContext is a custom hook used to simplify the usage of QuotesContext. 
export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);