'use strict';

///////////////////////////////////////
// selected elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const headerSection = document.querySelector('.header');

// $(window).on('unload', function () {
//   $(window).scrollTop(0);
// });

//LEARN- MORE - smooth button scrolling-------------------------------------------------------------------------
buttonScrollTo.addEventListener('click', function () {
  headerSection.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching stratergy
  if (e.target.classList.contains('nav__link')) {
    const idOfSections = e.target.getAttribute('href');
    // console.log(idOfSections);
    document.querySelector(idOfSections).scrollIntoView({ behavior: 'smooth' });
  }
});

//menu fade animation------------------------------------------------------------------------------

const handlinghover = function (e, op) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = this;
  }
};

//passing arg to handler
nav.addEventListener('mouseover', handlinghover.bind(0.5));

nav.addEventListener('mouseout', handlinghover.bind(1));

//STICKY navigation---------------------------------------------------------------------------------------------------

// const initialCoords = homeSection.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//OR
//implement scroll using intersection server API

const header = document.querySelector('.home');

// const navheight = nav.getBoundingClientRect().height;
// console.log(navheight);

const obCallBack = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.remove('hidden');
  else nav.classList.add('hidden');
};

const obsObject = {
  root: null,
  threshold: 0.1,
  // call back triggers when target element moves in and out of the view ( 0 - when section exits and enters)
  // rootMargin: `-${navheight}px`, // distance between nav and start of section is same as the size of nav - we need to make that happen so that the header does not overlap the next section
};
const observer = new IntersectionObserver(obCallBack, obsObject);
observer.observe(header);

//Reveal Sections on scroll----------------------------------------------------------------------------------

const allSections = document.querySelectorAll('.section');

const revealCallback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return; // since first section gets displayed and does not transit
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // to stop random observes as we scroll up
};

const sectObserver = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (sections) {
  sectObserver.observe(sections);
  sections.classList.add('section--hidden');
});

//Lazy loading----------------------------------------------------------

const imgTarget = document.querySelectorAll('img[data-src');
// console.log(imgTarget);

const loadingImage = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  //else replace src att witth data-src
  entry.target.src = entry.target.dataset.src;
  //when the load happens an event is created we can listen to the event and add a function to remove the lazy images only after it loads
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

//Slider-------------------------------------------------------------------------------------------------------------

// const sliderFunctionality = function () {
//   // Declared funcyions -----------------------------------
//   const slides = document.querySelectorAll('.slide');
//   const btnleft = document.querySelector('.slider__btn--left');
//   const btnright = document.querySelector('.slider__btn--right');
//   let currentSlide = 0;
//   const maxSlides = slides.length; // reading no of slides

//   const dotContainer = document.querySelector('.dots');

//   const createDots = function (e) {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

// const activateDots = function (slide) {
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));
//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add('dots__dot--active');
// };

// const slider = document.querySelector('.slider');

// const moveSlides = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//   );
// };

// (i = 0), 1, 2;
// (cur = -1), -2, -3;
//0%,100,200,300% for all 4 images

// const nextSlide = function () {
//   if (currentSlide === maxSlides - 1) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//   }
//   moveSlides(currentSlide);
//   activateDots(currentSlide);
// };

// const previousSlide = function () {
//   console.log(currentSlide);
//   if (currentSlide == 0) {
//     //3 , 2 , 1 , 0
//     currentSlide = maxSlides - 1; // on first click display the last image
//   } else {
//     currentSlide--;
//   }
//   moveSlides(currentSlide);
//   activateDots(currentSlide);

//   // -300, -200, -100, 0;
// };

//INITIALISATION fn ----------------------------------
// const init = function () {
//   createDots();
//   activateDots(0);
//   moveSlides(0);
// };

// init();

//EVENT HANDLERS------------------------------------------
//next slide
// btnright.addEventListener('click', nextSlide);
// btnleft.addEventListener('click', previousSlide);

//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'ArrowLeft') previousSlide();
//     if (e.key === 'ArrowRight') nextSlide();
//   });

//   dotContainer.addEventListener('click', function (e) {
//     if (e.target.classList.contains('dots__dot')) {
//       const { slide } = e.target.dataset;
//       moveSlides(slide);
//       activateDots(slide);
//     }
//   });
// };

// //calling the slider functionality
// sliderFunctionality();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
