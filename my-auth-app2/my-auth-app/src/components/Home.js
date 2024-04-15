import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './Home.css'; // Import CSS file for styles

const socket = io('http://localhost:5000');

const Home = () => {
    useEffect(() => {
        socket.on('output', (data) => {
            console.log('Received output:', data);
            // Handle the output data received from the server
        });
    }, []);

    // eslint-disable-next-line
    const executeScript = (scriptName) => {
        socket.emit('run_script', { script: scriptName });
    };

    // Function to navigate to localhost:5000
    const navigateToLocalhost5000 = () => {
        window.location.href = 'http://localhost:5000';
    };

    return (
        <div className="home-container">
            <h1>Welcome to Our Innovative Project!</h1>
            <p>
                At [Your Company/Project Name], we're proud to introduce our groundbreaking project that combines cutting-edge technologies to revolutionize drone technology and object detection. Our project focuses on the integration of AI-powered systems with DJI Tello Drones to achieve real-time object detection and tracking of specific individuals, particularly journalists, using custom-trained YOLOv8 models.
            </p>
            <h2>Key Features:</h2>
            <ul>
                <li>AI-Powered Object Detection</li>
                <li>User-Friendly Interface</li>
                <li>Firebase Authentication</li>
                <li>Custom YOLOv8 Model</li>
                <li>Drone Integration</li>
                <li>Data Management</li>
            </ul>
            <h2>Technologies Used:</h2>
            <ul>
                <li>React</li>
                <li>Firebase Authentication</li>
                <li>Flask</li>
                <li>MySQL Database</li>
                <li>YOLOv8 Model</li>
                <li>DJI Tello Drone API</li>
            </ul>
            <p>
                Our project aims to redefine drone technology in various industries, including journalism, surveillance, and event management, by providing advanced capabilities for object detection and tracking. Join us in exploring the future of drone technology with innovative solutions designed to meet the evolving needs of modern society.
            </p>
            {/* Button to navigate to localhost:5000 */}
            <button className="control-button" onClick={navigateToLocalhost5000}>Start controlling the drone</button>
        </div>
    );
};

export default Home;
