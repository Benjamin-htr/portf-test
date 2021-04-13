function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
	tl.set(".loading-screen", { left: "-100%" });
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
	debug: true,
    transitions: [
    {name: 'opacity-transition',
    async leave(data) {
        pageTransition();
     },
    async enter(data) {
		contentAnimation();
		console.log("enter",data.next.container);
		
    }   
  }],
  /* views: [
    {
        namespace: 'home',
        afterEnter(data) {
            console.log("sz-home");
            timer('.fr');
        }
    },
    {
        namespace: 'home-en',
        afterEnter(data) {
            console.log("sz-home-en");
            timer('.en');
        }
    }
] */
});
/* barba.hooks.afterEnter((data) => {
    updateline()
}); */
console.log('barba');





