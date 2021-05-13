document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var text;
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(container, i, fnCallback) {
      // chekc if text isn't finished yet
      text = document.querySelector(container).dataset.text;
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector(container).innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(container, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
      return true;

    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0)
      }
      
    }
    // start the text animation
    /* StartTextAnimation(0); */

    
    typeWriter(".present .line1", 0, function() {
        console.log("fini")
        document.querySelector(".present .line1 span").style.borderRight = "none";
        typeWriter(".present .line2", 0);
    });
    

    TagCanvas.Start('myCanvas', 'tags', 
    {
      initial : 0.0025,
      clickToFront : 500,
      reverse : false,
      minSpeed : 0.005,
      wheelZoom : false,
      textHeight : 42,
      textColour: '#A2D5C6',
      outlineMethod : "none",
      depth: 0.8,
      maxSpeed: 0.03,
    });
    
  });