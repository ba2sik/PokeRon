<p align="center">
  <img src="./apps/client/public/pokeron.png" width="200" alt="logo"/>
</p>

---

![react](https://img.shields.io/badge/-react-darkslategray?style=for-the-badge&logo=react&color=1c1c1c&logoColor=61DAFB)
![typescript](https://img.shields.io/badge/-typescript-darkslategray?style=for-the-badge&logo=typescript&color=1c1c1c&logoColor=3178C6)
![nodejs](https://img.shields.io/badge/-node.js-darkslategray?style=for-the-badge&logo=node.js&color=1c1c1c&logoColor=8CC84B)
![docker](https://img.shields.io/badge/-docker-darkslategray?style=for-the-badge&logo=docker&color=1c1c1c&logoColor=2496ED)
![express](https://img.shields.io/badge/-express-darkslategray?style=for-the-badge&logo=express&color=1c1c1c&logoColor=000000)
![prisma](https://img.shields.io/badge/-prisma-darkslategray?style=for-the-badge&logo=prisma&color=1c1c1c&logoColor=2D3748)
![redis](https://img.shields.io/badge/-redis-darkslategray?style=for-the-badge&logo=redis&color=1c1c1c&logoColor=DC382D)
![tailwindcss](https://img.shields.io/badge/-tailwindcss-darkslategray?style=for-the-badge&logo=tailwindcss&color=1c1c1c&logoColor=38B2AC)
![@supabase/supabase-js](https://img.shields.io/badge/-@supabase/supabase--js-darkslategray?style=for-the-badge&logo=supabase&color=1c1c1c&logoColor=3F5D7D)
![axios](https://img.shields.io/badge/-axios-darkslategray?style=for-the-badge&logo=axios&color=1c1c1c&logoColor=5A29E3)
![@tanstack/react-query](https://img.shields.io/badge/-@tanstack/react--query-darkslategray?style=for-the-badge&logo=react-query&color=1c1c1c&logoColor=FF8C00)
![react-hook-form](https://img.shields.io/badge/-react--hook--form-darkslategray?style=for-the-badge&logo=react&color=1c1c1c&logoColor=00BFFF)
![zod](https://img.shields.io/badge/-zod-darkslategray?style=for-the-badge&logo=zod&color=1c1c1c&logoColor=E34F26)
![turbo](https://img.shields.io/badge/-turbo-darkslategray?style=for-the-badge&logo=turbo&color=1c1c1c&logoColor=8B5CF6)

**PokéRon** is an app that lets you view and search Pokémon, log in to your account, and save your favorite ones.  
Explore, find your favorites, and enjoy a personalized Pokémon experience!

Check it out [here](https://pokeron.ronzano.com/).

![PokéRon Screenshot](/apps/client/public/screenshot.png)

## Getting Started

To get started with PokéRon, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/ba2sik/PokeRon.git
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up Supabase:**
    - Make sure you have a Supabase project set up.


4. **Set up environment variables:**
    - **Root Directory:**
        - Create a `.env` file in the root directory. You can copy the contents from [`.env.example`](https://github.com/ba2sik/PokeRon/blob/main/.env.example) to set up your environment variables.

    - **Backend:**
        - Create a `.env.docker` file in the `apps/backend` directory. Use [`.env.docker.example`](https://github.com/ba2sik/PokeRon/blob/main/apps/backend/.env.docker.example) as a reference to configure environment variables for the backend, including Supabase and PostgreSQL settings.


5. **Run Prisma to generate the database schema:**
    - In the `packages/database` directory, run the following commands to create the necessary tables in your database:
      ```
      npm run prisma:generate
      npm run prisma:push
      ```

6. **Run the application:**
   ```
   npm run docker:up
   ```
   This will build both the backend and client, then start the application with Docker.

Enjoy exploring the world of Pokémon!
