# Arathy Camphor - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Project Installation](#project-installation)
4. [Configuration](#configuration)
5. [Project Structure](#project-structure)
6. [Features Overview](#features-overview)
7. [Admin System](#admin-system)
8. [Billing System](#billing-system)
9. [Product Management](#product-management)
10. [Deployment Options](#deployment-options)
11. [Troubleshooting](#troubleshooting)
12. [Maintenance](#maintenance)

## Prerequisites

### System Requirements
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Development Tools (Recommended)
- **VS Code**: With TypeScript and React extensions
- **Terminal/Command Prompt**: For running commands

## Environment Setup

### 1. Install Node.js
\`\`\`bash
# Download from https://nodejs.org/
# Verify installation
node --version
npm --version
\`\`\`

### 2. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd arathy-camphor
\`\`\`

### 3. Install Dependencies
\`\`\`bash
npm install
\`\`\`

## Project Installation

### Quick Start
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
\`\`\`

### Manual Setup
1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Configuration**
   \`\`\`bash
   # Create environment file
   cp .env.example .env.local
   \`\`\`

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Application Settings
NEXT_PUBLIC_APP_NAME="Arathy Camphor"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Admin Authentication
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp"

# Database (if using external database)
# DATABASE_URL="your-database-url"

# Email Settings (optional)
# SMTP_HOST="your-smtp-host"
# SMTP_PORT=587
# SMTP_USER="your-email"
# SMTP_PASS="your-password"
\`\`\`

### Admin Credentials
- **Username**: admin
- **Password**: admin123
- **Access URL**: http://localhost:3000/admin/login

## Project Structure

\`\`\`
arathy-camphor/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel routes
│   │   ├── (dashboard)/          # Protected admin routes
│   │   │   ├── billing/          # Billing system
│   │   │   ├── categories/       # Category management
│   │   │   ├── dashboard/        # Admin dashboard
│   │   │   ├── offline-products/ # Offline product management
│   │   │   └── products/         # Online product management
│   │   ├── actions.ts            # Server actions
│   │   └── login/                # Admin login
│   ├── api/                      # API routes
│   ├── products/                 # Public product pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── ui/                       # UI components (shadcn/ui)
│   └── [other components]
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication logic
│   ├── billing.ts                # Billing & offline products logic
│   ├── categories.ts             # Category management
│   ├── image-upload.ts           # Image handling
│   └── products.ts               # Online product management
├── public/                       # Static assets
│   └── images/                   # Product images
├── hooks/                        # Custom React hooks
├── middleware.ts                 # Next.js middleware
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
\`\`\`

## Features Overview

### Public Website
- **Homepage**: Company introduction and featured products
- **Product Catalog**: Browse agarbathi and camphor products
- **Product Details**: Detailed product information with images
- **Enquiry System**: Contact forms for customer inquiries
- **Responsive Design**: Mobile-friendly interface

### Admin System
- **Dashboard**: Overview of business metrics
- **Authentication**: Secure login system
- **Product Management**: Add, edit, delete products
- **Category Management**: Organize products by categories
- **Billing System**: Complete invoicing and payment tracking
- **Customer Management**: Maintain customer database
- **Offline Products**: Separate inventory for offline sales

### Billing System
- **Invoice Generation**: Create detailed invoices
- **Customer Management**: Store customer information
- **Payment Tracking**: Record and track payments
- **Tax Calculations**: Automatic tax computation
- **Financial Reports**: Sales and revenue analytics
- **Offline Integration**: Support for offline sales

## Admin System

### Accessing Admin Panel
1. Navigate to `http://localhost:localhost:3000/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"

### Admin Features

#### Dashboard
- Business overview and statistics
- Quick access to all features
- Recent activity tracking
- Performance metrics

#### Product Management
- **Online Products**: Products for website display
- **Offline Products**: Products for billing system only
- **Categories**: Organize products by type
- **Image Upload**: Direct file upload support
- **Inventory Tracking**: Stock management
- **Flexible Units**: Support for various measurement units

#### Billing System
- **Customer Database**: Store customer information
- **Invoice Creation**: Generate professional invoices
- **Payment Recording**: Track payment status
- **Tax Management**: Configure tax rates
- **Financial Reports**: Revenue and sales analytics

## Billing System

### Customer Management
1. **Add Customer**
   - Navigate to Billing → Customers → Add Customer
   - Fill in customer details (name, address, GST number)
   - Save customer information

2. **Edit Customer**
   - Go to customer list
   - Click edit button
   - Update information and save

### Invoice Creation
1. **Create New Invoice**
   - Go to Billing → Invoices → Add Invoice
   - Select customer from dropdown
   - Add products (online or offline)
   - Configure quantities and units
   - Set tax rates and discounts
   - Generate invoice

2. **Product Selection**
   - Choose between online and offline products
   - Search products by name or SKU
   - Select appropriate units (kg, gram, piece, box, etc.)
   - Prices adjust automatically based on unit selection

3. **Unit Configuration**
   - **Gram**: Base unit for most products
   - **Kilogram**: Bulk pricing (usually discounted)
   - **Piece**: Individual items
   - **Box**: Packaged quantities
   - **Bottle**: Liquid or powder containers
   - **Custom Units**: Configure as needed

### Payment Tracking
1. **Record Payment**
   - Open invoice details
   - Click "Record Payment"
   - Enter payment amount and method
   - Add reference number if applicable
   - Save payment record

2. **Payment Methods**
   - Cash
   - Card
   - UPI
   - Bank Transfer
   - Cheque

## Product Management

### Online Products
- Displayed on public website
- Used for customer browsing
- Include detailed descriptions and images
- Support for product variants and weights

### Offline Products
- Used exclusively in billing system
- Support flexible unit configurations
- Bulk pricing options
- Stock tracking for offline sales

### Categories
- Organize products by type (Agarbathi, Camphor, etc.)
- Dynamic integration with product forms
- Easy management and editing

### Image Management
- Direct file upload support
- Multiple images per product
- Automatic image optimization
- Support for JPEG, PNG, WebP formats

## Deployment Options

### 1. Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow prompts to configure deployment
\`\`\`

### 2. Netlify
\`\`\`bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'out' folder to Netlify
\`\`\`

### 3. Traditional Server
\`\`\`bash
# Build the project
npm run build

# Start production server
npm start
\`\`\`

### 4. Docker
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build and run Docker container
docker build -t arathy-camphor .
docker run -p 3000:3000 arathy-camphor
\`\`\`

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
\`\`\`bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
\`\`\`

#### 2. Module Not Found Errors
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### 3. Build Errors
\`\`\`bash
# Check TypeScript errors
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

#### 4. Image Upload Issues
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, WebP)
- Ensure proper permissions on upload directory

#### 5. Admin Login Issues
- Verify credentials in environment variables
- Check browser cookies and local storage
- Clear browser cache

### Performance Optimization

#### 1. Image Optimization
- Use WebP format when possible
- Compress images before upload
- Implement lazy loading

#### 2. Database Optimization
- Implement proper indexing
- Use pagination for large datasets
- Cache frequently accessed data

#### 3. Caching
- Enable browser caching
- Implement server-side caching
- Use CDN for static assets

## Maintenance

### Regular Tasks

#### 1. Backup Data
\`\`\`bash
# Backup product data
npm run backup:products

# Backup customer data
npm run backup:customers

# Backup invoices
npm run backup:invoices
\`\`\`

#### 2. Update Dependencies
\`\`\`bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
\`\`\`

#### 3. Monitor Performance
- Check server logs regularly
- Monitor database performance
- Track user analytics
- Review error reports

#### 4. Security Updates
- Keep dependencies updated
- Review access logs
- Update admin passwords regularly
- Monitor for security vulnerabilities

### Scaling Considerations

#### 1. Database Migration
- Move from in-memory storage to persistent database
- Implement proper database schema
- Set up database backups

#### 2. File Storage
- Implement cloud storage for images
- Set up CDN for better performance
- Implement image processing pipeline

#### 3. Authentication
- Implement proper user management
- Add role-based access control
- Set up session management

#### 4. API Integration
- Implement external payment gateways
- Add email notification system
- Integrate with accounting software

## Support and Documentation

### Getting Help
- Check this documentation first
- Review error messages carefully
- Search for similar issues online
- Contact development team if needed

### Additional Resources
- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### Best Practices
- Follow TypeScript best practices
- Use proper error handling
- Implement proper validation
- Write clean, maintainable code
- Document custom modifications
- Test thoroughly before deployment

---

This setup guide provides comprehensive instructions for installing, configuring, and maintaining the Arathy Camphor application. Follow the steps carefully and refer to the troubleshooting section if you encounter any issues.
