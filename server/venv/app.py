from flask import Flask,jsonify,request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow cross-origin requests

# In-memory list to store tasks (you can replace this with a database in the future)
tasks = [
    {"id": 1, "name": "Buy groceries"},
    {"id": 2, "name": "Read a book"}
]

# Route to get the list of tasks (GET /tasks)
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)  # Return the tasks as a JSON response

# Route to add a new task (POST /tasks)
@app.route('/tasks', methods=['POST'])
def add_task():
    # Get the task from the request body (expecting JSON)
    data = request.get_json()

    # Check if 'name' is provided in the request body
    if not data or 'name' not in data:
        return jsonify({"error": "Task name is required"}), 400  # Bad request if 'name' is missing

    # Create a new task with a unique ID
    new_task = {
        "id": len(tasks) + 1,  # Generate a new ID based on the length of the task list
        "name": data['name']   # Use the name from the request body
    }

    # Add the new task to the in-memory list
    tasks.append(new_task)

    # Return the newly created task with a 201 Created status
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
