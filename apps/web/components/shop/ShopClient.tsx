"use client";

import { useState, useCallback } from "react";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

type CoverImage = {
  asset: object;
  alt?: string;
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  origin: string;
  region: string;
  process: string;
  roastLevel: string;
  price: number;
  weight: number;
  excerpt: string;
  tastingNotes: string[];
  inStock: boolean;
  coverImage?: CoverImage;
};

type Props = {
  initialProducts: Product[];
};

export function ShopClient({ initialProducts }: Props) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  const handleFilter = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ProductFilters products={initialProducts} onFilter={handleFilter} />

      <p className="text-xs text-muted mt-3 mb-6">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "coffee" : "coffees"}
      </p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted">No coffees match your filters.</p>
          <p className="text-muted text-sm mt-1">Try removing a filter.</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
