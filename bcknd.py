from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)  # Corrected __name__
CORS(app)  # Enable CORS for all routes

# Configure MongoDB connection (using your 'sukoonlg' database)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sukoonlg'
mongo = PyMongo(app)

# Register User Endpoint
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    # Check if user already exists in 'logininfo' collection
    if mongo.db.logininfo.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash password and insert user into 'logininfo' collection
    hashed_password = generate_password_hash(password)
    mongo.db.logininfo.insert_one({
        'username': username,
        'email': email,
        'password': hashed_password
    })
    return jsonify({'message': 'User registered successfully'}), 201

# Login User Endpoint
@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data['email']
    password = data['password']

    # Find user in 'logininfo' collection
    user = mongo.db.logininfo.find_one({'email': email})
    if user and check_password_hash(user['password'], password):
        return jsonify({'message': f'Welcome, {user["username"]}'}), 200
    return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
