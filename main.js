Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0tmO01Otl/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

prediction1 = "";
prediction2 = "";

function speak(){
   var synth = window.speechSynthesis;
   speak_data1 = "The first prediction is" + prediction1;
   speak_data2 = "The second prediction is" + prediction2;
   var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
   synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "HAPPY"){
            document.getElementById('update_emoji').innerHTML = '&#128512'
        }
        if(results[0].label == "SAD"){
            document.getElementById('update_emoji').innerHTML = '&#128557' + "Do not be sad and do not give up on your dreams. Dreams will come true one day. There is no person as beautiful as a person who dreams"
        }
        if(results[0].label == "WEIRD"){
            document.getElementById('update_emoji').innerHTML = '&#129322'
        }
        if(results[0].label == "SUPRISED"){
            document.getElementById('update_emoji').innerHTML = '&#128552'
        }

        if(results[1].label == "HAPPY"){
            document.getElementById('update_emoji2').innerHTML = '&#128512'
        }
        if(results[1].label == "SAD"){
            document.getElementById('update_emoji2').innerHTML = '&#128557' + "Do not be sad and do not give up on your dreams. Dreams will come true one day. There is no person as beautiful as a person who dreams"
        }
        if(results[1].label == "WEIRD"){
            document.getElementById('update_emoji2').innerHTML = '&#129322'
        }
        if(results[1].label == "SUPRISED"){
            document.getElementById('update_emoji2').innerHTML = '&#128552'
        }
    }
}