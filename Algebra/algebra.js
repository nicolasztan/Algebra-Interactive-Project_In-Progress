//once html doc is found with where 'canvas' keyword is used, the actual canvas object can be hover-selected.
var canvas = document.querySelector('canvas'); 

//spread canvas to decently full screen
// canvas.width = window.innerWidth - 300; 
// canvas.height = window.innerHeight -200;

//set content as 'c', and make it 2d space you can create entities within and event listeners if needed
var c = canvas.getContext('2d'); 


function draw(){
    window.onload = function() {
        var canvas = document.getElementById("myCanvas"); //find keyword mycavnas
        var ctx = canvas.getContext("2d");                  //make 2d
        var img = document.getElementById("scream");
        ctx.drawImage(img, 10, 10);

    };
    //use the Form text input to be the input to use on the context's canvas
    console.log(canvas.width, canvas.height);

    var x1 = document.getElementById("start_x").value;
    var x2 = document.getElementById("end_x").value; 
    var y1 = document.getElementById("start_y").value;
    var y2 = document.getElementById("end_y").value;

    

    //actually draw it out on the canvas
    c.beginPath();
    c.translate(0, canvas.height); /* move  the canvas default layout origin (0,0) from top left to bot left of canvas */
    
    c.moveTo(x1,y1*-50); 
    c.scale(1, -1); /* invert the y-axis using scale()*/
    c.lineTo(x2*50,y2*50);    
    c.strokeStyle = "#fa34a3";//ADD COLOR TO LINE
    c.stroke(); /* connec the dots from x1,y1 coord to x2,y2 coord*/

}  

function reset(){
    c.clearRect(0,0, canvas.width, canvas.height);
}
