from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('run_script')
def execute_script(data):
    script_name = data.get('script')
    try:
        # Execute the script using subprocess.Popen and capture the output
        process = subprocess.Popen(['python', script_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        # Check if there were any errors during script execution
        if stderr:
            output = f'Error executing {script_name}: {stderr.decode()}'
        else:
            output = stdout.decode()

        # Emit the output back to the client
        socketio.emit('output', output)
    except Exception as e:
        socketio.emit('output', f'Error executing {script_name}: {str(e)}')

if __name__ == '__main__':
    socketio.run(app, debug=True)