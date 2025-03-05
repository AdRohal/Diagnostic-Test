import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to list all test results
  if (req.method === 'GET') {
    try {
      const tests = await prisma.diagnosticTest.findMany();
      return res.status(200).json(tests);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching test results' });
    }
  }

  // Handle POST request to create a new test result
  else if (req.method === 'POST') {
    const { patientName, testType, result, testDate, notes } = req.body;

    // Validate required fields
    if (!patientName || !testType || !result || !testDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Create a new test result in the database
      const newTest = await prisma.diagnosticTest.create({
        data: {
          patientName,
          testType,
          result,
          testDate: new Date(testDate), // Ensure the date is properly formatted
          notes: notes || '', // Optional notes field
        },
      });

      return res.status(201).json(newTest); // Return the created test result
    } catch (error) {
      return res.status(500).json({ error: 'Error creating test result' });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}