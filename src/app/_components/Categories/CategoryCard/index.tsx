'use client'
import React from 'react'
import Link from 'next/link'

import type { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media | null | undefined
  const { setCategoryFilters } = useFilter()

  // Get background image from category media or use fallback based on category title
  const getBackgroundImage = () => {
    if (media && (media.url || (media.filename && `/media/${media.filename}`))) {
      return media.url || `/media/${media.filename}`
    }

    // Fallback images based on category title
    const categoryTitle = category.title?.toLowerCase() || ''
    const fallbackImages = {
      phones: '/admin ui/categories/phones-category.png',
      laptops: '/admin ui/categories/laptops-category.png',
      ipads: '/admin ui/categories/ipads-category.png',
      watches: '/admin ui/categories/watches-category.png',
      accessories: '/admin ui/categories/accessories-category.png',
      tv: '/admin ui/categories/tv-home-category.png',
      home: '/admin ui/categories/tv-home-category.png',
      electronics: '/admin ui/categories/accessories-category.png',
      gadgets: '/admin ui/categories/accessories-category.png',
    }

    // Find matching fallback image
    for (const [key, image] of Object.entries(fallbackImages)) {
      if (categoryTitle.includes(key)) {
        return image
      }
    }

    // Default fallback
    return '/static-image.jpg'
  }

  const bgImage = getBackgroundImage()

  // Get appropriate icon based on category title
  const getCategoryIcon = (title: string) => {
    const categoryTitle = title?.toLowerCase() || ''

    if (categoryTitle.includes('phone')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="18"
            x2="12.01"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else if (categoryTitle.includes('laptop') || categoryTitle.includes('computer')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    } else if (categoryTitle.includes('watch')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
          <polyline points="12,7 12,12 15,15" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    } else if (categoryTitle.includes('tv') || categoryTitle.includes('television')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    } else if (categoryTitle.includes('accessories') || categoryTitle.includes('gadgets')) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else {
      // Default icon
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={classes.icon}>
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  }

  return (
    <Link
      href="/products"
      className={classes.card}
      style={{ backgroundImage: `url(${bgImage})` }}
      onClick={() => setCategoryFilters([category.id])}
    >
      <div className={classes.content}>
        <div className={classes.iconWrapper}>{getCategoryIcon(category.title)}</div>
        <p className={classes.title}>{category.title}</p>
        <div className={classes.arrow}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
