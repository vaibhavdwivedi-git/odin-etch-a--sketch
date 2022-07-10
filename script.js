DEFAULT_COLOR = "#333333";
DEFAULT_MODE = "color";
DEFAULT_SIZE = 16;

var mode = DEFAULT_MODE;
var color = DEFAULT_COLOR;
var size = DEFAULT_SIZE;

const colorpicker = document.querySelector('#colorselector');
const sizeSelector = document.querySelector('.slider');
const canvas = document.querySelector('#canvas');

const colormode = document.querySelector('#color');
const rainbowmode = document.querySelector('#rainbow');
const erasermode = document.querySelector('#eraser');
const clearmode = document.querySelector('#clear');

colormode.onclick = selectedMode;
erasermode.onclick = selectedMode;
rainbowmode.onclick = selectedMode;
clearmode.onclick = makeGrid;
sizeSelector.oninput = sizeSelection;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeElement() {
    element = document.createElement('div');
    element.setAttribute('style', `width:${500 / size}px;height:${500 / size}px;background-color:#fefefe;`);
    canvas.appendChild(element);
    element.addEventListener('mouseover', (e) => fillColor(e));
    element.addEventListener('mousedown', (e) => fillColor(e));
}

function makeGrid() {
    elements_count = size * size;
    canvas.innerHTML = "";
    for (let i = 0; i < elements_count; i++) {
        makeElement();
    }
}
function fillColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mode == "color") {
        color = colorpicker.value;
    }
    if (mode == "eraser") {
        color = "#ffffff";
    }
    if (mode == "rainbow") {
        color = getRandomColor();
    }
    e.target.style.background = color;
}

function selectedMode() {
    mode = this.id;
    console.log(mode);
    btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`#${mode}`).classList.add('active');
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sizeSelection() {
    size = this.value;
    document.querySelector('#sizedisplay').textContent = size + " X " + size;
    makeGrid();
}


makeGrid();



