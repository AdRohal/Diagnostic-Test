"use client";

import { useState, useEffect } from 'react';
import AddTestModal from './AddTestModal'; // Import the modal component
import EditTestModal from './EditTestModal'; // Import the edit modal component

type Test = {
  id: number;
  patientName: string;
  testType: string;
  result: string;
  testDate: string;
  notes: string;
};

export default function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [testToEdit, setTestToEdit] = useState<Test | null>(null); // New state for the test being edited
  const [newTest, setNewTest] = useState({
    patientName: '',
    testType: '',
    result: '',
    notes: ''
  });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<Test | null>(null); // Test to be deleted

  // Fetch tests from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('/api/tests');
        const data = await res.json();
        setTests(data); // Set tests from DB to the state
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };
    fetchTests();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTest((prev) => ({ ...prev, [name]: value }));
    if (testToEdit) {
      setTestToEdit((prevTest) => ({
        ...prevTest!,
        [name]: value,
      }));
    }
  };

  // Handle the form submission to add a new test
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the new test to the backend
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTest,
          testDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newTestData = await response.json();
        setTests((prev) => [...prev, newTestData]); // Add the new test to the list
        setIsModalOpen(false); // Close the modal after submission
      } else {
        console.error('Error adding test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  // Handle the edit form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testToEdit) return;

    try {
      const response = await fetch(`/api/tests/${testToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testToEdit),
      });

      if (response.ok) {
        const updatedTest = await response.json();
        setTests((prev) =>
          prev.map((test) =>
            test.id === updatedTest.id ? updatedTest : test
          )
        );
        setIsEditModalOpen(false); // Close the edit modal
      } else {
        console.error('Error updating test');
      }
    } catch (error) {
      console.error('Error submitting edit:', error);
    }
  };

  // Handle opening the edit modal with the specific test data
  const openEditModal = (test: Test) => {
    setTestToEdit(test);
    setIsEditModalOpen(true);
  };

  // Handle opening the delete confirmation modal
  const openDeleteConfirmation = (test: Test) => {
    setTestToDelete(test);
    setIsDeleteConfirmationOpen(true);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!testToDelete) return;

    try {
      const response = await fetch(`/api/tests/${testToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTests((prev) => prev.filter((test) => test.id !== testToDelete.id));
        setIsDeleteConfirmationOpen(false); // Close the confirmation modal
      } else {
        console.error('Error deleting test');
      }
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  return (
    <div className="text-black">
      {/* Flex container to align the title and button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Test Results</h1>

        {/* Add button to open modal, aligned to the right */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Test
        </button>
      </div>

      {/* Table for displaying test results */}
      <table className="w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Patient Name</th>
            <th className="px-4 py-2 text-left">Test Type</th>
            <th className="px-4 py-2 text-left">Result</th>
            <th className="px-4 py-2 text-left">Test Date</th>
            <th className="px-4 py-2 text-left">Notes</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id}>
              <td className="px-4 py-2">{test.patientName}</td>
              <td className="px-4 py-2">{test.testType}</td>
              <td className="px-4 py-2">{test.result}</td>
              <td className="px-4 py-2">{test.testDate}</td>
              <td className="px-4 py-2">{test.notes}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => openEditModal(test)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteConfirmation(test)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Test Modal */}
      <AddTestModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newTest={newTest}
      />

      {/* Edit Test Modal */}
      <EditTestModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        handleSubmit={handleEditSubmit}
        handleInputChange={handleInputChange}
        testToEdit={testToEdit || {}}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this test?</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteConfirmationOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}