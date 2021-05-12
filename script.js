Array.from(document.querySelectorAll(".letter")).forEach(el => {
   el.innerText = randomLetter();
});

function randomLetter(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function myFunction() {
    let element = document.body;
    element.classList.toggle("darkMode");
}




/**
 * Creates Arrows
 * creates a left arrow
 * creates a right arrow
 * appends to slideshow element node passed in
 * @param {node} element
 */
function createArrows(element) {
    // arrow container
    let arrowsContainer = document.createElement('div');
    arrowsContainer.classList.add('slideshow__arrows');

    // left Arrow
    let arrowLeft = document.createElement('i');
    arrowLeft.classList.add('fas');
    arrowLeft.classList.add('fa-angle-left');
    arrowsContainer.appendChild(arrowLeft);

    // right Arrow
    let arrowRight = document.createElement('i');
    arrowRight.classList.add('fas');
    arrowRight.classList.add('fa-angle-right');
    arrowsContainer.appendChild(arrowRight);

    // add to sliderShow
    element.appendChild(arrowsContainer);
}

/**
 * Creates an img elment for each item in images array
 * appends to slideshow element node passed in
 * @param {node} element
 * @param {array} pictures
 */
function createSlides(element, pictures) {
    pictures.forEach(item => {
        let image = new Image();
        image.src = item;
        image.classList.add('slideshow__image');
        element.appendChild(image);
    });
}

/**
 * Create markers that match the amount of images
 * @param {node} element
 * @param {array} pictures
 */
function createMarkers(element, pictures) {
    let markerContainer = document.createElement('div');
    markerContainer.classList.add('slideshow__markers');
    pictures.forEach(item => {
        let dot = document.createElement('div');
        dot.classList.add('slideshow__markers-dot');
        markerContainer.appendChild(dot);
    });
    element.appendChild(markerContainer);
}

/**
 * slideShow will create a slide show based on images
 * first param is the element you want the slide show to apear in of
 * second is an array of pictures you want to use
 * @param {node} element
 * @param {array} pictures
 */
function SlideShow(element, pictures) {

    /**
     * Create all HTML elements for slide show
     */
    createArrows(element);
    createSlides(element, pictures);
    createMarkers(element, pictures);

    /**
     * Get all selectors we will be using
     */
    const s_imageElements = document.querySelectorAll('.slideshow__image');
    const s_markerElements = document.querySelectorAll('.slideshow__markers-dot');
    const s_arrowLeft = document.querySelector('.fa-angle-left');
    const s_arrowRight = document.querySelector('.fa-angle-right');
    const s_dotElements = document.querySelectorAll('.slideshow__markers-dot');

    /**
     * Group of all variables we need for our photo slider
     */
    let active = null;
    let previous = null;
    let next = null;
    let lastIndex = null;
    let isEndOfList = null;
    let isStartOfList = null;

    /**
     * Object of classes we will be writing to elements to set state of slider
     */
    let state = {
        slideShow: {
            active: 'slideshow__image--active',
            previous: 'slideshow__image--previous',
            next: 'slideshow__image--next'
        },
        markers: {
            active: 'slideshow__markers-dot--active'
        },
        arrow: {
            deactivate: 'arrow--deactivate'
        }
    }

    /**
     * sets the list start and end
     * also sets classes on arrow so they show or dont show
     */
    function setListStartEnd() {
        isStartOfList = s_imageElements[0].classList.contains(state.slideShow.active);
        isEndOfList = s_imageElements[lastIndex].classList.contains(state.slideShow.active);

        if (isStartOfList) {
            s_arrowLeft.classList.add(state.arrow.deactivate);
        } else {
            if (s_arrowLeft.classList.contains(state.arrow.deactivate)) {
                s_arrowLeft.classList.remove(state.arrow.deactivate);
            }
        }

        if (isEndOfList) {
            s_arrowRight.classList.add(state.arrow.deactivate);
        } else {
            if (s_arrowRight.classList.contains(state.arrow.deactivate)) {
                s_arrowRight.classList.remove(state.arrow.deactivate);
            }
        }

    }

    /**
     * Setting list defaults such as active, next and previous
     */
    function startListCount() {
        active = 0;
        previous = active - 1;
        next = active + 1;

        s_imageElements[active].classList.add(state.slideShow.active);
        s_imageElements[next].classList.add(state.slideShow.next);
        s_markerElements[active].classList.add(state.markers.active);

        lastIndex = s_imageElements.length - 1;
    }

    startListCount();
    setListStartEnd();

    /**
     * remove states on elements
     */
    function removeState() {

        s_imageElements.forEach(image => {
            let activeElement = image.classList.contains(state.slideShow.active);
            if (activeElement) {
                image.classList.remove(state.slideShow.active);
            }
        });

        s_markerElements.forEach(dot => {
            let activeElement = dot.classList.contains(state.markers.active);
            if (activeElement) {
                dot.classList.remove(state.markers.active);
            }
        });

        if (!isStartOfList) {
            s_imageElements[previous].classList.remove(state.slideShow.previous);
        }

        if (!isEndOfList) {
            s_imageElements[next].classList.remove(state.slideShow.next);
        }
    }

    /**
     * add state on elements
     */
    function addState() {
        s_imageElements[active].classList.add(state.slideShow.active);
        s_markerElements[active].classList.add(state.markers.active);

        // after we set active state we check to see what part of the list we are in
        setListStartEnd();

        if (!isStartOfList) {
            s_imageElements[previous].classList.add(state.slideShow.previous);
        }

        if (!isEndOfList) {
            s_imageElements[next].classList.add(state.slideShow.next);
        }
    }
    function setActiveItem(direction) {
        removeState();
        active = active + direction;
        previous = active - 1;
        next = active + 1;
        addState();
    }

    /** Move left */
    s_arrowLeft.addEventListener('click', function () {
        setListStartEnd();
        if (isStartOfList) { return; }
        setActiveItem(-1);
    });

    /** Move right */
    s_arrowRight.addEventListener('click', function () {
        setListStartEnd();
        if (isEndOfList) { return; }
        setActiveItem(+1)
    });

    /** Using Dot markers choose correct item on list */
    s_dotElements.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            active = index - 1;
            setActiveItem(1);
        })
    });
};

const images = [
    `img/arsenal_12.jpeg`,
    `img/ArsenalStadium1.jpeg`,
    `img/Dani-Ceballos-Arsenal-28-11-2020.jpeg`
];

document.addEventListener("DOMContentLoaded", () => {
    const slideShowElement = document.querySelector('.slideshow');
    SlideShow(slideShowElement, images);
});


function vidPlay() {
    $("#video1").get(0).play();
};
function vidPause() {
    $("#video1").get(0).pause();
};
$(document).ready(function(){
    $("#textToggler").click(function(){
        $(".toggleText").toggle();
    });
});
function toggleImage() {
    $(".hiddenclickimg").toggle();
};
