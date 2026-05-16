export type Shade = {
  id: string;
  name: string;
  hex: string;
  label: string;
  priceUSD: number;
  image: string;
  hoverImage: string;
  swatch: string;
};

const HOVER = "/assets/products/pro-hover.webp";

export const shades: Shade[] = [
  { id: "01", name: "Cappucino",      hex: "#C49A8A", label: "Romantic",  priceUSD: 25, image: "/assets/products/Cappucino.webp",       hoverImage: HOVER, swatch: "/assets/swatch/Cappucino.webp"      },
  { id: "02", name: "Champagne Glow", hex: "#D4B896", label: "Radiant",   priceUSD: 25, image: "/assets/products/Champagne glow.webp",   hoverImage: HOVER, swatch: "/assets/swatch/Champagne.webp"      },
  { id: "03", name: "Cotton Candy",   hex: "#F2C5C0", label: "Sheer",     priceUSD: 25, image: "/assets/products/Cotton candy.webp",     hoverImage: HOVER, swatch: "/assets/swatch/Cotton candy.webp"   },
  { id: "04", name: "Plushing",       hex: "#E8A4A0", label: "Natural",   priceUSD: 25, image: "/assets/products/Plushing.webp",         hoverImage: HOVER, swatch: "/assets/swatch/Plushing.webp"       },
  { id: "05", name: "Rosewood",       hex: "#A05870", label: "Dramatic",  priceUSD: 25, image: "/assets/products/Rosewood.webp",         hoverImage: HOVER, swatch: "/assets/swatch/Rosewood.webp"       },
  { id: "06", name: "Rosy Posy",      hex: "#E8B89A", label: "Warm",      priceUSD: 25, image: "/assets/products/Rosy Posy.webp",        hoverImage: HOVER, swatch: "/assets/swatch/Rosy Posy.webp"      },
  { id: "07", name: "Spiced",         hex: "#D98C80", label: "Vibrant",   priceUSD: 25, image: "/assets/products/Spiced.webp",           hoverImage: HOVER, swatch: "/assets/swatch/Spiced.webp"         },
  { id: "08", name: "Summer Orange",  hex: "#E8A870", label: "Bold",      priceUSD: 25, image: "/assets/products/Summer orange.webp",    hoverImage: HOVER, swatch: "/assets/swatch/Summer orange.webp"  },
];
