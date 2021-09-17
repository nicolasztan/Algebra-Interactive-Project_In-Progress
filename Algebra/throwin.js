//once html doc is found with where 'canvas' keyword is used, the actual canvas object can be hover-selected.
var canvas = document.querySelector('canvas'); 

//spread canvas to decently full screen
// canvas.width = window.innerWidth - 300; 
// canvas.height = window.innerHeight -200;

//set content as 'c', and make it 2d space you can create entities within and event listeners if needed
var c = canvas.getContext('2d'); 

function draw(){
    window.onload = function() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var img = document.getElementById("scream");
        ctx.drawImage(img, 10, 10);
    };
    //use the Form text input to be the input to use on the context's canvas
  
    //var x1 = document.getElementById("start_x").value; 
    x1 = 0;
    x2 = 10; //asssuming a fixed graph of 0-10, it would make it extremely easy to find the 'b' (y-interecept), which is at x0 = 0
    /*Side Note: Can alternatively have done ".getElementByName if I used name = val rather than id = val" */
    //var x2 = document.getElementById("start_y").value;
    var y1 = document.getElementsByName("end_x").value;
    var b = y1;
    var y2 = document.getElementsByName("end_y").value;

    //actually draw it out on the canvas
    c.beginPath();
    c.translate(0, canvas.height); /* move  the canvas default layout origin (0,0) from top left to bot left of canvas */
    
    c.moveTo(x1,x2); 
    c.scale(1, -1); /* invert the y-axis using scale()*/
    c.lineTo(y1,y2);
    c.strokeStyle = "#fa34a3";//ADD COLOR TO LINE
    c.stroke(); /* connec the dots from x1,y1 coord to x2,y2 coord*/

//     var m = parseInt((y2-y1)/(x2-x1)); 
//     /* parseInt specifically uses a string and int casts it*/
    
//     result = "Y = ${m}X + ${b}";
//     document.getElementsByName('equation')[0].value= result;
//    // alert("Equation is Y = ${m} * x + ${y1}"); 
    /* write onto the html document this line. ${val} is a tagged template, similar to fstring substitutions in python */

}  

function reset(){
    c.clearRect(0,0, canvas.width, canvas.height);
}
