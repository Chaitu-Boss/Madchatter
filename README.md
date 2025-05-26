# 🌍 Media Pulse - AI-Powered News Sentiment Dashboard

Media Pulse is a full-stack AI-powered web app that lets users search for real-time news, analyze article content using LLMs, summarize it, and filter it by sentiment. Media Pulse helps monitor how topics are being discussed across media.

---

## ✨ Project Summary

Media Pulse enables users to:

* Search for trending news topics
* Scrape full news articles from links
* Generate smart summaries using LLMs
* Analyze sentiment (positive/neutral/negative)
* View results on a dashboard with filters
* Store search history per user

It's a productivity tool for media professionals, analysts, and anyone interested in how a topic is perceived in the news.

---

## 🌐 Live Replit (Frontend + Backend Combined)

**Replit link**: [https://replit.com/@YourUsername/media-pulse](#)
*(Replace with your actual Replit link)*

### 📅 Replit Notes:

* May need to install: `newspaper3k`, `transformers`, `flask-cors`, etc.
* Add environment variables in `.env` or directly in Replit secrets

---

## 📊 Tech Stack

### Frontend:

* React + Vite
* Tailwind CSS
* Framer Motion
* Axios
* react-hot-toast

### Backend:

* Flask
* Flask-CORS
* MongoDB (via pymongo)
* newspaper3k (for article scraping)
* transformers (HuggingFace)

### AI:
* Huggingface Tranformers
* Summarization: `sshleifer/distilbart-cnn-12-6`
* Sentiment: `distilbert-base-uncased-finetuned-sst-2-english`

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/media-pulse.git
cd Madchatter
```

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🌐 Replit Setup

* Make sure `flask` is running in one tab and `npm run dev` in another (if using two repls)
* If using one Replit, serve React via Flask static or use `vite build`

---

## 🤖 AI Feature Explanation

### ✍️ Summarization:

* Uses HuggingFace pipeline with `distilbart-cnn-12-6`
* Summarizes each scraped article to \~2-3 sentences

### 😕 Sentiment Analysis:

* Uses `distilbert-base-uncased-finetuned-sst-2-english`
* Classifies sentiment as `positive`, `neutral`, or `negative`
* Shows a colored label and allows filtering in UI

---

## ⚠️ Limitations / Known Bugs

* Some news domains (e.g., reuters.com) may block scraping
* Backend errors may occasionally appear on slow connections (especially on Replit)
* Loading Results might take some time as data gets scraped from various sites

---

## 📁 Folder Structure

```
/Madchatter
├── frontend/              # React frontend
│   ├── components/      # UI components like Navbar, Loader, ArticleCard
│   ├── pages/           # Login, Register, Dashboard
│   └── main.jsx
├── backend/             # Flask backend
│   ├── main.py
│   ├── fetch_data.py    # scraping + NLP logic
│   └── requirements.txt
└── README.md
```

---

## 🔧 Maintainer

Built with ❤️ by **Chaitu Boss**

---
