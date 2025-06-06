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

**Replit link**: [https://replit.com/@Chaitu-Boss/Madchatter](https://replit.com/@Chaitu-Boss/Madchatter)

### 📅 Replit Notes:

* Add environment variables in Replit secrets
* SEE IN THE END FOR ENVIRONMENT VARIABLES

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
git clone https://github.com/Chaitu-Boss/Madchatter.git
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

---


## 🗒️ Special Notes

* Couldn't use transformers in replit due to its limitations
* However if you wish to use them in your local machine follow the instructions below

### 1. In fetch_data.py Uncomment this block of code

```bash
# from transformers import pipeline
# summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
# sentiment_analyzer = pipeline("sentiment-analysis",model="distilbert-base-uncased-finetuned-sst-2-english")
# def summarize_text(text, max_len=130):
#     if not text:
#         return "No content to summarize."
#     result = summarizer(text, max_length=max_len, min_length=30, do_sample=False)
#     return result[0]['summary_text']

# def get_sentiment(text):
#     if not text:
#         return "neutral"
#     result = sentiment_analyzer(text)
#     label = result[0]['label'].lower()
#     return label 
```

### 2. In fetch_data.py Comment this block of code

```bash
def summarize_text(text, sentence_count=3):
    if not text or len(text.split('.')) < 3:
        return text[:400] + "..."
    try:
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, sentence_count)
        return ' '.join(str(sentence) for sentence in summary)
    except Exception as e:
        print("Sumy failed:", e)
        return text[:400]

def get_sentiment(text):
    if not text:
        return "neutral"
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.1:
        return "positive"
    elif polarity < -0.1:
        return "negative"
    return "neutral"

```

### 3. Replace the contents of requirements.txt with the following

```bash
flask
flask-cors
flask-bcrypt
newspaper3k
lxml-html-clean
pymongo
python-dotenv
transformers
torch
```

### 4. Continue with setup instructions above from step 2

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
