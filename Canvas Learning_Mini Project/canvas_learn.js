//[1.]
var canvas = document.querySelector('canvas'); 
    /*
    -document object: we are searching through whole html 
    -query select a specific ele, in our case an html elmement
    of 'canvas'.
        -once html doc is found with where 'canvas' keyword is used
        the actual canvas object can be hover-selected */


//***TO RESIZE THE CANVAS (filling screen)***//
canvas.width = window.innerWidth; 
        //almost expanding to full width
canvas.height = window.innerHeight; //almsot whole window height selected
        //now ^ the basically the whole window is the canvas

//[2.] make 2D
var c = canvas.getContext('2d'); 
    //where 'c' always equals "content"
    //within c, you can draw things in 2D (as it's a 2D space)

// [3.] Drawing on canvas

//                 /*Create RECTANGLES */ 
// c.fillStyle = 'rgba(255,0,0,0.1)'; //semi-transp rect 
//                                    // for only this rect above
// c.fillRect(100, 100, 100, 100); //x,y,wid,ht
//     //0,0 coord plane for default canvas: UPPER LEFT (y inc down, x inc right)
//     //Here: in this 2D canvas, create a black rect

//     c.fillStyle = 'rgba(0, 255,0,0.1)'; //semi-transp rect
// c.fillRect(400, 100, 100, 100); 

// c.fillStyle = 'rgba(0, 0,255,0.1)'; 
// c.fillRect(300, 300, 100, 100); 

// console.log(canvas); //display the canvas 
//     //ON CONSOLE: should display dimensions too



//                     /*Creating LINES */
// c.beginPath(); //start a new path to start drawing
// c.moveTo(50,300); //where to start our line from (x,y) coord
// c.lineTo(300,100); //where to end at 
// c.strokeStyle = "#fa34a3";//ADD COLOR TO LINE
// c.stroke();//visible after we call a stroke method


//                 /*Create CIRCLES */
// for(let i = 0; i< 5; i++) {
//     let x = Math.random() * window.innerWidth; 
// //allows from 0-full width of screen (won't go out of bounds)
//     let y = Math.random() * window.innerHeight;
//     c.beginPath(); //ensures multiple drawings don't connect
//    // c.arc(300,300,38, 0,Math.PI*2, false); //param: x,y,radius, start angle (radians = what angle to star arc),
//                     //end anngle (how long to have angle draw go on for), 
//                     //drawCounterClockwise? (t/f) 
//     c.arc(x,y, 30,0, Math.PI*2, false);
//     c.strokeStyle = 'orange';
//     c.stroke();//to fill in outline, need stroke 
// }

                 /* crete ACTION LISTENERS:

             - events (functions) that only occur
                when a certain thing triggers commencing
                    (eg. clicking with mouse, etc)
                        */
var mouse = {
    x: undefined,
    y: undefined
} //identify position at time mouse is on canvas
//useful bc this variable will be our event's x/y trigger

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#ffaa33','#99ffaaa','#00ff00','#4411aa','#ff1100'
]; //array storing all our circle colors 
console.log();

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
    //args should be what to monitor: here, we monitor
    //when mouse moves

    //for function arguments like Circle(), its easier to 
    //just refer to an anon function w/circle's function 
    //inside this param

}) /*= whenever mouse moves, this event is called, triggering
    this anon function to start. Hence why per mouse
    move in canvas, an iteraton rapdily increases. If we 
    stop, iteration pauses.*/

            /* create an OBJECT (to be used to animate)*/

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}) //create an event to ensure making
//canvas size responsive to browser's resizing 

function Circle(x,y, dx,dy, radius) { 
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius; //all these 2 make diff obj similar properties
    this.minRadius = minRadius; //so it can be shurnk down to orig radius

    this.color = colorArray[Math.floor(Math.random()*colorArray.length)]; 
        //each color of a circle = 1 rand ele from colorArray
        // based on random * length of it Math.floor 
        //rounding casting to an int val

    this.draw = function () { 
        c.beginPath();
        c.arc(this.x,this.y, this.radius,0, Math.PI*2, false);
        //c.strokeStyle = 'blue';
        c.stroke(); //creates outline of shape
        c.fillStyle = this.color;          
        c.fill(); //would make them look filled up with black
    } /* =create cirlce*/
    
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { //bounce from circle's curve
            this.dx = -this.dx; //if hitting end of window, switch veloc 
                        //to neg, to go backwards (to left)
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) { //reminder: innerHeight is bottom of window
            this.dy = -this.dy; 
        }
        this.x += this.dx;    //change it up so that new shape is made @dif pos
                //x+=1 means "move" 1px per frame (right to left)
                //(inc val to inc veloc)
        this.y += this.dy;

        //interactivity occurs here:
        if (mouse.x - this.x <50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
         // if distance of mouse cursor's pos to 
        //any bubble pos is < 50 px, increase it.
            //NOTE: having <50 distance for above/below/L/R,
            //ensures it isolates to only grow on one bubble
            //at a time the cursor is on  

            //NOTE2: > -50 bc we want to say while cursor is in 
            //canvas itself can this action happen ONLY.
            if (this.radius < maxRadius){
                this.radius +=1; 
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -=1; 
            //revert back to each indvidual's unique 
            //radius size
        }
        this.draw();
    } /* = move circle randomly */
}

//let circle = new Circle(200,200, 3,3,30); //create an Object



//replacing all circles in new positions so that 
//always circles will be regnerating in a new positoin
//+ Create 50 randomly generated positioned circles
var circleArray = []; //store all circles created


function init() {
    circleArray = [];
    for(let i = 0; i< 300; i++) {
        var radius = Math.random()*3 +1; //1-4 random number
        //this makes circles have various sizes
        var x = Math.random() * (innerWidth - radius * 2) + radius; //random pos in respect
                                        //to total x range possible
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5); //veloc (will default always
                                        //the "- 0.5" ensures +/- 
                                        //fluctating veloc
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x,y,dx,dy,radius)); 
    }
}


                /*ANIMATE objects moving randomly (the 'main' function) */
function animate() {
//will request animation frame, which uses that func's arg,
//which will create a recurisve loop 
    requestAnimationFrame(animate); 
    c.clearRect(0,0,innerWidth,innerHeight); 
    //clears entire canvas each time (of total x1,y1 to x2,y2)
        //this allows an illusion of moving

    for(let i = 0; i< circleArray.length; i++) { //size =length of array prior
        circleArray[i].update(); 
    } //PERFORM  circle update 'movement' function, using
    //the create cicle function wihtin it. But applying it
    //for all circles in circle array
}
animate();
init();

                 