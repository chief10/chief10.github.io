import CanvasManager from './canvas';

const manager = new CanvasManager();

document.addEventListener("DOMContentLoaded", () => {    
    const grabTextButton = document.getElementById('textButton');
    const graphArea      = document.getElementById('graph-area');
    const boardArea      = document.createElement('div');
    boardArea.id = "board";
    
    graphArea.appendChild(boardArea)
    
    const mainTextArea = document.createElement('textarea')
    
    mainTextArea.id = "mainTextArea";

    graphArea.appendChild(
        mainTextArea 
    );
     

    document.getElementById('mainTextArea').addEventListener("input", (e) => {
        console.log("My inpu t", e);
        manager.initCanvas(e.target.value);
    })
})
