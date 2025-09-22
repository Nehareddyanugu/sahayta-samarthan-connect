// components/RequestForm.tsx — a form where user submits help request

import React, { useState } from 'react';
import { submitRequest } from '../services/apiService';

interface RequestFormProps {
  onSuccess?: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await submitRequest(title, description, category, location);
      // reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error submitting request');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Submit a Help Request</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-2">
        <label className="block">Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full border px-2 py-1" 
          required 
        />
      </div>
      <div className="mb-2">
        <label className="block">Category</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="w-full border px-2 py-1" 
        />
      </div>
      <div className="mb-2">
        <label className="block">Location</label>
        <input 
          type="text"
          value={location}
          onChange={(e)=> setLocation(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label className="block">Description</label>
        <textarea 
          value={description} 
          onChange={(e)=> setDescription(e.target.value)} 
          className="w-full border px-2 py-1" 
          required 
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default RequestForm;
