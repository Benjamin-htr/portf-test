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
    transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
        
      });
    }
  }],
  views: [
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
]
});
barba.hooks.afterEnter((data) => {
    updateline()
});
console.log('barba');





