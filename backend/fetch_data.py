import requests
from transformers import pipeline
from newspaper import Article

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
sentiment_analyzer = pipeline("sentiment-analysis",model="distilbert-base-uncased-finetuned-sst-2-english")

def summarize_text(text, max_len=130):
    if not text:
        return "No content to summarize."
    result = summarizer(text, max_length=max_len, min_length=30, do_sample=False)
    return result[0]['summary_text']

def get_sentiment(text):
    if not text:
        return "neutral"
    result = sentiment_analyzer(text)
    label = result[0]['label'].lower()
    return label 

def scrape_article(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch article: {response.status_code}")

    article = Article(url)
    article.set_html(response.text)
    article.parse()
    article.nlp()

    return {
        "title": article.title,
        "text": article.text,
        "authors": article.authors,
        "publish_date": str(article.publish_date),
        "top_image": article.top_image,
        "summary": article.summary,
        "keywords": article.keywords,
        "url": url
    }
    
    
def fetch_data(query):
    if not query:
        return []
    url = "https://real-time-news-data.p.rapidapi.com/search"

    querystring = {"query":query,"limit":"10","time_published":"7d","lang":"en"}

    headers = {
	    "x-rapidapi-key": "", # Add your RapidAPI key here or use this 7e969dc31cmsh1694e175661a0f1p1672edjsn3cc2103e9b56
	    "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    data=response.json()
    data= data.get('data')
    if not data:
        return []
    results = []
    for item in data:
        try:
            details = scrape_article(item.get('link'))
            summary = summarize_text(details.get('text')[:1024])
            sentiment = get_sentiment(details.get('text')[:512])
            details['summary'] = summary
            details['sentiment'] = sentiment
            results.append(details)
        except Exception as e:
            print(f"Skipping article due to error: {e}")
            continue
    if not results:
        return []
    return results