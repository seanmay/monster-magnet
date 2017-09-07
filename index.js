const main = document.querySelector("main");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");


context.fillRect(0, 0, canvas.width, canvas.height);

main.appendChild(canvas);