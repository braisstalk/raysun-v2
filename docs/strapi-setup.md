# Strapi Setup Guide - Local Development

## Current Status

**Node.js Version:**
- Current environment: Node v25.8.0 (not compatible with Strapi v5)
- Required: Node 20.x - 22.x LTS
- Node 22 has been installed at: `/opt/homebrew/opt/node@22/bin/node`

## Quick Setup for Local Development

### Option 1: Using Homebrew Node 22

```bash
# Install Node 22 (already done)
brew install node@22

# Add to PATH (add to ~/.zshrc)
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

# Verify
node --version  # Should show v22.x.x
```

### Option 2: Create Strapi Project

```bash
# Using Node 22
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

# Create project (skip login when prompted)
cd ~/Desktop/raysun-biopharma-2
npx create-strapi-app@latest cms --quickstart --typescript

# When asked to login, press 'Skip' or use --no-interactive
```

### Option 3: Manual Setup

```bash
mkdir cms && cd cms
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm init -y
npm install @strapi/strapi@5 @strapi/admin@5 @strapi/plugin-content-type-builder@5 @strapi/plugin-users-permissions@5 @strapi/utils@5 react@18 react-dom@18
```

## Starting Strapi

```bash
cd ~/Desktop/raysun-biopharma-2/cms
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm run develop
```

Strapi will be available at: http://localhost:1337

## Creating Content Types

After starting Strapi:

1. Open http://localhost:1337
2. Create admin user
3. Go to Content-Type Builder
4. Create these types:

### Site Settings (Single Type)
- siteName (string)
- siteDescription (text)
- contactEmail (email)
- contactPhone (string)
- contactAddress (text)

### Home Page (Single Type)
- heroTitle (string)
- heroSubtitle (text)
- heroPrimaryCtaLabel (string)
- heroPrimaryCtaHref (string)
- heroSecondaryCtaLabel (string)
- heroSecondaryCtaHref (string)
- stats (JSON)
- aboutTitle (string)
- aboutDescription (text)
- aboutCtaLabel (string)
- aboutCtaHref (string)
- features (JSON)

### Product Category (Collection Type)
- name (string)
- slug (UID)
- description (text)
- icon (string)
- order (number)

### Product (Collection Type)
- name (string)
- slug (UID)
- genericName (string)
- dosageForm (string)
- strength (string)
- description (richtext)
- indications (JSON)
- features (JSON)
- tags (JSON)
- type (enumeration: brand, generic)
- packSize (string)
- storage (string)
- shelfLife (string)
- route (string)
- regulatoryNote (text)
- availabilityNote (string)

## Adding Test Content

1. Go to Content Manager
2. Create entries for each type

### Home Page Example
```json
{
  "heroTitle": "🌿 STRAPI TEST: Manufacturing",
  "heroSubtitle": "This content is from Strapi CMS - verifying dual-source!",
  "stats": [
    {"value": "999+", "label": "Products (Strapi)"},
    {"value": "99+", "label": "Countries (Strapi)"}
  ]
}
```

### Product Categories Example
- Antibiotics
- Cardiovascular  
- Pain Relief

### Products Example
- Amoxicillin 500mg (STRAPI TEST)
- Omeprazole 20mg
- Ibuprofen 400mg

## Connecting Frontend

```bash
# Create .env.local in project root
echo "CONTENT_SOURCE=strapi" > .env.local
echo "STRAPI_URL=http://localhost:1337" >> .env.local
```

## Testing

1. Start Strapi: `npm run develop` (in cms folder)
2. Start frontend: `npm run dev` (in project root)
3. Visit http://localhost:3000
4. Look for "Source: strapi" in top-right corner

## Fallback Testing

1. Keep CONTENT_SOURCE=strapi
2. Stop Strapi server
3. Refresh frontend - should fall back to local

## Current Implementation

The dual-source architecture is complete:
- ✅ Local adapter serves all pages
- ✅ Strapi adapter implemented (src/lib/content/adapters/strapi/)
- ✅ Mock API for testing (src/app/api/mock-strapi/)
- ✅ Content service routes between sources
- ✅ Fallback mechanism working

## What's Needed to Complete Real Strapi Setup

1. ✅ Node 22 installed at /opt/homebrew/opt/node@22/bin
2. ⏳ Strapi project creation (manual setup required)
3. ⏳ Content type creation
4. ⏳ Test content entry
5. ⏳ Frontend connection verification
