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
  const { id } = req.query;

  // Ensure 'id' is a string for proper validation and Prisma query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid test ID' });
  }

  // GET: Retrieve a test result by its ID
  if (req.method === 'GET') {
    try {
      const test = await prisma.diagnosticTest.findUnique({
        where: { id: String(id) },
      });

      if (!test) {
        return res.status(404).json({ error: 'Test result not found' });
      }

      return res.status(200).json(test);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching test result' });
    }
  }

  // PUT: Update a test result by its ID
  else if (req.method === 'PUT') {
    try {
      // Validate the request body
      const validatedData = testSchema.parse(req.body);

      const updatedTest = await prisma.diagnosticTest.update({
        where: { id: String(id) },
        data: {
          ...validatedData,
          testDate: new Date(validatedData.testDate),
        },
      });

      return res.status(200).json(updatedTest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Error updating test result' });
    }
  }

  // DELETE: Delete a test result by its ID
  else if (req.method === 'DELETE') {
    try {
      const deletedTest = await prisma.diagnosticTest.delete({
        where: { id: String(id) },
      });

      return res.status(200).json({ message: 'Test result deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting test result' });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}