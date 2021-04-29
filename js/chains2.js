
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

var w = window.innerWidth;
var h = window.innerHeight; 

console.log(w, h);

//setup p5.js :
function setup() {
    //création du canvas avec p5.js :
    canvas = createCanvas(w, h);
    canvas.parent()

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


    var left = 0;
    var right = vwp.width-50;

    let topVal = 0;

    var longueur = right - left;
    // add bodies

    group = Body.nextGroup(true);
    var ropeC = Composites.stack(left, topVal, 13, 1, 10, 10, function(x, y) {
        return Bodies.rectangle(left, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
    });



    Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
    Composite.add(ropeC, Constraint.create({
        bodyB: ropeC.bodies[0],
        pointB: { x: -20, y: 0 },
        pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
        stiffness: 1,
        length : 0,
    }));


    var ropeD = Composites.stack(right, topVal, 13, 1, 10, 10, function(x, y) {
        return Bodies.rectangle(right, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
    });
    var first= 'first';
    /* ropeD.bodies[0].collisionFilter.mask = first;
    ropeD.bodies[1].collisionFilter.mask = first; */
    

    Composites.chain(ropeD, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
    Composite.add(ropeD, Constraint.create({
        bodyB: ropeD.bodies[0],
        pointB: { x: -20, y: 0 },
        pointA: { x: ropeD.bodies[0].position.x, y: ropeD.bodies[0].position.y },
        stiffness: 1,
        length : 0,
    }));

    var rect = Bodies.rectangle((vwp.width/2), 150, longueur, 70, { collisionFilter: { group: group }, 
        /* isStatic : true, */
        render: {   fillStyle: "transparent", strokeStyle: "white", lineWidth : 1,
                    
                },
    });
    bodies = rect;


    var constraintLeft = Constraint.create({ 
        bodyB: rect,
        pointB: { x: -(longueur/2), y: -10 },
        bodyA : ropeC.bodies[12],
        pointA: {x : 20, y : 0},
        stiffness: 1,
        length : 0,
    });

    var constraintRight = Constraint.create({ 
        bodyB: rect,
        pointB: { x: (longueur/2), y: -10 },
        bodyA : ropeD.bodies[12],
        pointA: {x : 20, y : 0},
        stiffness: 1,
        length : 0,
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
                    visible: true
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


}

function draw() {
    
    /* background("#242424");
    strokeWeight(0); */
    
    // set cursor
    /* fill("#0EFF00");
    circle(mouseX, mouseY, 40); */


    var circleL = bodies;
    var pos = circleL.position;
    var r = circleL.circleRadius;
    var angle = circleL.angle;

    /* console.log(circleL); */
    
    var fontSize = 38;
    
    textSize(fontSize);
  
    var txt1 = "Welcome"
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
    fill(255);
    textAlign(CENTER);
    text(txt1, 0, fontSize / 2);
    
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, false);
}

/* function reclick() {
    document.querySelector(".active").click();
    console.log("reclick");
}

 */