import cv2
from djitellopy import Tello
from ultralytics import YOLO

# Load the YOLOv8 model
model = YOLO(r"C:\\Users\\sathish\\Desktop\\final_year_project\\model\\weights\\best (3).pt")

# Initialize DJI Tello
tello = Tello()
tello.connect()
tello.streamon()

# Initial speed
S = 20

# PID coefficients for the bounding box's x, y, and area coordinates
pid_x = [0.5, 0.5, 0]
pid_y = [0.5, 0.5, 0]
pid_area = [0.5, 0.5, 0]

# Initialize the error and integral terms
error_x, integral_x = 0, 0
error_y, integral_y = 0, 0
error_area, integral_area = 0, 0

# The target area of the bounding box (area of the frame to be covered by the bounding box)
target_area = 720*960/5

# The target position of the bounding box's center (center of the frame)
target_x = 960 // 2
target_y = 720 // 2

# Initialize the face cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Initialize variables for tracking
tracked_face = None
tracking = False

while True:
    # Get the current frame
    frame_read = tello.get_frame_read()
    frame = cv2.cvtColor(frame_read.frame, cv2.COLOR_BGR2RGB)
    frame = cv2.resize(frame, (960, 720))

    # Convert frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Perform face detection
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Draw rectangles around detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

        # Track the first detected face
        if not tracking:
            tracked_face = (x, y, w, h)
            tracking = True

        # Calculate adjustments for tracking
        error_x = target_x - (x + w // 2)
        error_y = target_y - (y + h // 2)

        # Print the adjustments instead of moving the drone
        if error_x > 0:
            print(f"Moving right by {min(S, error_x)}")
        elif error_x < 0:
            print(f"Moving left by {min(S, -error_x)}")

        if error_y > 0:
            print(f"Moving down by {min(S, error_y)}")
        elif error_y < 0:
            print(f"Moving up by {min(S, -error_y)}")

    # Display the frame with face rectangles
    cv2.imshow('Face Detection', frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        tello.land()
        break

cv2.destroyAllWindows()
