

let canvas = document.querySelector('#visualizer');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let file = document.querySelector('#audioFile');
let audio = document.querySelector('audio');
let audioContext = new AudioContext();




