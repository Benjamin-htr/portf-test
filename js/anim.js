function initSign() {
    if (document.querySelector(".sign-container")) {
        document.querySelector(".active").click();
        console.log("sign-container exist !");
    }
}

function contentAnimation() {
	console.log('coucou')
  var tl = gsap.timeline();
  tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.2, delay: 0.1 });
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
	/* tl.call(contentAnimation); */
	
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
        initSign();
		
    }   
  }],
  
  views: [
    {
        namespace: 'home',
        afterEnter(data) {
            console.log("sz-home");
            /* timer('.fr'); */
            
            
          
            
            
        }
    },
    {
        namespace: 'home-en',
        afterEnter(data) {
            console.log("sz-home-en");
            timer('.en');
        }
    }
]
});
barba.hooks.afterEnter((data) => {
    updateline()
});
console.log('barba');





