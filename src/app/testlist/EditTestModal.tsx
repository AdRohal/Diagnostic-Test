"use client";

import { useState, useEffect } from 'react';

type EditTestModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  testToEdit: any; // Add the test data to edit
};

export default function EditTestModal({
  isOpen,
  closeModal,
  handleSubmit,
  handleInputChange,
  testToEdit,
}: EditTestModalProps) {
  // Close modal if clicked outside the modal area
  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Test Result</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="patientName">
              Patient Name
            </label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              value={testToEdit.patientName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="testType">
              Test Type
            </label>
            <input
              id="testType"
              name="testType"
              type="text"
              value={testToEdit.testType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="result">
              Result
            </label>
            <input
              id="result"
              name="result"
              type="text"
              value={testToEdit.result}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={testToEdit.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}