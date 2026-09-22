export interface Amenity {
  icon: string;
  label: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface Homestay {
  id: string;
  name: string;
  tag: string;
  tagType: "featured" | "bestseller" | "promo" | "nature";
  location: string;
  district: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: GalleryPhoto[];
  priceOriginal?: number;
  priceDiscounted: number;
  pricePerNightText: string;
  description: string;
  amenities: Amenity[];
  roomType: string;
  videoUrl: string;
}
