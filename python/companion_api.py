import asyncio
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from api.upstash import MemoryManager
from companion import load_companions
from companion_app import guess_clerk_user_id, LlmManager

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
CORS(app, resources={r"*": {"origins": "*"}})  # Allow all origins (for development only)


companion = None  # Initialize the companion outside of the endpoint function

@app.route('/chat', methods=['POST'])
def chat_with_companion():
    try:
        data = request.json
        user_id = data.get('user_id')
        companion_name = data.get('companion_name', 'Eva')  # Default to 'me' if not provided or missing
        print("user_id:", user_id)
        print("companion_name:", companion_name)

        if not user_id:
            return jsonify({'error': 'User ID not provided'}), 400

        global companion  # Access the companion variable defined outside the function
        if companion is None or companion.name != companion_name:
            # Load companions and find the specified companion by name
            companions = load_companions()
            companion = next((c for c in companions if c.name == companion_name), None)

            if companion is None:
                return jsonify({'error': f'Companion "{companion_name}" not found'}), 404

            companion.memory = MemoryManager(companion.name, companion.llm_name)
            companion.memory.user_id = user_id
            asyncio.run(companion.load())
            companion.llm = LlmManager(companion.prompt_template)

        message = data.get('message')
        if not message:
            return jsonify({'error': 'Message not provided'}), 400

        # Simulate user input and interaction
        reply = asyncio.run(companion.chat(message, user_id))
        return jsonify({'response': reply})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    load_dotenv("../.env")
    app.run(host='0.0.0.0', port=5001)
