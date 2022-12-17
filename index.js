const slides = document.querySelectorAll(".slide");
const circleBackground = document.querySelector(".circle-background");

const html = document.documentElement;

const MIN_CIRCLE_WIDTH = 75;
const MAX_CIRCLE_WIDTH = 200;

let currSlide = 0;
let prevScrollTop = 0;
let scrollTimeout = null;

const updateSlideSeen = () => {
  let slide;
  if (html.scrollTop > prevScrollTop) {
    slide = Math.ceil(html.scrollTop / slides[0].offsetHeight);
  } else if (html.scrollTop < prevScrollTop) {
    slide = Math.floor(html.scrollTop / slides[0].offsetHeight);
  } else return;
  prevScrollTop = html.scrollTop;
  if (slide !== currSlide) {
    currSlide = slide;
    scrollToCurrSlide();
  }
};

const setSlideSeen = () => {
  slides[currSlide].classList.add("seen");
};

const scrollToCurrSlide = () => {
  window.scrollTo({
    top: slides[0].offsetHeight * currSlide,
    behavior: "smooth",
  });
};

const random = (min, max) => min + Math.random() * (max - min);

const initializeCircleBackground = () => {
  for (let i = 0; i < 10; i++) {
    const circle = document.createElement("div");
    circle.className = "circle-background__circle";
    const circleWidth = random(MIN_CIRCLE_WIDTH, MAX_CIRCLE_WIDTH);
    circle.style.width = circleWidth + "px";
    const left = (Math.random() * circleBackground.clientWidth) / 2;
    const top = Math.random() * circleBackground.clientHeight;
    circle.style.left = left + "px";
    circle.style.bottom = top + "px";
    circle.style.rotate = Math.random() * 360 + "deg";
    circleBackground.appendChild(circle);
  }
};

const init = () => {
  setSlideSeen();
  initializeCircleBackground();
};

document.addEventListener("scroll", () => {
  updateSlideSeen();
  setSlideSeen();
});

init();
