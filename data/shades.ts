export type Shade = {
  id: string;
  name: string;
  hex: string;
  label: string;
  priceUSD: number;
};

export const shades: Shade[] = [
  { id: "01", name: "Bare Petal", hex: "#F2C5C0", label: "Sheer", priceUSD: 18 },
  { id: "02", name: "Rose Mist", hex: "#E8A4A0", label: "Natural", priceUSD: 18 },
  { id: "03", name: "Peachy Flush", hex: "#E8B89A", label: "Warm", priceUSD: 18 },
  { id: "04", name: "Coral Veil", hex: "#D98C80", label: "Vibrant", priceUSD: 18 },
  { id: "05", name: "Mauve Cloud", hex: "#C4909A", label: "Romantic", priceUSD: 18 },
  { id: "06", name: "Berry Glow", hex: "#B07088", label: "Bold", priceUSD: 18 },
  { id: "07", name: "Golden Blush", hex: "#D4A080", label: "Radiant", priceUSD: 18 },
  { id: "08", name: "Deep Rose", hex: "#A05870", label: "Dramatic", priceUSD: 18 },
];
