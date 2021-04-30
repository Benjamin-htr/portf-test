function initSign() {
    if (document.querySelector(".sign-container")) {
        /* window.location.reload(); */
        reset();
        setup();
        draw();
        windowResized();
        console.log("sign-container exist !");
    }
}

var scripList = [/* "./js/libs/matter.min.js",
                "js/libs/render.js",
                "js/libs/p5.min.js", */
                "./js/chains2.js"]

function reloadwindow() {
    value = document.querySelector("main").getAttribute("data-barba-namespace");
    console.log("value : ", value);
    if (value === "home") {
        window.location.reload();
    }
}
function reloadScript(next) {
    let script;
    let body = document.querySelector("body");
    for (let i = 0; i < scripList.length; i++) {
        script = document.createElement('script');
        script.src = scripList[i];
        /* next.container.appendChild(script); */
        body.appendChild(script);

    };
};
function clearScript(current) {
    var scripts = current.container.querySelectorAll("script");
    console.log("scripts : ",scripts);
    scripts.forEach(function(item) {
        item.remove();
    });
};



function contentAnimation() {
	console.log('coucou')
  var tl = gsap.timeline();
  tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.2, delay: 0.1 });
  tl.call(reloadwindow);
}

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.set(".load-container", {display : "initial"});
    tl.set(".loading-screen", { top: "-100%" });
    tl.to(".loading-screen", {
        duration: 1.2,
        height: "100%",
        top: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        height: "100%",
        top: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".load-container", {display : "none"});
    
    
	
}

barba.init({
    
    requestError: (trigger, action, url, response) => {
      // go to a custom 404 page if the user click on a link that return a 404 response status
      if (response.status && response.status === 404) {
        console.log('error')
      }

      // prevent Barba from redirecting the user to the requested URL
      // this is equivalent to e.preventDefault() in this context
      return false;
    },
    /* debug: true,
	logLevel: 'error', */
	sync: true,
	debug: true,
    transitions: [
    {name: 'opacity-transition',
    async leave(data) {
		const done = this.async();
        pageTransition();
        await delay(1000);
        done();

        
     },
    async enter(data) {
		contentAnimation();
        console.log("enter",data.next.container);
        updateline();
        

    }   
  }],
  
  views: [
    {
        namespace: 'home',
        afterEnter(data) {
            console.log("sz-home");
            /* timer('.fr'); */
           
        },
    
    },
    {
        namespace: 'home-en',
        afterEnter(data) {
            console.log("sz-home-en");
            timer('.en');
        },
    }
]
});
barba.hooks.afterEnter((data) => {
    updateline()
});
console.log('barba');





