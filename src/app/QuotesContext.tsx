'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { quotes as initialQuotes } from '../quotes';
import { Quote } from '@/quotes';
import { type ReactNode } from 'react';

type QuotesContextType = {
  quotes: Quote[];
  currentIndex: number;
};

type QuotesDispatchContextType = {
  handleUnlike: (quote: Quote) => void;
  handleLike: (quote: Quote) => void;
  handleNextQuoteClick: () => void;
};

type QuoteProviderProps = {
  children: ReactNode;
};

const QuotesContext = createContext<QuotesContextType>({
  quotes: [],
  currentIndex: 0,
});

const QuotesDispatchContext = createContext<QuotesDispatchContextType | null>(
  null
);

export const QuotesProvider = ({ children }: QuoteProviderProps) => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // this code only runs in the browser.
      const savedQuotes = localStorage.getItem('quotes');
      if (savedQuotes) {
        setQuotes(JSON.parse(savedQuotes) as Quote[]); // converts it into object
      }
      const savedCurrentIndex = localStorage.getItem('currentIndex'); // checks localStorage for the key 'currentIndex'
      if (savedCurrentIndex) {
        setCurrentIndex(Number(savedCurrentIndex));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  }, [quotes]);

  useEffect(() => {
    // runs every time currentIndex changes and saves the currentIndex to localStorage.
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentIndex', String(currentIndex));
    }
  }, [currentIndex]);

  function handleUnlike(quoteToUnlike: Quote) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((currentQuote) => {
        if (
          currentQuote.quote === quoteToUnlike.quote &&
          currentQuote.author === quoteToUnlike.author
        ) {
          return {
            ...currentQuote,
            likeCount: Math.max(0, currentQuote.likeCount - 1),
          };
        } else {
          return currentQuote;
        }
      });
      return updatedQuotes;
    });
  }

  function handleLike(quoteToLike: Quote) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((currentQuote) => {
        if (
          currentQuote.quote === quoteToLike.quote &&
          currentQuote.author === quoteToLike.author
        ) {
          return { ...currentQuote, likeCount: currentQuote.likeCount + 1 };
        } else {
          return currentQuote;
        }
      });
      return updatedQuotes;
    });
  }

  function handleNextQuoteClick() {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(nextIndex);
  }

  return (
    <QuotesContext.Provider value={{ quotes, currentIndex }}>
      <QuotesDispatchContext.Provider
        value={{ handleUnlike, handleLike, handleNextQuoteClick }}
      >
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

// useQuotesContext is a custom hook used to simplify the usage of QuotesContext.
export const useQuotesContext = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error('useQuotesContext must be used within a QuotesProvider');
  }
  return context;
};

export const useQuotesDispatchContext = () => {
  const context = useContext(QuotesDispatchContext);
  if (!context) {
    throw new Error(
      'useQuotesDispatchContext must be used within a QuotesProvider'
    );
  }
  return context;
};
