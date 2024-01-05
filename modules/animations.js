/*
 *in this module are all the animations that are used
 */

export const divAnimations = {
  targets: ".container",
  duration: 1000,
  translateX: [1000, 0],
  rotateY: "360",
  easing: "easeInOutQuad",
};

const buttonAnimation1 = {
  targets: "#top-rated-btn",
  duration: 1000,
  rotateX: "1080",
  autoplay: false,
};

const buttonAnimation2 = {
  targets: "#popular-btn",
  duration: 1000,
  rotateY: "1080",
  autoplay: false,
};

const buttonAnimation3 = {
  targets: "#popular-tv-btn",
  duration: 1000,
  rotate: "1080",
  autoplay: false,
};

const buttonAnimation4 = {
  targets: "#top-rated-tv-btn",
  duration: 1000,
  rotate: "-1080",
  autoplay: false,
};

export const topRatedButtonAnimationObject = anime(buttonAnimation1);
export const popButtonAnimationObject = anime(buttonAnimation2);
export const popTvButtonAnimationObject = anime(buttonAnimation3);
export const topRatedTvButtonAnimationObject = anime(buttonAnimation4);
