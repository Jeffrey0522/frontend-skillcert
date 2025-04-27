"use client";
import { useState } from 'react';

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lessonData: {
    title: string;
    type: 'Video' | 'Text' | 'Quiz' | 'Assignment';
    duration: string;
  }) => void;
}

const CreateLessonModal = ({ isOpen, onClose, onSubmit }: CreateLessonModalProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Video' | 'Text' | 'Quiz' | 'Assignment'>('Video');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState<{ title?: string; duration?: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { title?: string; duration?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (duration.length > 1 && !/^\d{1,2}:\d{2}$/.test(duration)) {
      newErrors.duration = 'Duration must be in the format mm:ss (e.g., 10:30).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({ title, type, duration });
    setTitle('');
    setType('Video');
    setDuration('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-sm sm:max-w-xl">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-purple-500 text-lg sm:text-2xl font-medium mb-4 sm:mb-6">Add New Lesson</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="title" className="block text-white mb-2">
                Lesson Title
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
                required
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div className="mb-4 sm:mb-6">
              <p className="text-white mb-2">Lesson Type</p>
              <div className="flex flex-wrap gap-4 sm:gap-8 ml-2 sm:ml-6">
                {(['Video', 'Text', 'Quiz', 'Assignment'] as const).map((lessonType) => (
                  <div key={lessonType} className="flex items-center">
                    <input
                      id={`type-${lessonType.toLowerCase()}`}
                      type="radio"
                      name="lessonType"
                      value={lessonType}
                      checked={type === lessonType}
                      onChange={() => setType(lessonType)}
                      className="w-4 h-4 bg-gray-900 border border-white focus:ring-purple-500 checked:bg-purple-600 appearance-none rounded-full"
                    />
                    <label
                      htmlFor={`type-${lessonType.toLowerCase()}`}
                      className="ml-2 text-white"
                    >
                      {lessonType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="duration" className="block text-white mb-2">
                Duration (Optional)
              </label>
              <input
                id="duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={`w-full px-4 py-2 rounded-[40px] bg-gray-800 text-sm text-white border-[1px] ${
                  errors.duration ? 'border-red-600' : 'border-purple-600'
                } focus:outline-none focus:ring-2 ${
                  errors.duration ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                }`}
                placeholder="e.g. 10:30"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
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
                Create Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLessonModal;