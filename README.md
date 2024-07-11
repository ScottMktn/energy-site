# PowerPlan

Created by Scott Nguyen

<br />

Mockup the build of materials and site layout of an Industrial Energy Battery site

- Estimate the cost, land requirements, and energy density of a site
- Visualize the plot of land and example battery layout
- Save changes to revisit later

You can view a fully working demo at [https://energy-site.vercel.app/](https://energy-site.vercel.app/).

## Tech Stack

- Web Application: Next.js + TailwindCSS hosted on Vercel
- API: Vercel Serverless functions
- Database: Supabase (PostgreSQL)
- Auth: Supabase
- Testing: Jest

## How to run PowerPlan locally

### Set up Supabase

1. You'll first need a Supabase account which can be made [https://supabase.com/dashboard/sign-up](https://supabase.com/dashboard/sign-up)

2. Create a new database and navigate to Settings > API to find your `Project-URL` and `Anon-Key`. You will add these to the web projects `.env` file

### Start Next.js project

1. Clone this repository and run:

   ```bash
   cd energy-site
   npm install
   ```

2. Rename `.env.example` to `.env` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[your-project-url]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   NEXT_PUBLIC_API_URL=[your-api-url] // localhost:8000
   ```

3. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   PowerPlan should now be running on [localhost:8000](http://localhost:8000/).

4. To run the test suite:

   ```bash
   npm test
   ```

## Features I would add to extend PowerPlan

- Move Battery object to my database so we could add, edit, and delete different batteries. Currently, this is hard coded in the web app.
- Randomize different layouts depending on constraints
- Save sessions as individual sessions. Allows for comparisons of different plans
- Configure constraints (50m, 200m, budget caps, etc.)
