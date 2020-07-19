/*p5.js
using -> setup() - to setup canvas
draw() - will draw the canvas in browser 
*/
console.log('Hello');
let videofeed;
let posenet; //will access posenet functionality from ml5
let poses = [];//array of frames 
let started = false; //check to see if video stream has started or not 

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
    noloop(); //to stop video stream
}

function setup(){
    const canvas = createCanvas(750,500);
    canvas.parent("video"); //show the video in div

    //start capturing video from your webcam
    videofeed = createCapture(VIDEO); 
    videofeed.size(width, height);
    
    posenet = ml5.poseNet(video); //train model by giving our video stream
    
    posenet.on("pose", results => {
        poses = results; // results is an array of your frame result
    });//on() - machine will start to compute the feed

    videofeed.hide();//when startstop button is clicked, we need to hide/unhide the video
    noLoop();

}

function draw()
{
    image(videofeed, 0,0,width,height); //feed, x, y, width, height
}

//keypoints for posenet
var rightEye, leftEye

defaultRightEyePosition = [],
defaultleftEyePosition = []

function calEyes(){

    for(let i =0; i<poses.length ; i++)
    {
        let currentPose = poses[i].pose;
        for(let j =0; j < poses.keypoints.length; j++)
        {
            let keypoint = pose.keypoints[j];
            rightEye = pose.keypoints[2].position; //predefined keypoint for each point on body
            leftEye = pose.keypoints[1].position;

            while(defaultRightEyePosition.length < 1)
            {
                defaultRightEyePosition.push(rightEye.y);
            }

            while(defaultLeftEyePosition.length < 1)
            {
                defaultLeftEyePosition.push(leftEye.y);
            }

            if(Math.abs(rightEye.y - defaultRightEyePosition[0]) > 20)
            {
                //call function if abs value exceeds 20
                blur();
            }

            if(Math.abs(leftEye.y - defaultLeftEyePosition[0]) > 20)
            {
                //call function if abs value exceeds 20
                blur();
            }

            if(Math.abs(rightEye.y - defaultRightEyePosition[0]) < 20)
            {
                //call function if abs value exceeds 20
                removeBlur();
            }

            if(Math.abs(leftEye.y - defaultLeftEyePosition[0]) < 20)
            {
                //call function if abs value exceeds 20
                removeBlur();
            }
        }
    }
}

function blur()
{
    document.body.style.filter = "blur(5px)";
    document.style.transition = "1s";
}

function removeBlur()
{
    document.body.style.filter = "blur(0px)";
    document.style.transition = "1s";
}