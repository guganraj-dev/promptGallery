# Next.js MongoDB CRUD Application

A premium inventory management dashboard built with Next.js (App Router), MongoDB, and Vanilla CSS.

## Features
- **Create**: Add new products with name, category, price, and description.
- **Read**: View all products in a responsive glassmorphism grid.
- **Update**: Edit existing product details.
- **Delete**: Remove products with confirmation.
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Premium UI**: Modern dark theme with subtle animations and gradients.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Update `.env.local` with your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used
- **Framework**: Next.js 14+ (App Router)
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Modules/Global)
