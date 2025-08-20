import { Variants, Easing, TargetResolver } from "framer-motion"

const easing: Easing = [0.76, 0, 0.24, 1];

export const menuSlide: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: {
    x: "0",
    transition: { duration: 0.8, ease: easing },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: easing },
  },
};
export const slide: Variants = {
  initial: { x: 80 },
  enter: ((i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: easing, delay: 0.05 * i }
  })) as TargetResolver,
  exit: ((i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: easing, delay: 0.05 * i }
  })) as TargetResolver
};
export const scale = {
    open: {scale: 1, transition: {duration: 0.3}},
    closed: {scale: 0, transition: {duration: 0.4}}
}
export const opacity:Variants = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: {duration: 1, delay: 0.2}
    },
}

export const slideUp:Variants = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2}
    }
}
export const landingPageSlideUp:Variants = {
    initial: {
        y: 300
    },
    enter: {
        y: 0,
        transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5}
    }
}
export const descriptionSlideUp:Variants = {

    initial: {
        y: "100%"
    },
    open: (i) => ({
        y: "0%",
        transition: {duration: 0.8, delay: 0.1 * i}
    }),
    closed: {
        y: "100%",
        transition: {duration: 0.5}
    }
}

export const descriptionOpacity:Variants = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: {duration: 0.5 ,delay:0.06}
    },
    closed: {
        opacity: 0,
        transition: {duration: 0.5}
    }
}