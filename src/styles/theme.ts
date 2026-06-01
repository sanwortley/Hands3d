import tokens from './tokens';

/**
 * Premium Theme Configuration for Hands3D
 * Bridge between raw tokens and functional React styles / Framer Motion animations.
 */
export const theme = {
  // Access design tokens directly
  ...tokens,
  
  // Custom helper style rules
  layouts: {
    sectionContainer: "flex flex-col h-dvh w-full select-none relative overflow-hidden",
    headerBanner: "h-[12%] w-full flex items-center px-6 md:px-16 border-b shrink-0 z-30",
    bodyArea: "h-[88%] w-full px-6 md:px-16 pt-4 pb-6 flex flex-col justify-between overflow-visible relative",
    footerRow: "flex justify-between items-center w-full pt-4 border-t z-10",
  },
  
  // Custom editorial framer motion animation variant configurations
  animations: {
    // Reveal text letter by letter
    charReveal: {
      hidden: { opacity: 0, y: 15 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.03,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }
      })
    },
    
    // Blur reveal for cards and texts
    blurReveal: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    
    // Card vertical slide up entry
    cardFadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      })
    },
    
    // Russian Roulette Section Snapping Rotation Transition
    russianRouletteScroll: {
      initial: (dir: 'next' | 'prev') => ({
        opacity: 0,
        rotateX: dir === 'next' ? 45 : -45,
        y: dir === 'next' ? "100%" : "-100%",
        scale: 0.95,
      }),
      animate: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        scale: 1,
        transition: {
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1]
        }
      },
      exit: (dir: 'next' | 'prev') => ({
        opacity: 0,
        rotateX: dir === 'next' ? -45 : 45,
        y: dir === 'next' ? "-100%" : "100%",
        scale: 0.95,
        transition: {
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1]
        }
      })
    }
  }
};

export default theme;
