# Setting Up Andromeda: Express Server & Frontend

This guide will walk you through setting up the **Andromeda** project, which consists of a backend Express server and a frontend built on top of React, both using **pnpm** for package management.

## Prerequisites

Before you begin, make sure you have the following tools installed:

- **Node.js** (v16 or later) – [Install Node.js](https://nodejs.org/)
- **pnpm** (v7 or later) – [Install pnpm](https://pnpm.io/installation)
- **Git** – [Install Git](https://git-scm.com/)

Once these are installed, proceed with the steps below.

---

## Step 1: Setting Up the Backend (Express Server)

1. **Clone the repository:**

   First, clone the repository from GitHub to your local machine using the following command:

   ```bash
   git clone https://github.com/mohaali482/andromeda.git
   ```

2. **Navigate to the `backend` folder:**

   After cloning, navigate to the backend folder where the Express server is located:

   ```bash
   cd andromeda/backend
   ```

3. **Install dependencies using pnpm:**

   Ensure you're inside the `backend` directory and run the following command to install the required dependencies:

   ```bash
   pnpm install
   ```

4. **Set up environment variables:**

   Inside the `backend` folder, you'll find an `.env.example` file. You need to copy this file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

   The `.env` file will contain important configuration variables. Here’s what the `.env.example` looks like:

   ```bash
   NASA_API_KEY=
   PORT=8000
   UPSTASH_URL=
   REDIS_TOKEN=
   ```

   Open the `.env` file in your favorite text editor (e.g., VSCode) and populate the variables. Here's a brief explanation of each variable:

   - `NASA_API_KEY`: Your API key from NASA’s open API. You can get this by signing up at [NASA API](https://api.nasa.gov/).
   - `PORT`: The port on which the backend server will run. You can leave it as `8000` or change it if needed.
   - `UPSTASH_URL`: The URL for your Upstash (or other Redis cloud) instance if your app is using Redis.
   - `REDIS_TOKEN`: The authentication token for accessing your Redis instance.

   Once you’ve filled in the values, save the file and proceed to the next steps.

5. **Start the backend server:**

   Once the environment variables are set and the dependencies are installed, you can start the Express server:

   ```bash
   pnpm start
   ```

   This will launch the backend server. You can access the API (typically at `http://localhost:8000` unless otherwise specified in your `.env`).

---

## Step 2: Setting Up the Frontend

1. **Navigate to the `frontend` folder:**

   Now that the backend is running, open a new terminal window or tab and navigate to the `frontend` folder:

   ```bash
   cd andromeda/frontend
   ```

2. **Install frontend dependencies using pnpm:**

   Just like for the backend, use `pnpm` to install the frontend dependencies:

   ```bash
   pnpm install
   ```

3. **Set up frontend environment variables:**

   Similar to the backend, the frontend also has an `.env.example` file. You'll need to create an `.env` file based on this example:

   ```bash
   cp .env.example .env
   ```

   Open the newly created `.env` file and populate it with the appropriate values:

   ```bash
   code .env
   ```

4. **Run the frontend development server:**

   Once the environment variables are set and dependencies installed, start the frontend development server:

   ```bash
   pnpm dev
   ```

This guide ensures that you have an easy and clear setup process for the **Andromeda** project. If you encounter any issues, verify that the correct values are filled in the `.env` files, and ensure that the backend and frontend are running on appropriate ports.
