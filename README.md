# Alert user on change in eye position using PoseNet

## PoseNet Background
A machine learning model which allows for real-time human pose estimation in the browser.
For more information on PoseNet read this.[https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5]

## Project implementation of PoseNet
- This project continuously tracks your eye movement, (when you run this file in browser)
- If your posture is not as it was when you first started this project, it will blur your screen.
- Only after correcting your pose or stopping the project can you see your screen.

## Permission requires:
- Camera permission by your browser is required to run this. 

## Dependencies:
- Tensorflow.js[https://www.tensorflow.org/js]
- p5.js[https://p5js.org/]
- ml5.js[https://ml5js.org/]