import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HeroSlide, sampleHeroSlides } from "./slidesData";

export interface HeroCarouselProps {
  /** Array of slide items to render in the carousel */
  slides?: HeroSlide[];
  /** Auto-advance interval in milliseconds (default: 7000ms) */
  intervalMs?: number;
  /** Custom root CSS classes for container height / styling overrides */
  className?: string;
}

export function HeroCarousel({
  slides = sampleHeroSlides,
  intervalMs = 15000,
  className = "",
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Reference for storing active auto-play timer ID across renders
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Total slides count
  const slideCount = slides.length;

  /**
   * Advances carousel to the next slide with infinite loop wrapping
   */
  const handleNext = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  }, [slideCount]);

  /**
   * Navigates to the previous slide with infinite loop wrapping
   */
  const handlePrev = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  }, [slideCount]);

  /**
   * Jumps to a specific slide index directly
   */
  const handleGoTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  /**
   * Clears existing auto-play timer cleanly
   */
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Auto-play Effect:
   * Sets up interval to auto-advance to next slide every `intervalMs` (default 7000ms).
   * Automatically pauses when `isPaused` is true (mouse hover or touch active).
   */
  useEffect(() => {
    if (slideCount <= 1 || isPaused) {
      resetTimer();
      return;
    }

    resetTimer();

    timerRef.current = setInterval(
      () => {
        handleNext();
      },
      Math.max(3000, intervalMs),
    );

    // Cleanup timer on unmount, slide change, or pause state update
    return () => {
      resetTimer();
    };
  }, [slideCount, isPaused, intervalMs, handleNext, resetTimer, currentIndex]);

  /**
   * Resets timer on manual user clicks (arrows or dot indicators)
   * Prevents immediate slide jumping right after user interaction.
   */
  const handleManualInteraction = (action: () => void) => {
    action();
    resetTimer();
    if (!isPaused && slideCount > 1) {
      timerRef.current = setInterval(
        () => {
          handleNext();
        },
        Math.max(3000, intervalMs),
      );
    }
  };

  /**
   * Keyboard Accessibility:
   * Allows Left & Right arrow keys to navigate when carousel element is focused.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleManualInteraction(handlePrev);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleManualInteraction(handleNext);
    }
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-3 sm:px-5 md:px-6 mt-3">
      <div
        role="region"
        aria-label="Product carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary h-[55vh] min-h-[400px] sm:h-[65vh] md:h-[72vh] lg:h-[76vh] max-h-[650px] ${className}`}
      >
      {/* 
        SLIDE TRACK CONTAINER
        Uses CSS flexbox track shifted horizontally via `translateX(-${currentIndex * 100}%)`.
        Calculates horizontal offset per active slide index (0 = 0%, 1 = -100%, 2 = -200%, etc.).
        Tailwind classes handle smooth 700ms slide transitions and respect prefers-reduced-motion.
      */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isFirstSlide = index === 0;
          return (
            <div
              key={slide.id || index}
              className="relative min-w-full w-full h-full flex-shrink-0 overflow-hidden"
              aria-hidden={index !== currentIndex}
            >
              {/* Ambient Blurred Backdrop Layer for seamless background fill */}
              <img
                src={slide.imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none select-none"
              />

              {/* Main Slide Image - Stretches to fill 100% of the hero section */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                loading={isFirstSlide ? "eager" : "lazy"}
                fetchPriority={isFirstSlide ? "high" : "low"}
                className="w-full h-full object-cover object-center relative z-0"
              />

              {/* Dark Gradient Overlay for Contrast & Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-transparent z-0 pointer-events-none" />

              {/* Text Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 lg:p-24 text-white z-10 max-w-4xl">
                <span className="inline-block text-xs uppercase tracking-widest font-semibold text-gold mb-2">
                  Umziotic Wellness Collection
                </span>
                <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 sm:mb-4 drop-shadow-md">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-6 font-normal">
                    {slide.subtitle}
                  </p>
                )}
                {slide.ctaText && (
                  <div>
                    {slide.ctaLink?.startsWith("http") ? (
                      <a
                        href={slide.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                      >
                        {slide.ctaText}
                        <ArrowRight size={16} />
                      </a>
                    ) : (
                      <Link
                        to={slide.ctaLink || "/shop"}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                      >
                        {slide.ctaText}
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        PREVIOUS & NEXT ARROW NAVIGATION BUTTONS
        Positioned absolutely, vertically centered.
        Visible on hover on desktop, always visible on mobile screens.
      */}
      {slideCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => handleManualInteraction(handlePrev)}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => handleManualInteraction(handleNext)}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        </>
      )}

      {/* 
        DOT INDICATORS
        Clickable dots showing current slide position at bottom center.
      */}
      {slideCount > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleManualInteraction(() => handleGoTo(index))}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  </div>
);
}
