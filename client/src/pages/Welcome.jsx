import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Welcome = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: "POST",
        credentials: 'include',
      });
      const data = await res.json();
      toast.success(data.message);
      navigate('/auth?state=login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/users/welcome', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        navigate('/auth?state=login');
        return;
      }

      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {name}!</h1>
        <button
          onClick={logout}
          className="px-6 py-2.5 rounded bg-red-500 text-white font-medium hover:bg-red-600 transition-all active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
