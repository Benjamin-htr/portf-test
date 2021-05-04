
// module aliases
var Engine = Matter.Engine,
        /* Render = require('./render'), */
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Common = Matter.Common,
        Bodies = Matter.Bodies;

var bodies;
var message;

var w = window.innerWidth;
var h = window.innerHeight; 

console.log(w, h);

//setup p5.js :
function setup() {
    //création du canvas avec p5.js :
    canvas = createCanvas(w, h);
    canvas.parent()

    message = document.querySelector(".sign-container").dataset.mess;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var vwp = canvas.elt.getBoundingClientRect();

    var render = Render.create({
        element: document.body,
        canvas : canvas.elt,
        engine: engine,
        options: {
            width: w,
            height: h,
            wireframes: false
            /* showAngleIndicator: true,
            showCollisions: true,
            showVelocity: true */
        }
    });

    var ratio = Render.setPixelRatio(render, 'auto');
    console.log('ratio : ', ratio);

    //pixel ratio pour p5.js :
    pixelDensity(ratio);

    Render.run(render);
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var chainsColor = '#918369';
    var constraintStyle = {
        visible: false,
        /* lineWidth: 1,
        strokeStyle: 'black', */
    }

    var left;
    var right;
    var topVal;
    var longueur;
    if (w < 600) {

        left = 0;
        right = vwp.width-50;

        topVal = -50;

        longueur = right - left;
        console.log("left : ", left,"right : ", right, "topval : ", topVal,"longueur : ", longueur)

        number = 15;
        nb2 = number+2;

        longPartRope = (vwp.height)/number;
        largPartRope = longPartRope/3;
    }
    else if (w >= 600 ) {
        console.log('ici else');

        left = w/4;
        right = w-left;

        topVal = 0;
        longueur = right - left;
        console.log("left : ", left,"right : ", right, "topval : ", topVal,"longueur : ", longueur)

        number = 15;
        nb2=number;

        longPartRope = (vwp.height)/number;
        largPartRope = longPartRope/3;
    }
    


    
    // add bodies
    group = Body.nextGroup(true);
    var ropeC = Composites.stack(left, topVal, number, 1, 10, 10, function(x, y) {
        return Bodies.rectangle(left, y, longPartRope, 15, { collisionFilter: { group: group }, chamfer: 5, 
            render: {   fillStyle: chainsColor, strokeStyle: "transparent", lineWidth : 1}
        , });
    });



    Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0, render: constraintStyle});
    Composite.add(ropeC, Constraint.create({
        bodyB: ropeC.bodies[0],
        pointB: { x: -longPartRope/3, y: 0 },
        pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
        stiffness: 1,
        length : 0,
    
    }));

    
    var ropeD = Composites.stack(right, topVal, nb2, 1, 10, 10, function(x, y) {
        return Bodies.rectangle(right, y, longPartRope, 15, { collisionFilter: { group: group }, chamfer: 5,
            render: {   fillStyle: chainsColor, strokeStyle: "transparent", lineWidth : 1} 
        });
    });
    var first= 'first';
    /* ropeD.bodies[0].collisionFilter.mask = first;
    ropeD.bodies[1].collisionFilter.mask = first; */
    

    Composites.chain(ropeD, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0, render: constraintStyle });
    Composite.add(ropeD, Constraint.create({
        bodyB: ropeD.bodies[0],
        pointB: { x: -longPartRope/3, y: 0 },
        pointA: { x: ropeD.bodies[0].position.x, y: ropeD.bodies[0].position.y },
        stiffness: 1,
        length : 0,
    }));

    var rect = Bodies.rectangle((vwp.width/2), 150, longueur, 80, { collisionFilter: { group: group }, chamfer: 2.5, 
        /* isStatic : true, */
        render: {   fillStyle: "#635f5f", strokeStyle: "black", lineWidth : 0.7,
                    
                },
    });
    bodies = rect;
    console.log("bodies setup : ", rect);

    var constraintLeft = Constraint.create({ 
        bodyB: rect,
        pointB: { x: -(longueur/2), y: -10 },
        bodyA : ropeC.bodies[number-1],
        pointA: {x : longPartRope/3, y : 0},
        stiffness: 1,
        length : 0,
        /* render: constraintStyle */
    });

    var constraintRight = Constraint.create({ 
        bodyB: rect,
        pointB: { x: (longueur/2), y: -10 },
        bodyA : ropeD.bodies[nb2-1],
        pointA: {x : longPartRope/3, y : 0},
        stiffness: 1,
        length : 0,
        /* render: constraintStyle */
    });



    Composite.add(world, [
        ropeC,
        ropeD,
        rect,
        constraintLeft,
        constraintRight,
    ]);

    // add mouse control
    if (width > 600) {
        var mouse = Mouse.create(render.canvas.elt),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    /* visible: true */
                    strokeStyle: "#077b8a"
                }
            }
        });
        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
        mouseConstraint.collisionFilter.mask = group;
        mouse.pixelRatio = 1;

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;
    }
    

    // fit the render viewport to the scene
    /*  Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 700, y:700  }
    });  */

    var myCanvas = document.querySelector(".p5Canvas");
    console.log("canvaaaa : ", myCanvas)
    myCanvas.remove();
    var container = document.querySelector('.sign-container');
    container.appendChild(myCanvas);
    frameRate(60);
   
    
}

function draw() {
    
    /* background("#242424");
    strokeWeight(0); */
    
    // set cursor
    /* fill("#0EFF00");
    circle(mouseX, mouseY, 40); */

    var test = document.querySelector(".active");
    /* console.log("bodies draw : ", bodies); */

    var circleL = bodies;
    var pos = circleL.position;
    var r = circleL.circleRadius;
    var angle = circleL.angle;

    /* console.log(circleL); */
    
    var fontSize = 46;
    
    textSize(fontSize);
  
    textFont('Arial');
    
    var txt1 = message;
    var wordWith = textWidth(txt1);
        
    push();
    // console.log(pos.x,pos.y);
    translate(pos.x, pos.y);
    rotate(angle);
    
    // set rectangle in background, change fill to solid color to see it
    /* rectMode(CENTER);
    fill(255, 0, 0, 0);
    rect(0, 0, wordWith, fontSize);   */   
  
    // set text
    fill(162, 213, 198);
    textAlign(CENTER, BOTTOM);
    text(txt1, 0, fontSize / 2);
    
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
}

function reclick() {
    document.querySelector(".active").click();
    console.log("reclick");
}



 function reset() {
    var myCanvastoSuppr = document.querySelector(".p5Canvas");
    if(myCanvastoSuppr) {
        myCanvastoSuppr.remove();
    }
 }
