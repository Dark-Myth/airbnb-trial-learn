# Airbnb Clone

## Introduction
This project is an Airbnb clone built with Next.js, TypeScript, and Prisma. It replicates core functionalities of Airbnb, allowing users to list their homes, make reservations, and manage their favorites. The application is designed to provide a seamless user experience with a modern UI and robust backend.

## Features
- **User Authentication**: Secure user authentication using Kinde Auth.
- **Home Listings**: Users can list their homes with detailed descriptions, images, and pricing.
- **Reservations**: Users can make reservations for listed homes, specifying the dates and number of guests.
- **Favorites**: Users can add homes to their favorites for easy access later.
- **Search and Filters**: Users can search for homes based on location, category, and other criteria.
- **Dynamic Maps**: Integration with Leaflet for displaying home locations on a map.
- **Responsive Design**: Fully responsive design to ensure a great user experience on both desktop and mobile devices.
- **Server Actions**: Efficient server-side actions for creating and managing listings, reservations, and favorites.
- **Prisma ORM**: Utilizes Prisma for database interactions, ensuring type safety and ease of use.
- **Supabase Storage**: Integration with Supabase for storing and retrieving images.

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Dark-Myth/airbnb-trial-clone.git
    cd airbnb-trial-clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the necessary environment variables as specified in `.env.example`.

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- [npm run start](http://_vscodecontentref_/2) : Starts the production server.
- `npm run lint`: Lints the codebase.
