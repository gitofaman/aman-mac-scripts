var barLine = document.querySelector('.layout352_progress-bar-4');

if(!!barLine) {
    var barLineHidden = true;
    barLine.style.display = 'none'
    window.addEventListener('scroll', ()=>{
        var scrolledPos = -1 * document.body.getBoundingClientRect().y
        if(scrolledPos>300 && barLineHidden) {
            barLine.style.display = 'block'
            barLineHidden = false;
        } else if (scrolledPos<240 && !barLineHidden) {
            barLine.style.display = 'none'
            barLineHidden = true;
        } else {
            return;
        }
    })
}


  // NAVBAR SHRINK ON SCROLL SCRIPT
  var navModified = false;
var navbar = document.querySelector('.f-navbar')

const modifyMyNav = () => {
    var scrolledPos = -1 * document.body.getBoundingClientRect().y
    if(scrolledPos>130 && !navModified) {
				modifyToScrolledNav()
    } else if (scrolledPos<70 && navModified) {
				modifyToRegularNav()
    } else {
        return;
    }
}

const modifyToScrolledNav = () => {
    navbar.classList.add('is--modified-nav')
    navModified = true;
}

const modifyToRegularNav = () => {
    navbar.classList.remove('is--modified-nav')
    navModified = false;
}

modifyMyNav()

window.addEventListener('scroll', modifyMyNav)
