# Arathy Camphor & Agarbathy - Admin Panel

A complete admin panel for managing products and categories for Arathy Camphor & Agarbathy business.

## Table of Contents

- [Features](#features)
- [Complete Setup Guide](#complete-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Step 1: Setting Up the Development Environment](#step-1-setting-up-the-development-environment)
  - [Step 2: Project Installation](#step-2-project-installation)
  - [Step 3: Environment Configuration](#step-3-environment-configuration)
  - [Step 4: Database Setup](#step-4-database-setup)
  - [Step 5: Running the Application](#step-5-running-the-application)
  - [Step 6: Accessing the Application](#step-6-accessing-the-application)
- [Project Structure](#project-structure)
- [Deployment Options](#deployment-options)
  - [Vercel Deployment](#vercel-deployment)
  - [Netlify Deployment](#netlify-deployment)
  - [Docker Deployment](#docker-deployment)
  - [Traditional Web Server](#traditional-web-server)
- [Troubleshooting Guide](#troubleshooting-guide)
  - [Common Issues](#common-issues)
  - [Debugging Tips](#debugging-tips)
  - [Error Reference](#error-reference)
- [Customization](#customization)
- [Security Considerations](#security-considerations)

## Features

- **Product Management**: Add, edit, delete, and categorize products
- **Category Management**: Create and manage product categories
- **Admin Authentication**: Secure login system
- **Responsive Design**: Works on desktop and mobile devices
- **Image Management**: Support for product images
- **Tag System**: Top-selling, best-selling, and offer tags
- **Dashboard Analytics**: Overview of products, categories, and performance

## Complete Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation with `node -v` and `npm -v`
- **Git** (for version control)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation with `git --version`
- **Code Editor** (recommended: Visual Studio Code)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)
- **Modern Web Browser** (Chrome, Firefox, Safari, or Edge)

### Step 1: Setting Up the Development Environment

1. **Install Node.js and npm**:
   - For Windows/macOS: Download and run the installer from [nodejs.org](https://nodejs.org/)
   - For Linux (Ubuntu/Debian): 
     \`\`\`bash
     sudo apt update
     sudo apt install nodejs npm
     \`\`\`

2. **Install Git**:
   - For Windows: Download and install from [git-scm.com](https://git-scm.com/)
   - For macOS: Install via Homebrew `brew install git` or download from the website
   - For Linux (Ubuntu/Debian): 
     \`\`\`bash
     sudo apt update
     sudo apt install git
     \`\`\`

3. **Configure Git** (if you haven't already):
   \`\`\`bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   \`\`\`

4. **Install Visual Studio Code** (recommended):
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Install recommended extensions for Next.js development:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - TypeScript

### Step 2: Project Installation

1. **Clone or Download the Project**:
   
   If you have the project files:
   \`\`\`bash
   # Extract the project files to a folder on your computer
   # Open a terminal/command prompt and navigate to the project folder
   cd path/to/arathy-landing-page
   \`\`\`

   If using Git:
   \`\`\`bash
   git clone <repository-url>
   cd arathy-landing-page
   \`\`\`

2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

   This will install all required packages including:
   - Next.js 14 (React framework)
   - TypeScript (for type safety)
   - Tailwind CSS (for styling)
   - Radix UI components (for UI elements)
   - Framer Motion (for animations)
   - Lucide React (for icons)

3. **Verify Installation**:
   After installation completes, check for any errors in the terminal. If there are dependency issues, try:
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

### Step 3: Environment Configuration

1. **Create Environment File**:
   Create a `.env.local` file in the root directory:

   \`\`\`bash
   # Create the environment file
   touch .env.local
   \`\`\`

2. **Configure Environment Variables**:
   Add the following content to `.env.local`:

   \`\`\`env
   # Application Settings
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Admin Credentials (Change these in production)
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=password123

   # Session Settings
   SESSION_SECRET=your-secret-key-here-change-in-production
   \`\`\`

3. **Additional Configuration** (Optional):
   - For custom port: Create a `.env` file with `PORT=3001` (or your preferred port)
   - For production builds: Set `NODE_ENV=production` in `.env.local`

### Step 4: Database Setup

This project uses in-memory storage for simplicity. No database setup is required for local development.

**For Production Implementation**:

1. **Choose a Database**:
   - **PostgreSQL**: Recommended for relational data
   - **MongoDB**: Good for document-based storage
   - **SQLite**: Simple file-based database for smaller applications

2. **Database Integration**:
   - Install Prisma ORM: `npm install prisma @prisma/client`
   - Initialize Prisma: `npx prisma init`
   - Define your schema in `prisma/schema.prisma`
   - Generate client: `npx prisma generate`
   - Create migrations: `npx prisma migrate dev`

3. **Update Data Access**:
   - Replace the in-memory storage in `lib/products.ts` and `lib/categories.ts` with database queries
   - Example implementation with Prisma:

   \`\`\`typescript
   // Example for products.ts with Prisma
   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()

   export async function getAllProducts() {
     return await prisma.product.findMany()
   }

   export async function addProduct(productData) {
     return await prisma.product.create({
       data: productData
     })
   }
   \`\`\`

### Step 5: Running the Application

1. **Start the Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Build for Production** (when ready):
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

3. **Verify the Application is Running**:
   - The terminal should show a message like: `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`
   - If there are any errors, check the terminal output for details

### Step 6: Accessing the Application

1. **Public Website**:
   - Open your browser and navigate to `http://localhost:3000`
   - You should see the Arathy Camphor & Agarbathy landing page

2. **Admin Panel**:
   - Navigate to `http://localhost:3000/admin/login`
   - Use the default credentials:
     - Username: `admin`
     - Password: `password123`

3. **Admin Features**:
   - Dashboard: `http://localhost:3000/admin/dashboard`
   - Products: `http://localhost:3000/admin/products`
   - Categories: `http://localhost:3000/admin/categories`

## Project Structure

\`\`\`bash
arathy-landing-page/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── (dashboard)/         # Layout-wrapped admin pages
│   │   │   ├── dashboard/       # Dashboard page
│   │   │   ├── products/        # Product management
│   │   │   └── categories/      # Category management
│   │   ├── login/               # Admin login
│   │   └── actions.ts           # Server actions
│   ├── products/                # Public product pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   │   ├── category-form.tsx    # Category form component
│   │   ├── delete-category-button.tsx # Delete category component
│   │   ├── product-form.tsx     # Product form component
│   │   ├── delete-product-button.tsx # Delete product component
│   │   ├── login-form.tsx       # Login form component
│   │   └── sidebar.tsx          # Admin sidebar navigation
│   ├── ui/                      # UI components (buttons, cards, etc.)
│   └── [other components]       # Site components
├── lib/                         # Utility libraries
│   ├── products.ts              # Product data management
│   ├── categories.ts            # Category data management
│   ├── auth.ts                  # Authentication logic
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   └── images/                  # Product images
├── hooks/                       # Custom React hooks
│   └── use-toast.ts             # Toast notification hook
├── middleware.ts                # Next.js middleware for auth
├── tailwind.config.ts           # Tailwind configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
\`\`\`

### Key Files and Directories Explained

- **`app/`**: Contains all pages using Next.js App Router
  - **`admin/`**: Admin panel pages
  - **`products/`**: Public product pages
  - **`layout.tsx`**: Root layout with common elements
  - **`page.tsx`**: Homepage

- **`components/`**: Reusable React components
  - **`admin/`**: Admin-specific components
  - **`ui/`**: UI components like buttons, cards, etc.

- **`lib/`**: Utility functions and data management
  - **`products.ts`**: Product data operations
  - **`categories.ts`**: Category data operations
  - **`auth.ts`**: Authentication logic

- **`public/`**: Static assets like images

- **`hooks/`**: Custom React hooks

- **`middleware.ts`**: Authentication middleware

- **`tailwind.config.ts`**: Tailwind CSS configuration

## Deployment Options

### Vercel Deployment

Vercel is the recommended platform for Next.js applications.

1. **Install Vercel CLI**:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**:
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy the Application**:
   \`\`\`bash
   vercel
   \`\`\`

4. **For Production Deployment**:
   \`\`\`bash
   vercel --prod
   \`\`\`

5. **Environment Variables**:
   - Add all environment variables from `.env.local` to your Vercel project settings
   - Ensure you set `NODE_ENV=production`

### Netlify Deployment

1. **Install Netlify CLI**:
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Login to Netlify**:
   \`\`\`bash
   netlify login
   \`\`\`

3. **Create a `netlify.toml` File**:
   \`\`\`toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   \`\`\`

4. **Install Netlify Next.js Plugin**:
   \`\`\`bash
   npm install -D @netlify/plugin-nextjs
   \`\`\`

5. **Deploy the Application**:
   \`\`\`bash
   netlify deploy
   \`\`\`

6. **For Production Deployment**:
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

### Docker Deployment

1. **Create a `Dockerfile`**:
   \`\`\`dockerfile
   FROM node:18-alpine AS base

   # Install dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci

   # Build the application
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production image
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"

   CMD ["node", "server.js"]
   \`\`\`

2. **Update `next.config.js`**:
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
   }
   
   module.exports = nextConfig
   \`\`\`

3. **Build and Run Docker Container**:
   \`\`\`bash
   docker build -t arathy-admin .
   docker run -p 3000:3000 arathy-admin
   \`\`\`

### Traditional Web Server

1. **Build the Application**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Configure for Static Export** (if needed):
   Update `next.config.js`:
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
   }
   
   module.exports = nextConfig
   \`\`\`

3. **Deploy to Web Server**:
   - Copy the `.next` directory (or `out` directory if using static export)
   - Set up a Node.js environment on your server
   - Install dependencies: `npm install --production`
   - Start the server: `npm start`

4. **Using Apache or Nginx**:
   - Configure as a reverse proxy to the Node.js server
   - Example Nginx configuration:
     \`\`\`nginx
     server {
       listen 80;
       server_name yourdomain.com;

       location / {
         proxy_pass http://localhost:3000;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
       }
     }
     \`\`\`

## Troubleshooting Guide

### Common Issues

#### 1. Installation Problems

**Issue**: `npm install` fails with dependency errors.

**Solution**:
\`\`\`bash
# Try with legacy peer dependencies
npm install --legacy-peer-deps

# Or clear npm cache and retry
npm cache clean --force
npm install
\`\`\`

#### 2. Application Won't Start

**Issue**: `npm run dev` fails to start the development server.

**Solutions**:
- Check if port 3000 is already in use:
  \`\`\`bash
  # Use a different port
  npm run dev -- -p 3001
  \`\`\`
- Check for syntax errors in your code
- Verify Node.js version (should be 18.0+)

#### 3. Authentication Issues

**Issue**: Cannot log in to admin panel.

**Solutions**:
- Verify credentials in `lib/auth.ts`
- Check browser console for errors
- Clear browser cookies and try again
- Ensure middleware.ts is correctly configured

#### 4. Database Connection Issues (for production)

**Issue**: Cannot connect to database.

**Solutions**:
- Verify connection string in environment variables
- Check database server is running
- Ensure firewall allows connections
- Check database user permissions

#### 5. Styling Issues

**Issue**: Tailwind styles not applying correctly.

**Solutions**:
- Verify Tailwind is properly configured
- Check for class name typos
- Run `npm run build` to regenerate CSS
- Clear browser cache

### Debugging Tips

1. **Check Browser Console**:
   - Open browser developer tools (F12 or Ctrl+Shift+I)
   - Look for errors in the Console tab

2. **Server-Side Logs**:
   - Check terminal output for server errors
   - Add console.log statements in server components/actions

3. **Component Debugging**:
   - Use React DevTools browser extension
   - Add temporary debug UI elements:
     \`\`\`jsx
     {process.env.NODE_ENV === 'development' && (
       <pre className="bg-gray-100 p-4 text-xs">
         {JSON.stringify(debugData, null, 2)}
       </pre>
     )}
     \`\`\`

4. **Network Debugging**:
   - Use Network tab in browser developer tools
   - Check for failed requests and status codes

### Error Reference

#### Next.js Build Errors

- **Module not found**: Check import paths and ensure the file exists
- **Type errors**: Fix TypeScript type issues
- **API route errors**: Ensure API routes are properly formatted

#### Runtime Errors

- **Hydration errors**: Ensure server and client rendering match
- **Authentication errors**: Check auth configuration
- **Data fetching errors**: Verify API endpoints and data sources

## Customization

### Adding New Product Categories

1. Update the categories in `lib/categories.ts`:
   \`\`\`typescript
   // Add a new category
   const newCategory = {
     id: "new-category",
     name: "New Category",
     description: "Description of the new category",
     slug: "new-category",
     createdAt: new Date(),
     updatedAt: new Date(),
   };
   categories.push(newCategory);
   \`\`\`

2. Use the admin interface to add categories:
   - Navigate to `/admin/categories/add`
   - Fill in the category details
   - Submit the form

### Changing Admin Credentials

1. Update the credentials in `lib/auth.ts`:
   \`\`\`typescript
   const ADMIN_CREDENTIALS = {
     username: "your-username",
     password: "your-password",
   }
   \`\`\`

2. Or use environment variables in `.env.local`:
   \`\`\`env
   ADMIN_USERNAME=your-username
   ADMIN_PASSWORD=your-password
   \`\`\`

### Styling Customization

1. **Theme Colors**:
   Edit `tailwind.config.ts` to change the color scheme:
   \`\`\`typescript
   theme: {
     extend: {
       colors: {
         primary: {
           DEFAULT: "hsl(var(--primary))",
           // Add your custom colors
         },
         // Add more custom colors
       },
     },
   },
   \`\`\`

2. **Global Styles**:
   Edit `app/globals.css` for global style changes

3. **Component Styles**:
   Update individual component files to change specific component styling

## Security Considerations

1. **Authentication**:
   - Change default admin credentials
   - Implement proper session management
   - Add rate limiting for login attempts

2. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use different variables for development and production

3. **API Security**:
   - Validate all input data
   - Implement proper error handling
   - Use HTTPS in production

4. **Data Protection**:
   - Sanitize user inputs
   - Implement proper access controls
   - Regularly backup data

5. **Production Deployment**:
   - Use HTTPS
   - Set secure HTTP headers
   - Keep dependencies updated
