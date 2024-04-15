from flask import Flask, render_template, jsonify, request
import subprocess

app = Flask(__name__)

@app.route('/')


@app.route('/execute/<script_name>', methods=['GET'])
def execute_script(script_name):
    try:
        if script_name == 'connect':
            result = subprocess.run(['python', 'C:\\Users\\sathish\\Desktop\\final_year_project\myapp\\my-auth-app2\my-auth-app\\src\\components\\connect_script.py'], capture_output=True, text=True)
        elif script_name == 'facetracking':
            result = subprocess.run(['python', 'path/to/facetracking_script.py'], capture_output=True, text=True)
        else:
            return jsonify({'output': 'Invalid script name provided'}), 400
        
        output = result.stdout
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
