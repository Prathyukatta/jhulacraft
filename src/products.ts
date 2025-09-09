// products.ts (single file, no imports)

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  // ✅ Acrylic Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `acrylic-${i + 1}`,
    name: `Acrylic Swing ${i + 1}`,
    image: `/images/acrylic-swing-${i + 1}.jpg`,
    description: `Elegant acrylic swing ${i + 1} designed for modern homes.`,
    category: "Acrylic Swings",
  })),

  // ✅ Carved Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `carved-${i + 1}`,
    name: `Carved Swing ${i + 1}`,
    image: `/images/carved-swing-${i + 1}.jpg`,
    description: `Hand-carved wooden swing ${i + 1} with traditional design.`,
    category: "Carved Swings",
  })),

  // ✅ Wooden Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `wooden-${i + 1}`,
    name: `Wooden Swing ${i + 1}`,
    image: `/images/wooden-swing-${i + 1}.jpg`,
    description: `Classic wooden swing ${i + 1} perfect for relaxation.`,
    category: "Wooden Swings",
  })),

  // ✅ Modern Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `modern-${i + 1}`,
    name: `Modern Swing ${i + 1}`,
    image: `/images/modern-swing-${i + 1}.jpg`,
    description: `Contemporary modern swing ${i + 1} with sleek design.`,
    category: "Modern Swings",
  })),

  // ✅ Iron Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `iron-${i + 1}`,
    name: `Iron Swing ${i + 1}`,
    image: `/images/iron-swing-${i + 1}.jpg`,
    description: `Durable iron swing ${i + 1}, built to last.`,
    category: "Iron Swings",
  })),

  // ✅ Outdoor Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `outdoor-${i + 1}`,
    name: `Outdoor Swing ${i + 1}`,
    image: `/images/outdoor-swing-${i + 1}.jpg`,
    description: `Perfect outdoor swing ${i + 1} for your garden or patio.`,
    category: "Outdoor Swings",
  })),

  // ✅ Indoor Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `indoor-${i + 1}`,
    name: `Indoor Swing ${i + 1}`,
    image: `/images/indoor-swing-${i + 1}.jpg`,
    description: `Indoor swing ${i + 1} for cozy living spaces.`,
    category: "Indoor Swings",
  })),

  // ✅ Luxury Swings
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `luxury-${i + 1}`,
    name: `Luxury Swing ${i + 1}`,
    image: `/images/luxury-swing-${i + 1}.jpg`,
    description: `Premium luxury swing ${i + 1} with rich detailing.`,
    category: "Luxury Swings",
  })),

  // ✅ Hanging Chairs
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `hanging-${i + 1}`,
    name: `Hanging Chair ${i + 1}`,
    image: `/images/hanging-chair-${i + 1}.jpg`,
    description: `Stylish hanging chair ${i + 1} for comfort and decor.`,
    category: "Hanging Chairs",
  })),
];
