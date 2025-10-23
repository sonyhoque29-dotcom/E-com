'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import classes from './index.module.scss'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  backgroundColor: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to ShopHub",
    subtitle: "Discover Amazing Products",
    description: "Find the best deals on thousands of products. Quality guaranteed with fast shipping worldwide.",
    image: "/static-image.jpg",
    buttonText: "Shop Now",
    buttonLink: "/products",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Collection",
    description: "Explore our latest collection of trendy products. Stay ahead of the fashion curve.",
    image: "/static-image.jpg",
    buttonText: "View Collection",
    buttonLink: "/products",
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Special Offers",
    subtitle: "Limited Time Deals",
    description: "Don't miss out on our exclusive offers. Save up to 50% on selected items.",
    image: "/static-image.jpg",
    buttonText: "Get Deals",
    buttonLink: "/deals",
    backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  }
]

export const CarouselHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className={classes.heroSection}>
      <div className={classes.carouselContainer}>
        {/* Slides */}
        <div className={classes.slidesWrapper}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${classes.slide} ${index === currentSlide ? classes.active : ''}`}
              style={{ background: slide.backgroundColor }}
            >
              <div className={classes.slideContent}>
                <div className={classes.textContent}>
                  <h1 className={classes.title}>{slide.title}</h1>
                  <h2 className={classes.subtitle}>{slide.subtitle}</h2>
                  <p className={classes.description}>{slide.description}</p>
                  <Link href={slide.buttonLink} className={classes.ctaButton}>
                    {slide.buttonText}
                  </Link>
                </div>
                <div className={classes.imageContent}>
                  <div className={classes.imageWrapper}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={500}
                      height={400}
                      className={classes.heroImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className={`${classes.navButton} ${classes.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          className={`${classes.navButton} ${classes.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className={classes.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${classes.dot} ${index === currentSlide ? classes.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
