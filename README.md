# Diagnostic Test Results Management

This is a simple CRUD application built with Next.js, TypeScript, Prisma ORM, and PostgreSQL to manage diagnostic test results for medical laboratories.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AdRohal/diagnostic-app.git
cd diagnostic-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up the PostgreSQL database:

```bash
# Create a new PostgreSQL database
createdb diagnostic_test_db

# Update the .env file with your database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/diagnostic_test_db"
```

4. Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

### Create a Diagnostic Test Result

- **URL:** `POST /api/tests`
- **Description:** Allows a laboratory to add a new diagnostic test result.
- **Request Body:**
  ```json
  {
    "patientName": "John Doe",
    "testType": "Blood Test",
    "result": "Positive",
    "testDate": "2023-10-01T00:00:00.000Z",
    "notes": "Sample note"
  }
  ```

### Get a Test Result by ID

- **URL:** `GET /api/tests/:id`
- **Description:** Retrieves a specific test result by its ID.

### Update a Test Result

- **URL:** `PUT /api/tests/:id`
- **Description:** Enables updating an existing test result.
- **Request Body:**
  ```json
  {
    "patientName": "John Doe",
    "testType": "Blood Test",
    "result": "Negative",
    "testDate": "2023-10-01T00:00:00.000Z",
    "notes": "Updated note"
  }
  ```

### Delete a Test Result

- **URL:** `DELETE /api/tests/:id`
- **Description:** Removes a test result from the database.

### List All Test Results

- **URL:** `GET /api/tests`
- **Description:** Displays all diagnostic test results.

## Frontend

The frontend is built using React and Tailwind CSS. It provides a simple UI to:

- Add new test results.
- View all test results in a list.
- Edit or delete existing test results.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Steps to Deploy

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel](https://vercel.com/) and sign up or log in.

3. Click on "New Project" and import your GitHub repository.

4. Follow the prompts to configure and deploy your project.

5. Once deployed, you will get a URL for your live site.

### Share Your Links

- **GitHub Repository:** [Your Repository Link](https://github.com/AdRohal/diagnostic-app)
- **Deployed Project:** [Your Deployed Project Link](https://your-project-name.vercel.app)