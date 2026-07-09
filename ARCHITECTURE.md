# Architecture Guide

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── admin/               # Admin endpoints
│   │   ├── user/                # User endpoints
│   │   ├── bookings/            # Booking endpoints
│   │   ├── packages/            # Package endpoints
│   │   └── health/              # Health check
│   ├── bookings/                # Bookings page
│   ├── packages/                # Package listing & detail
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Form.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PackageCard.tsx
│   ├── Review.tsx
│   ├── Skeleton.tsx
│   ├── Alert.tsx
│   └── index.ts                 # Barrel export
├── lib/                         # Utility functions
│   ├── utils.ts                 # Common helpers
│   ├── prisma.ts                # Prisma client
│   ├── api-error.ts             # Error handling
│   └── validation.ts            # Zod schemas
├── services/                    # Business logic
│   ├── package.service.ts       # Package logic
│   ├── booking.service.ts       # Booking logic
│   ├── review.service.ts        # Review logic
│   ├── payment.service.ts       # Payment logic
│   └── index.ts                 # Barrel export
├── types/                       # TypeScript definitions
│   └── index.ts
└── config/                      # Configuration
    └── constants.ts

prisma/
├── schema.prisma                # Database schema
└── migrations/                  # Database migrations

public/                          # Static assets

.github/
└── workflows/
    └── ci.yml                   # GitHub Actions CI
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (future)

### Backend
- **Next.js API Routes** - REST API
- **Prisma** - ORM for database
- **PostgreSQL** - Database
- **Zod** - Runtime validation

### Authentication & Security
- **Auth.js** - Authentication (future implementation)
- **TypeScript** - Type safety

### External Services
- **Razorpay** - Payment gateway (future)
- **Stripe** - Payment gateway (future)
- **Cloudinary** - Image storage (future)
- **Resend** - Email service (future)

## Development Workflow

### 1. Setting Up Locally

```bash
# Clone repository
git clone <repo-url>
cd pradhantoursandtravels

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### 2. Creating a New Feature

```bash
# Create feature branch
git checkout -b feat/feature-name

# Make changes following the architecture

# Run quality checks
npm run lint
npm run typecheck
npm run build

# Commit with semantic message
git commit -m "feat: add feature description"

# Push and create PR
git push origin feat/feature-name
```

### 3. Code Quality

- **Linting**: `npm run lint` (ESLint)
- **Type Checking**: `npm run typecheck` (TypeScript)
- **Building**: `npm run build` (Next.js)
- **Formatting**: `npm run format` (Prettier)

## Service Layer Pattern

Each service handles specific business logic:

```typescript
// src/services/package.service.ts
export async function getAllPackages(...): Promise<Package[]>
export async function getPackageBySlug(...): Promise<Package | null>
export async function createPackage(...): Promise<Package>
export async function updatePackage(...): Promise<Package>
export async function deletePackage(...): Promise<void>
```

## API Route Pattern

All API routes follow a consistent pattern:

```typescript
// src/app/api/[resource]/route.ts
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";

export async function GET(request: NextRequest) {
  try {
    // Business logic
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const { statusCode, body } = handleApiError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
```

## Component Pattern

Components are functional, reusable, and typed:

```typescript
// src/components/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  // Implementation
}
```

## Database Schema

Key relationships:
- **User** ↔ **Booking** (one-to-many)
- **User** ↔ **Review** (one-to-many)
- **Package** ↔ **Booking** (one-to-many)
- **Package** ↔ **Review** (one-to-many)
- **Booking** ↔ **Traveler** (one-to-many)
- **Booking** ↔ **Payment** (one-to-one)

## Deployment

### Vercel Deployment

The project is configured for Vercel deployment:

1. Push to main branch
2. Vercel automatically builds and deploys
3. Environment variables set in Vercel dashboard
4. Database migrations run in CI pipeline

### Environment Variables

Required variables (see `.env.example`):
- Database credentials
- Authentication secrets
- Payment gateway keys
- Cloud storage credentials
- Email service keys

## Future Enhancements

- [ ] Authentication implementation (Auth.js)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Image upload to Cloudinary
- [ ] Admin dashboard
- [ ] User profile management
- [ ] Advanced search and filtering
- [ ] Analytics
- [ ] Mobile app
