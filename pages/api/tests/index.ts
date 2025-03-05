import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// Define the schema for validation
const testSchema = z.object({
  patientName: z.string(),
  testType: z.string(),
  result: z.string(),
  testDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  notes: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to list all test results
  if (req.method === 'GET') {
    try {
      const tests = await prisma.diagnosticTest.findMany();
      return res.status(200).json(tests);
    } catch {
      return res.status(500).json({ error: 'Error fetching test results' });
    }
  }

  // Handle POST request to create a new test result
  else if (req.method === 'POST') {
    try {
      // Validate the request body
      const validatedData = testSchema.parse(req.body);

      // Create a new test result in the database
      const newTest = await prisma.diagnosticTest.create({
        data: {
          ...validatedData,
          testDate: new Date(validatedData.testDate),
        },
      });

      return res.status(201).json(newTest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Error creating test result' });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}