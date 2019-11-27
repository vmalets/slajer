let slideItems = document.querySelectorAll('.slide');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicator');
let pauseBtn = document.querySelector('#pause');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');
let playbackStatus = true;
let slideLenght = slideItems.length;
let currentSlide = 0;
let carouselInterval = 3000;
let slideInterval;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';


document.querySelector('.controls').style.display = 'flex';
indContainer.style.display = 'flex';

gotonSlide = (n) => {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slideLenght) % slideLenght;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
};

gotoPrevSlide = () => {
    gotonSlide(currentSlide - 1);
};

gotoNextSlide = () => {
    gotonSlide(currentSlide + 1);
};


pauseSlideShow = () => {
    if (playbackStatus) {
        clearInterval(slideInterval);
        pauseBtn.className = 'control pause fas fa-play';
        playbackStatus = !playbackStatus;
    }
};

playSlideShow = () => {
    slideInterval = setInterval(gotoNextSlide, carouselInterval);
    pauseBtn.className = 'control pause fas fa-pause';
    playbackStatus = !playbackStatus;
};

clickPausePlayBtn = () => {
    if (playbackStatus) pauseSlideShow();
    else playSlideShow();
};

clickPrevPlayBtn = () => {
    pauseSlideShow();
    gotoPrevSlide();
};

clickNextPlayBtn = () => {
    pauseSlideShow();
    gotoNextSlide();

};

pauseBtn.addEventListener('click', clickPausePlayBtn);
prevBtn.addEventListener('click', clickPrevPlayBtn);
nextBtn.addEventListener('click', clickNextPlayBtn);

clickIndicatorBtn = (e) => {
    let target = e.target;

    if (target.classList.contains('indicator')) {
        pauseSlideShow();
        gotonSlide(+target.getAttribute('data-slide-to'));
    }
};

indContainer.addEventListener('click', clickIndicatorBtn);

pressKeyControl = (e) => {
    if (e.key === LEFT_ARROW) {
        pauseSlideShow();
        clickPrevPlayBtn();
    }
    if (e.key === RIGHT_ARROW) {
        pauseSlideShow();
        clickNextPlayBtn();
    }
    if (e.key === SPACE) {
        if (playbackStatus) pauseSlideShow();
        else clickPausePlayBtn();
    }
};

document.addEventListener('keydown', pressKeyControl);

slideInterval = setInterval(gotoNextSlide, carouselInterval);