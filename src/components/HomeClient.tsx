"use client";
import { useState } from "react";
import { Quote } from "@/types/quotes";
import { likeQuoteAction, unlikeQuoteAction } from "@/app/actions/quoteActions";
import { Body2 } from "@/components/Body2";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/h2";
import { Heart } from "lucide-react";
import { useTheme } from "@/app/ThemeContext";

type HomeClientProps = {
  quotes: Quote[];
  userId?: string;
  initialIndex: number;
};

export default function HomeClient({
  quotes,
  userId,
  initialIndex,
}: HomeClientProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentQuote = quotes[currentIndex];
  const isLiked = userId ? currentQuote?.likedBy?.includes(userId) : false;
  const likeCount = currentQuote?.likedBy?.length ?? 0;
  const [message, setMessage] = useState<string | undefined>();

  function handleNextQuoteClick() {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(nextIndex);

    setMessage(undefined);
  }

  async function handleLikeClick() {
    if (!userId) return;

    const result = await (isLiked
      ? unlikeQuoteAction(currentQuote._id)
      : likeQuoteAction(currentQuote._id));

    if (!result.success) {
      setMessage(result.message ?? "Something went wrong");
    } else {
      setMessage(undefined);
    }
  }

  return (
    <Card className="max-w-md w-full p-10 bg-slate-400">
      <CardHeader className="flex items-center justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-2xl hover:bg-slate-400"
          onClick={handleLikeClick}
          aria-label="Like quote"
        >
          <Heart
            className="text-red-500 size-7"
            fill={isLiked ? "currentColor" : "none"}
          />
        </Button>
        {likeCount > 0 && (
          <span className="text-lg justify-end font-sans">{likeCount}</span>
        )}
      </CardHeader>
      <TypographyH2>{currentQuote?.quote}</TypographyH2>
      <Body2>{currentQuote?.author}</Body2>
      <Button
        variant="default"
        className={`${
          theme === "dark"
            ? "bg-slate-700 text-amber-50"
            : "bg-slate-600 text-amber-50"
        } font-sans`}
        onClick={handleNextQuoteClick}
        aria-label="See next quote"
      >
        Next Quote
      </Button>
      {message && (
        <p className="text-sm text-red-800" role="alert">
          {message}
        </p>
      )}
    </Card>
  );
}
