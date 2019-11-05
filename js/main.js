

let canvas = document.querySelector('#visualizer');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let file = document.querySelector('#audioFile');
let audio = document.querySelector('audio');
let audioContext = new AudioContext();
let fftSize = 256;

file.addEventListener("change",function(){
    let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();

    let src = audioContext.createMediaElementSource(audio);
    let analyser = audioContext.createAnalyser();

    src.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = fftSize;

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);
    let barWidth = Math.round(width/bufferLength);
    let barHeight = 0;

    function drawGraph(){
        ctx.clearRect(0,0,width,height);
        analyser.getByteFrequencyData(dataArray);
        let barIndex = 0;
        for (var i = 0; i < bufferLength; i++) {
            barHeight = Math.round(height * dataArray[i]/(fftSize-1));
            var r = 200;
            var g = 250 * (i/bufferLength);
            var b = barHeight + (25 * (i/bufferLength));
    
            color = "rgb(" + r + "," + g + "," + b + ")";
            drawBar(ctx,barIndex*barWidth,height - barHeight,barWidth,barHeight,color);
            barIndex++;
        }
        requestAnimationFrame(drawGraph);
    }
    drawGraph();
})


