import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Home = () => {
  const [email, setEmail] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/email`, { withCredentials: true });
        setEmail(response.data.email);
        console.log('Email:', response.data.email);
        localStorage.setItem('email', response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmail();
  }, [])
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-6"
        >
          Track Media Sentiment in Real Time
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg mb-10"
        >
          Analyze the latest headlines, summarize news, and monitor brand perception with AI.
        </motion.p>

        <Link
          to={email ? "/dashboard" : "/login"}
          className="bg-green-500 text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-green-600 transition"
        >
          Try the Dashboard →
        </Link>
      </div>


      <div className="py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Why Media Pulse?
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              title: "⚡ Fast Insights",
              desc: "Instantly analyze news articles and social mentions with AI-driven sentiment classification.",
            },
            {
              title: "🧠 Smart Summaries",
              desc: "Use LLMs to create 2-line digestible summaries of every article.",
            },
            {
              title: "📈 Real-time Trends",
              desc: "Track what’s being said about your topic or brand across platforms.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-green-500 transition"
            >
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p className="text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      <div className="py-20 max-w-6xl mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10"
        >
          How It Works
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-300">
          {[
            { icon: "🔍", title: "1. Search", desc: "Enter any keyword or topic like 'AI', 'Elon Musk', or 'Finance'." },
            { icon: "💬", title: "2. Analyze", desc: "Our backend fetches news and runs sentiment & summarization." },
            { icon: "📊", title: "3. Visualize", desc: "You get a beautiful dashboard with results you can filter and explore." },
          ].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-blue-500 transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
