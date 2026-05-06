# Strapi/Mock API Dual-Source Verification Guide

## Overview

This project now supports dual-source content:
- **local**: Content from local config files (default)
- **strapi**: Content from Strapi or Mock API

## Quick Test (Local Development)

### 1. Start the development server

```bash
cd ~/Desktop/raysun-biopharma-2
npm run dev
```

### 2. Test LOCAL mode (default)

Open http://localhost:3000 in your browser.

- You should see the normal homepage content
- Look for "Source: local" in the top-right corner

### 3. Test STRAPI/MOCK mode

Create a `.env.local` file:

```bash
echo "CONTENT_SOURCE=strapi" > .env.local
```

Restart the dev server:

```bash
# Stop the current server (Ctrl+C), then:
npm run dev
```

Now refresh http://localhost:3000:

- Look for "Source: strapi" in the top-right corner
- Home page should show:
  - "🌿 STRAPI TEST: Manufacturing" as the hero title
  - "🌿 This content is from Strapi CMS" as the subtitle
  - Stats showing "(Strapi)" labels

### 4. Test Products page

Go to http://localhost:3000/products:

- Should show "Source: strapi" 
- Should see products with "(Strapi)" in category names
- Should see "Amoxicillin 500mg (STRAPI TEST)"

### 5. Test Product Detail

Click on a product or go to http://localhost:3000/products/amoxicillin-500mg-strapi:

- Should see "STRAPI TEST PRODUCT" in the description

### 6. Test fallback (when Strapi unavailable)

While in strapi mode:

1. Stop the dev server (Ctrl+C)
2. Refresh the page
3. The page should automatically fall back to local content
4. Should show "Source: local" or "Source: strapi" with local content

## How to Verify It's Working

### Visual Indicators

**LOCAL mode:**
- Home hero: "Manufacturing"
- Stats: Normal values (200+, 20+, etc.)

**STRAPI mode:**
- Home hero: "🌿 STRAPI TEST: Manufacturing"
- Stats: "999+ Products (Strapi)", "99+ Countries (Strapi)", etc.
- Products: "Amoxicillin 500mg (STRAPI TEST)"

### Console Logs

Check browser console:

```
✅ Using Strapi for Home
✅ Cached Strapi Home data
```

## Mock API Data

The mock API provides different content to verify it's working:

### Home Page
- Title: "🌿 STRAPI TEST: Manufacturing"
- Subtitle: "🌿 This content is from Strapi CMS"
- Stats with "(Strapi)" labels

### Products
- Categories: "Antibiotics (Strapi)", "Cardiovascular (Strapi)", "Pain Relief (Strapi)"
- Products: "Amoxicillin 500mg (STRAPI TEST)"

### Product Detail
- Description: "STRAPI TEST PRODUCT - This is from Strapi CMS"

## Switching Back to Local

```bash
# Edit .env.local and set:
CONTENT_SOURCE=local

# Or delete the file:
rm .env.local

# Restart the dev server
npm run dev
```

## Troubleshooting

### Page still shows local content in strapi mode

1. Check `.env.local` is set correctly
2. Restart the dev server after changing the file
3. Check browser console for errors

### API errors

The mock API runs as a Next.js API route at `/api/mock-strapi/`. It's only available in development mode, not in production.

## File Locations

- Mock API: `src/app/api/mock-strapi/[...path]/route.ts`
- Strapi Adapter: `src/lib/content/adapters/strapi/index.ts`
- Content Service: `src/lib/content/services/content.ts`
