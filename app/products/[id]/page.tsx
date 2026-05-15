import { notFound } from "next/navigation";
import { shades } from "@/data/shades";
import ProductDetail from "./ProductDetail";

export default function ProductPage({ params }: { params: { id: string } }) {
  const shade = shades.find((s) => s.id === params.id);
  if (!shade) notFound();
  return <ProductDetail initialShade={shade} />;
}
