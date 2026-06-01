/**
 * Design Tokens for Hands3D Premium Web Experience
 * Unified configuration for spacing, color palettes, typography, animations, and responsive breakpoints.
 */

export const colors = {
  // Editorial Slate Blue
  primaryBlue: "#3E5F8A", // HSL: 214, 40%, 39%
  primaryBlueLight: "#4E73A5",
  primaryBlueDark: "#2F4A6D",
  primaryBlueMuted: "rgba(62, 95, 138, 0.1)",
  
  // Brand Warm Beige
  brandBeige: "#FAF5EF", // HSL: 33, 45%, 96%
  brandBeigeDark: "#EDE5DA",
  
  // Brand Gold Accents
  brandGold: "#B58E45", // HSL: 40, 44%, 49%
  brandGoldLight: "#CBB181",
  brandGoldDark: "#8F6F33",
  
  // Neutral Solids
  darkText: "#111111",
  darkBg: "#0A0A0A", // Used in Emprendedor 3D dark theme
  lightText: "#FAF5EF",
  lightBg: "#FFFFFF",
  
  // Utility and status colors
  borderLight: "rgba(0, 0, 0, 0.05)",
  borderDark: "rgba(255, 255, 255, 0.08)",
  whatsappGreen: "#25D366",
  whatsappGreenDark: "#128C7E",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  sectionPaddingMobile: "24px",
  sectionPaddingDesktop: "64px",
};

export const typography = {
  fontFamilies: {
    heading: "'Neue Machina', sans-serif",
    technical: "'Space Grotesk', sans-serif",
    body: "'Outfit', sans-serif",
    sans: "'Inter', sans-serif",
  },
  fontSizes: {
    heroTitle: "clamp(3rem, 12vw, 9rem)",
    sectionTitle: "clamp(2.5rem, 8vw, 6.5rem)",
    sectionNumber: "clamp(4rem, 15vw, 12rem)",
    h3: "clamp(1.5rem, 4vw, 2.5rem)",
    body: "clamp(0.85rem, 1.5vw, 1.05rem)",
    caption: "clamp(0.7rem, 1vw, 0.8rem)",
  },
};

export const transitions = {
  smooth: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Editorial cubic-bezier
  snappy: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
  spring: { type: "spring", damping: 25, stiffness: 200 },
  springHeavy: { type: "spring", damping: 15, stiffness: 100 },
};

export const breakpoints = {
  mobile: "390px",
  tablet: "768px",
  laptop: "1440px",
  desktop: "1920px",
};

export const tokens = {
  colors,
  spacing,
  typography,
  transitions,
  breakpoints,
};

export default tokens;
