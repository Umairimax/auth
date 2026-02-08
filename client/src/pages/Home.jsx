import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/users/welcome', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (data.user) navigate(`/auth/users/${data.user.name}`);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-8 rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
        <Link to="/auth?state=register">
          <button className="w-40 py-2.5 rounded bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all active:scale-95">
            Get Started
          </button>
        </Link>
        <Link to="/auth?state=login">
          <button className="w-40 py-2.5 rounded border-2 border-indigo-500 text-indigo-500 font-medium hover:bg-indigo-500 hover:text-white transition-all active:scale-95">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
