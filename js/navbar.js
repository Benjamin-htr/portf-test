console.log("salut");
addEventListener("load", function () {
    if (window.matchMedia("(min-width: 600px)").matches) {
        document.querySelector('header').style.display = "inline";
    }
    var nav = document.querySelectorAll('header nav');
    for (var i = 0; i < nav.length; ++i) {
        var item = nav[i]; 
        let line = document.createElement("div");
        line.classList.add('line');
        item.appendChild(line);
    }

    var active = document.querySelectorAll('.active');
    var pos = 0;
    var wid = 0;

    lines = document.querySelectorAll('.line');


    for (var i = 0; i < active.length; ++i) {
        var item = active[i];
        pos = item.getBoundingClientRect().left;
        console.log('pos change', pos)
        wid = item.offsetWidth;
        lines.item(i).style.width = wid+'px';
        lines.item(i).style.left = pos+'px';
    }
    updateline()


    let spans2 = document.querySelectorAll('header .pages_ch a')
    let nav2 = document.querySelector('.pages_ch')
    let line2 = document.querySelector('header .pages_ch .line')

    
    
    spans2.forEach(item => {
        item.addEventListener('click', event => {
            if(!item.classList.contains('active') && !nav2.classList.contains('animate')) {
                pos = document.querySelector('header .pages_ch .active').getBoundingClientRect().left;
                wid = document.querySelector('header .pages_ch .active').offsetWidth;
            
                nav2.classList.add('animate');
            
                var _this = item;
            
                document.querySelector('header .pages_ch .active').classList.remove('active');
            
                position = item.getBoundingClientRect().left;
                width = item.offsetWidth;
            
                if(position >= pos) {
                    var anim1 = line2.animate([
                        {width : ((position - pos) + width)+'px'}
                        
                    ], {
                        duration : 300
                    }
                    );
                    anim1.onfinish = function () {
                        line2.style.width = ((position - pos) + width)+'px';
                        
                        var anim2 = line2.animate([
                            {width: width+'px', 
                            left: position+'px'}
                            
                        ], {
                            duration : 150
                        }
                        );
                        anim2.onfinish = function() {
                            line2.style.width = width+'px'; 
                            line2.style.left = position+'px'; 
                            nav2.classList.remove('animate');
                            item.classList.add('active');
                            pos = position;
                            wid = width;
                        };
                    };
                } 
                else {
                    var anim1 = line2.animate([
                        {left : position+'px',
                        width : ((pos - position) + wid)+'px'}
                        
                    ], {
                        duration : 300
                    }
                    );
                    anim1.onfinish = function () {
                        line2.style.left = position+'px';
                        line2.style.width = ((pos - position) + wid)+'px';
                        
                        var anim2 = line2.animate([
                            {width: width+'px'}
                            
                        ], {
                            duration : 150
                        }
                        );
                        anim2.onfinish = function() {
                            line2.style.width = width+'px';  
                            nav2.classList.remove('animate');
                            item.classList.add('active');
                            pos = position;
                            wid = width;
                        };
                    };
                }
            }
        });
    });

    let spans1 = document.querySelectorAll('header .languages_ch a')
    let nav1 = document.querySelector('.languages_ch')
    let line1 = document.querySelector('header .languages_ch .line')

    
    spans1.forEach(item => {
        item.addEventListener('click', event => {
            if(!item.classList.contains('active') && !nav1.classList.contains('animate')) {
                pos = document.querySelector('header .languages_ch .active').getBoundingClientRect().left;
                wid = document.querySelector('header .languages_ch .active').offsetWidth;
            
                nav1.classList.add('animate');
            
                var _this = item;
            
                document.querySelector('header .languages_ch .active').classList.remove('active');
            
                position = item.getBoundingClientRect().left;
                width = item.offsetWidth;
            
                if(position >= pos) {
                    var anim1 = line1.animate([
                        {width : ((position - pos) + width)+'px'}
                        
                    ], {
                        duration : 300
                    }
                    );
                    anim1.onfinish = function () {
                        line1.style.width = ((position - pos) + width)+'px';
                        
                        var anim2 = line1.animate([
                            {width: width+'px', 
                            left: position+'px'}
                            
                        ], {
                            duration : 150
                        }
                        );
                        anim2.onfinish = function() {
                            line1.style.width = width+'px'; 
                            line1.style.left = position+'px'; 
                            nav1.classList.remove('animate');
                            item.classList.add('active');
                            pos = position;
                            wid = width;
                        };
                    };
                } 
                else {
                    var anim1 = line1.animate([
                        {left : position+'px',
                        width : ((pos - position) + wid)+'px'}
                        
                    ], {
                        duration : 300
                    }
                    );
                    anim1.onfinish = function () {
                        line1.style.left = position+'px';
                        line1.style.width = ((pos - position) + wid)+'px';
                        
                        var anim2 = line1.animate([
                            {width: width+'px'}
                            
                        ], {
                            duration : 150
                        }
                        );
                        anim2.onfinish = function() {
                            line1.style.width = width+'px';  
                            nav1.classList.remove('animate');
                            item.classList.add('active');
                            pos = position;
                            wid = width;
                        };
                    };
                }
            }
        });
    });
    window.addEventListener("resize", function() {
        updateline();
        
        if (window.matchMedia("(max-width: 600px)").matches) {
            
            if (document.querySelector('header .menu_begin') === null) {
                addImg();
                
                
            }
            
            
        }
        if (window.matchMedia("(min-width: 600px)").matches) {
            if (document.querySelector('header .menu_begin') !== null) {
                document.querySelector('header .menu_begin').remove();
                document.querySelector('header').style.display = "inline";
                
                
            }
            
            
        }
    });
    /* if (window.matchMedia("(max-width: 600px)").matches) { */
        
        if (document.querySelector('header .menu_begin') === null) {
            addImg();
            let burger = document.querySelector('.btn-burger');
            burger.addEventListener('click', () => {
                console.log('click2')
                let bool = burger.classList.contains('active');
                burger.classList.toggle('active');
                let header = document.querySelector('header');
                /* bool ? header.style.display = "none" : header.style.display = "flex"; */
                header.classList.toggle("header-active");
                
                
                if (!bool) {
                    updateline();
                }
                


            })
        }
    
    
});

function addImg() {
    if (window.matchMedia("(max-width: 600px)").matches && (document.querySelector('header .menu_begin') === null)) {
        value = document.querySelector("main").getAttribute("data-barba-namespace");

        var imgPath = "../../assets/logo.svg";

        if (value ==="home" || value === "home-en") {
            imgPath = './assets/logo.svg';
        }
        
        let header = document.querySelector('header');
        let div = document.createElement('div');
        div.classList.add('menu_begin');
        let logo = document.createElement('img');
        logo.classList.add('logo_menu');
        logo.src = imgPath;
        div.appendChild(logo);
        let name = document.createElement('div');
        name.classList.add('name');
        name.textContent = "Benjamin";
        div.appendChild(name);

        let statut = document.createElement("div");
        statut.textContent = "Développeur web / logiciel";
        div.appendChild(statut);


        header.insertBefore(div, header.firstChild);
        let burger = document.querySelector('.btn-burger');
        let bool = burger.classList.contains('active');
        /* !bool ? header.style.display = "none" : header.style.display = "flex"; */
    

    }
    
}

function updateline() {
    let nav1 = document.querySelector('.languages_ch')
    let line1 = document.querySelector('header .languages_ch .line')
    let nav2 = document.querySelector('.pages_ch')
    let line2 = document.querySelector('header .pages_ch .line')
    if (!nav1.classList.contains('animate') && !nav2.classList.contains('animate')) {
        let active = document.querySelector('header .languages_ch .active');
        position = active.getBoundingClientRect().left;
        width = active.offsetWidth;
        //console.log('upd pos1',position)
        line1.style.left = position+'px';
        line1.style.width = width+'px';
    
        active = document.querySelector('header .pages_ch .active');
        position = active.getBoundingClientRect().left;
        width = active.offsetWidth;
        //console.log('upd pos2',position)
        line2.style.left = position+'px';
        line2.style.width = width+'px';
        console.log('update')
    };
}





