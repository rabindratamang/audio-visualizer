

let canvas = document.querySelector('#visualizer');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let file = document.querySelector('#audioFile');
let audio = document.querySelector('audio');
let audioContext = new AudioContext();

file.addEventListener("change",function(){
    let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();

    let src = audioContext.createMediaElementSource(audio);
    let analyser = audioContext.createAnalyser();

    src.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);

    let barWidth = (width/bufferLength);
    let barHeight;

    function drawGraph(){
        requestAnimationFrame(drawGraph);
        analyser.getByteFrequencyData(dataArray);
        
    }

    drawGraph();
})


