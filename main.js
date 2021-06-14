prediction1 = "";
prediction2 = "";

Webcam.set({
  height : 300,
  width  :350,
  image_fromat :'png',
  png_quality : 90
});
var camera = document.getElementById("camera");
Webcam.attach('#camera');

function Capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = 
        "<img id = 'captured_image' src = " + data_uri + ">";
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DtKIV595h/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function Speak(){
 var synthesis = window.speechSynthesis;
 speak_data1 = "The First prediction is" + prediction1;
 speak_data2 = "And The Second prediction is" + prediction2; 
 utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
 synthesis.speak(utter_this);   
}

function Predict(){
var img = document.getElementById("captured_image");
classifier.classify(img,get_result);
}

function get_result(error,result){
if(error){
    console.log(error);
}
else{
    console.log(result);
    prediction1 = result[0].label;
    prediction2 = result[1].label;

    document.getElementById("gesture_name_result").innerHTML = prediction1;
    document.getElementById("gesture_name_result2").innerHTML = prediction2;
    Speak();

    if(result[0].label == "Victory"){
        document.getElementById("gesture_result").innerHTML ="&#9996;"; 
    }

    if(result[0].label == "Best"){
        document.getElementById("gesture_result").innerHTML ="&#128077;" ;
    }

    if(result[0].label == "Amazing"){
        document.getElementById("gesture_result").innerHTML ="&#128076;"; 
    }

    if(result[1].label == "Victory"){
        document.getElementById("gesture_result2").innerHTML ="&#9996;"; 
    }

    if(result[1].label == "Best"){
        document.getElementById("gesture_result2").innerHTML ="&#128077;" ;
    }

    if(result[1].label == "Amazing"){
        document.getElementById("gesture_result2").innerHTML ="&#128076;"; 
    }
}
}