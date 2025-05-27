import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from '../components/ArticleList';
import Loader from '../components/Loader';

const Dashboard = () => {
    const [query, setQuery] = useState('');
    const [email] = useState(localStorage.getItem('email'));
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [history, setHistory] = useState([]);
    const [sentimentFilter, setSentimentFilter] = useState('all');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        axios
            .post(`${BACKEND_URL}/history`, { email })
            .then(res => setHistory(res.data.history || []))
            .catch(err => console.error("Failed to fetch history", err));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        setLoading(true);
        setArticles([]);

        try {
            const response = await axios.post(``, {
                query,
                email,
            });

            const data = response.data;
            if (data?.data) {
                setArticles(data.data);
            } else {
                alert("No results found.");
            }
        } catch (error) {
            console.error("Axios error:", error);
            alert("Something went wrong while fetching data.");
        } finally {
            setLoading(false);
        }
    };
    return (
  <div className="min-h-screen bg-black text-white">
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2 text-green-400">Media Pulse Dashboard</h2>
        <p className="text-gray-400">Search, Analyze, and Filter news sentiment in one place.</p>
      </div>
      {history.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Previous Searches</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => setQuery(item)}
                className="px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-green-500 hover:text-black transition cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-8 border border-gray-700">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a topic (e.g., AI, Tesla, Elon Musk)"
            className="flex-1 bg-gray-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-black px-6 py-2 rounded font-semibold hover:bg-green-600 transition cursor-pointer"
          >
            Search
          </button>
        </form>

        {articles.length > 0 && (
          <div className="flex justify-end">
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:ring-2 focus:ring-green-400"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ArticleList
          articles={
            sentimentFilter === 'all'
              ? articles
              : articles.filter((a) => a.sentiment === sentimentFilter)
          }
        />
      )}
    </div>
  </div>
);

};

export default Dashboard;
