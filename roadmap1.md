# The Unity of Mind & Body — Frontend Redesign Roadmap (v1)

> Goal: Transform the current static wellness website into a modern, scalable, and visually engaging frontend application using React. This iteration focuses entirely on frontend experience, design systems, usability, accessibility, and content architecture. Backend, authentication, and Supabase integration will be introduced in future iterations.

---

# Phase 0 — Discovery & Product Definition

## Objectives
- Define the product vision clearly
- Identify target audience
- Establish content hierarchy
- Improve user journey

## Target Users
- Students
- Faculty Members
- Campus Counselors
- Wellness Coordinators

## Core User Goals
1. Discover wellness resources
2. Learn about therapy programs
3. Book sessions easily
4. Access mental health resources
5. Feel safe and supported

---

# Phase 1 — Brand Refresh

## Current Issues
- Looks like a college project
- Weak visual hierarchy
- Too much empty space
- Cards feel disconnected
- No emotional storytelling

## Improvements

### Brand Direction
Modern Wellness × Human-Centered Design

### Design Keywords
- Calm
- Warm
- Friendly
- Trustworthy
- Accessible
- Minimal

### Color Palette

Primary
- Sage Green
- Soft Blue

Secondary
- Warm Cream
- Sand Beige

Accent
- Success Green
- Calm Purple

### Typography

Headings
- Playfair Display
- Instrument Serif

Body
- Inter
- Geist

Mono
- JetBrains Mono

---

# Phase 2 — Design System

## Create Reusable Components

### Buttons
- Primary
- Secondary
- Ghost
- Outline

### Cards
- Service Card
- Resource Card
- Team Card
- Testimonial Card

### Navigation
- Desktop Navbar
- Mobile Navigation
- Footer Navigation

### Forms
- Input
- Select
- Textarea
- Search

### UI Elements
- Badge
- Tag
- Alert
- Tooltip
- Modal

---

# Phase 3 — Information Architecture

## Sitemap

### Home
Landing Page

### Services
- Art Therapy
- Group Therapy
- Yoga & Meditation

### Resources
- Articles
- Wellness Guides
- Self-Care Tips

### Team
Meet Professionals

### About
Mission & Vision

### Contact
Support & Enquiries

---

# Phase 4 — Homepage Redesign

## Hero Section

### Current
Simple heading and cards

### New

Headline:
> Your Wellbeing Matters.

Subheading:
> A safe digital space designed to help students manage stress, improve wellness, and build healthier habits.

CTA:
- Explore Services
- Learn More

### Add
- Illustration
- Animated background shapes
- Statistics section

Example Stats:
- 500+ Students Supported
- 50+ Wellness Sessions
- 95% Positive Feedback

---

## Problem Section

### Why This Matters

Cards:

- Academic Pressure
- Anxiety & Stress
- Burnout
- Lack of Support

Visual storytelling section.

---

## Services Preview

Interactive service cards:

### Art Therapy
Express emotions through creativity.

### Group Therapy
Connect and grow together.

### Yoga & Meditation
Build mindfulness and balance.

Features:
- Hover effects
- Subtle motion
- Learn More action

---

## Wellness Journey Section

Step-by-step process

1. Discover
2. Choose Support
3. Book Session
4. Track Progress

Timeline layout.

---

## Testimonials Section

Student feedback cards.

Example:
> "This platform helped me manage exam stress and improve my daily routine."

Carousel design.

---

## Resources Preview

Featured content section.

Cards:
- Stress Management
- Healthy Study Habits
- Meditation Techniques

---

## CTA Section

Large emotional section.

Headline:
> Start Taking Care of Yourself Today.

Button:
Get Started

---

# Phase 5 — Dedicated Services Experience

## Services Listing Page

### Features
- Filtering
- Search
- Categories

### Service Detail Page

Contains:

- Description
- Benefits
- Duration
- Session Flow
- FAQs

---

# Phase 6 — Resources Hub

## Resource Categories

### Mental Health
### Physical Wellness
### Meditation
### Study-Life Balance

---

## Resource Cards

Include:

- Thumbnail
- Category
- Reading Time
- Author

---

## Resource Detail Page

Layout:
- Hero
- Table of Contents
- Related Articles

---

# Phase 7 — Team Page

## Meet The Experts

Cards include:

- Photo
- Name
- Role
- Bio
- Specialization

---

## Categories

- Counselors
- Therapists
- Wellness Coaches

---

# Phase 8 — Future Booking Flow UI

Frontend-only mockup.

## Booking Journey

Select Service

↓

Select Expert

↓

Choose Time

↓

Review

↓

Confirmation

---

## Screens

- Booking Page
- Calendar View
- Success State

---

# Phase 9 — User Dashboard UI

Frontend-only

## Dashboard Sections

### Overview
Upcoming sessions

### Activity
Recent actions

### Saved Resources

### Wellness Insights

### Profile

---

# Phase 10 — Admin Dashboard UI

Frontend prototype

## Sections

### Analytics

### Users

### Resources

### Services

### Bookings

### Settings

---

# Phase 11 — Accessibility

## Requirements

- WCAG Compliance
- Keyboard Navigation
- Proper Focus States
- Semantic HTML
- Screen Reader Support
- Color Contrast Checks

---

# Phase 12 — Responsive Design

## Breakpoints

### Mobile
320px+

### Tablet
768px+

### Laptop
1024px+

### Desktop
1440px+

---

# Phase 13 — Motion & Interactions

## Micro Interactions

### Navbar
- Smooth transitions
- Active indicators

### Cards
- Lift on hover
- Glow effect

### Buttons
- Ripple effect
- Hover transitions

### Page Transitions
- Framer Motion

### Scroll Animations
- Fade In
- Slide Up
- Parallax Elements

---

# Phase 14 — SEO Foundation

## Metadata

- Open Graph
- Twitter Cards
- Meta Tags

## Technical SEO

- Sitemap
- robots.txt
- Structured Data

## Content SEO

Keywords:
- Student Wellness
- Mental Health Support
- Campus Wellness
- Therapy Sessions
- Meditation Programs

---

# Phase 15 — Performance Optimization

## Goals

Lighthouse:
- Performance > 95
- Accessibility > 95
- Best Practices > 95
- SEO > 95

### Techniques

- Image Optimization
- Lazy Loading
- Route Splitting
- Component Code Splitting
- Modern Asset Delivery

---

# Phase 16 — Tech Stack

## Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## State Management

- Zustand

## Forms

- React Hook Form

## Validation

- Zod

---

# Future Iteration (v2)

## Supabase Integration

### Authentication
- Login
- Signup
- Forgot Password

### Database
- Users
- Resources
- Services
- Bookings

### Storage
- Team Images
- Resource Assets

### Role Management
- User
- Admin

---

# Future Iteration (v3)

## Advanced Features

### AI Wellness Assistant

### Mood Tracking

### Journal System

### Personalized Recommendations

### Progress Analytics

### Email Notifications

### Community Support Groups

### Emergency Support System

---

# Success Criteria

- Modern and professional wellness platform
- Fully responsive experience
- Reusable component architecture
- Production-ready frontend foundation
- Easy future integration with Supabase backend
- Strong accessibility and SEO standards
- Significantly improved user engagement and usability over the original version