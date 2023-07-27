# 2023 SCD Summer Project

The summer project aims to engage students in creating and deploying a web-based application within a two-month time frame. Students will work collaboratively in teams, taking on different roles and responsibilities to incrementally develop the application from start to finish, using the Agile methodology.

<details>
<summary>Description</summary>
The summer project aims to engage students in creating and deploying a web-based application within a two-month time frame. Students will work collaboratively in teams, taking on different roles and responsibilities to incrementally develop the application from start to finish, using the Agile methodology.

Throughout the project, students will gain hands-on experience in web development, enhancing their programming skills and expanding their technical knowledge. They will have the opportunity to work on frontend and/or backend development, database management, system (architecture) design, CI/CD pipelines, and also non-technical roles such as management, marketing, branding, and QA/UX. The project also focuses on fostering teamwork, collaboration, and project management skills as students work together to overcome challenges and meet project milestones.

By participating in this summer project, students will have the chance to build their portfolios and resumes with a real-world web application, showcasing their practical skills and commitment to learning ubiquitous and intricate systems. They will also benefit from networking opportunities, connecting with peers, mentors, and faculty involved in the project. Additionally, the project will provide students with exposure to industry practices and development methodologies, preparing them for future careers in related fields.

It may seem a bit overwhelming to realize what you're getting yourself into, but don't worry! You don't have to be fully committed to join. The goal of this project is to provide you with a valuable learning experience, skill development, personal growth, and the opportunity to work communally on a meaningful project that can have a lasting impact on your academic and professional journeys.
<br>

</details>

## Tooling

<details>
<summary>Tools</summary>
<br>

The client was bootstrapped with [reactjs-vite-tailwindcss-boilerplate](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate)

This client uses tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

The server uses tools like:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Pocketbase SDK](https://github.com/pocketbase/js-sdk)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [Pocketbase BaaS](https://pocketbase.io/)

</details>

<details>
<summary>Architecture</summary>
<br>
Backend architecture:

![backend-architecture](/.github/imgs/backend.png)

</details>

## Getting Started

<details>
<summary>Running only frontend</summary>
<br>

### Prerequisites

1. [Node.js](https://nodejs.org/en/download/)
2. [Git](https://git-scm.com/downloads)

<br>
1. Clone the repository

```bash
# clone repo
git clone https://github.com/WSU-Society-of-Computer-Developers/summer-project
# go to project folder
cd summer-project
# go to client folder
cd client
```

2. Create a `.env` file in `client/` folder with the following contents:

```bash
VITE_PB_URL=https://pb-temp1.zavaar.net
VITE_API_URL=https://dev-temp1.zavaar.net
```

3. Install dependencies

```bash
npm install
```

4. Run the dev environment

```bash
# run this command every time you want to start the dev server
npm run dev
```

Now the site should be up with hot reload @ <http://localhost:5173>.

</details>

<details>
<summary>Running entire dev environment</summary>
<br>

**YOU MUST HAVE [Docker](https://docs.docker.com/get-docker/) INSTALLED**

### Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
2. [Git](https://git-scm.com/downloads)

<br>

1. Clone the repository

```bash
# clone repo
git clone https://github.com/WSU-Society-of-Computer-Developers/summer-project

# go to project folder
cd summer-project
```

1. Create a `.env` file in `server/` folder with the following contents:

```bash
PORT=5000
REDIS_URL=redis://redis:6379
PB_URL=http://pocketbase:8090
PB_ADMIN_USERNAME=get_from_discord
PB_ADMIN_PASSWORD=get_from_discord
NODE_ENV=development

```

> **NOTE:** Replace `get_from_discord` with the actual values from Discord in the [#backend-private](https://discord.com/channels/1114185335266623488/1114328051673731102/1119060706453635204) channel

4. Create a `.env` file in `client/` folder with the following contents:

```bash
VITE_PB_URL=http://localhost:8090
VITE_API_URL=http://localhost:5000
```

3. Download the `pocketbase_data.zip` from Discord in the pinned message in the [#backend-private](https://discord.com/channels/1114185335266623488/1114328051673731102/1130206254422294628) channel and extract it in the `summer-project/server` folder

Your directory should now look like this:

```
summer-project/
├─ client/
│  ├─ src/
│  ├─ .env
├─ server/
│  ├─ docker/
│  │  ├─ pb/
│  │  │  ├─ data/
│  │  │  ┕ public/
│  ├─ src/
│  ┕ .env
┕ docker-compose.yml
```

4. Run the dev environment

```bash
# in the summer-project folder where the docker-compose.yml file is in, run:
docker-compose up
```

> If you have any questions, please contact @ThatZiv

You should be able to now:

- Access the frontend: <http://localhost:5173/>
- Access the backend: <http://localhost:5000/api>
- Access the Pocketbase admin panel: <http://localhost:8090/_/>

### Caveats

- If you want to run the backend without docker, you will need to install [Redis](https://redis.io/) and [Node.js](https://nodejs.org/en/download/) and run them separately
- Any changes in code for both the **client** and **server** outside their respective `src/` folder will require a docker image rebuild to reflect changes:
  - `docker-compose up --build`

</details>

## License

This project is licensed under the MIT License.
