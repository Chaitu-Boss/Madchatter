from dotenv import load_dotenv
load_dotenv()
import os
from fetch_data import fetch_data
from flask import Flask, request, jsonify, session ,make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
app.secret_key="HiItsMeGoku"

try:
    client = MongoClient("") # Replace with this mongoDB connection string or use this mongodb+srv://chaitu:chaitu2005@cluster0.sxaeozd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    db = client["test"]
    collection = db["results"]
    users_collection = db["users"]
    print("Connected to MongoDB")
except Exception as e:
    print(f"Error: {e}")


@app.route("/")
def hello():
    return "Hello World!"

@app.route('/results', methods=['POST'])
def results():
    data = request.get_json()
    query = data.get('query')
    email = data.get('email')
    if not query:
        return jsonify({'error': 'Invalid input'}), 400
    data = fetch_data(query)
    if not data:
        return jsonify({'error': 'No results found'}), 404
    collection.insert_one({'email': email, 'query': query, 'results': data})
    for article in data:
        article.pop('text', None)
        
    return jsonify({'data': data}), 201


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {'username': username, 'email': email, 'password': hashed_password}
    users_collection.insert_one(user_data)
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    user = users_collection.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        session['email'] = email
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('session', None)
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    response.set_cookie('session', '', expires=0)
    return response

@app.route('/history', methods=['POST'])
def get_history():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    searches = collection.find({'email': email}, {'_id': 0, 'query': 1})
    unique_queries = list({doc['query'] for doc in searches})
    return jsonify({'history': unique_queries}), 200
@app.route('/home')
def home():
    if 'email' in session:
        return jsonify({'email': session['email']}), 200
    return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)