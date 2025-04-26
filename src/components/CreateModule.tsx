"use client";

import { useState } from 'react';

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
  }) => void;
}

const CreateModuleModal = ({ isOpen, onClose, onSubmit }: CreateModuleModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ title, description });
      setTitle('');
      setDescription('');
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-sm sm:max-w-xl">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-purple-500 text-lg sm:text-2xl font-medium mb-4 sm:mb-6">Add New Module</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="title" className="block text-white mb-2">
                Module Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 rounded-[40px] bg-gray-800 text-white border-[1px] ${
                  errors.title ? 'border-red-600' : 'border-purple-600'
                } text-sm focus:outline-none focus:ring-2 ${
                  errors.title ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                }`}
                placeholder="Title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-white mb-2">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-[40px] bg-gray-800 text-sm text-white border-[1px] border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Description"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 sm:px-8 py-2 rounded-[25px] text-sm sm:text-[16px] font-normal bg-pink-800 text-white hover:bg-pink-700 duration-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 sm:px-8 py-2 rounded-[25px] text-sm sm:text-[16px] bg-purple-600 text-white hover:bg-purple-500 transition-colors"
              >
                Create Module
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModuleModal;
