/*p5.js
using -> setup() - to setup canvas
draw() - will draw the canvas in browser 
*/
console.log('Hello');
let videofeed;
let posenet; //will access posenet functionality from ml5
let poses = [];//array of frames 
let started = false; //check to see if video stream has started or not 
var audio = document.getElementById("audioId");

function setup(){
    const canvas = createCanvas(750,500);
    canvas.parent("video"); //show the video in div

    //start capturing video from your webcam
    videofeed = createCapture(VIDEO); 
    videofeed.size(width, height);
    console.log("setup");
    
    posenet = ml5.poseNet(videofeed); //train model by giving our video stream
    
    posenet.on("pose", results => {
        poses = results; // results is an array of your frame result
    });//on() - machine will start to compute the feed

    videofeed.hide();//when startstop button is clicked, we need to hide/unhide the video
    noLoop();

}
function start(){
    select("#startstop").html("stop");
    document.getElementById("startstop").addEventListener("click", stop);//toggle in startstop
    started = true;
    loop();
}

function stop(){
    select("#startstop").html("start");
    document.getElementById("startstop").addEventListener("click", start);//toggle in startstop
    removeBlur()
    started = false;
    noLoop(); //to stop video stream
}

function draw()
{
    if(started)
    {
        image(videofeed, 0,0,width,height); //feed, x, y, width, height
        calEyes();
    }

}

// defining the parameters used for the posenet : the tracking of the eyes
var rightEye,
  leftEye,
  defaultRightEyePosition = [],
  defaultLeftEyePosition = [];

//function to calculate the position of the various keypoints
function calEyes() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      rightEye = pose.keypoints[2].position;
      leftEye = pose.keypoints[1].position;

      // keypoints are the points representing the different joints on the body recognized by posenet

      while (defaultRightEyePosition.length < 1) {
        defaultRightEyePosition.push(rightEye.y);
      }

      while (defaultLeftEyePosition.length < 1) {
        defaultLeftEyePosition.push(leftEye.y);
      }

      // if the current position of the body is too far from the original position blur function is called
      if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 20) {
        blur();
      }
      if (Math.abs(rightEye.y - defaultRightEyePosition[0]) < 20) {
        removeBlur();
      }
    }
  }
}

function blur()
{
    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "1s";
    // var audio = document.getElementById("audioElement");
    audio.play();
    // console.log("blur");
}

function removeBlur()
{
    document.body.style.filter = "blur(0px)";
    document.body.style.transition = "1s";
    audio.pause();
}