export interface MenuItem {
  id: string;
  name: string;
  nameTamil: string;
  description: string;
  price: number;
  image: string;
  category: "meals" | "biryani" | "fry" | "combo";
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "veg-meals",
    name: "Veg Meals",
    nameTamil: "சைவ உணவு",
    description:
      "Sambar, Poriyal, Kolli Hills Pepper Rasam, Curd, Sweet, Papad + choice of Kolli Hills Green Rice / Boiled Rice",
    price: 149,
    image: "/assets/generated/veg-meals.dim_800x600.jpg",
    category: "meals",
  },
  {
    id: "non-veg-meals",
    name: "Non-Veg Meals",
    nameTamil: "அசைவ உணவு",
    description:
      "Chicken Gravy, Mutton Gravy, Pepper Rasam, Buttermilk, Sweet, 2 pcs Chicken, 1 Egg + rice choice",
    price: 199,
    image: "/assets/generated/non-veg-meals.dim_800x600.jpg",
    category: "meals",
  },
  {
    id: "royal-chicken-biryani",
    name: "Royal Chicken Biryani",
    nameTamil: "அரச சிக்கன் பிரியாணி",
    description: "Raita, Chicken Gravy, Egg, Chicken 65 (2 pcs), Sweet",
    price: 199,
    image: "/assets/generated/chicken-biryani.dim_800x600.jpg",
    category: "biryani",
    isSpecial: true,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    nameTamil: "மட்டன் பிரியாணி",
    description: "Raita, Egg, Mutton Gravy, Sweet",
    price: 299,
    image: "/assets/generated/mutton-biryani.dim_800x600.jpg",
    category: "biryani",
  },
  {
    id: "chicken-fry",
    name: "Chicken Fry",
    nameTamil: "சிக்கன் பொரியல்",
    description: "Crispy golden fried chicken with South Indian spices",
    price: 149,
    image: "/assets/generated/chicken-fry.dim_800x600.jpg",
    category: "fry",
  },
  {
    id: "fish-fry",
    name: "Fish Fry",
    nameTamil: "மீன் வறுவல்",
    description: "Traditional Tamil style fish fry with coastal spices",
    price: 149,
    image: "/assets/generated/fish-fry.dim_800x600.jpg",
    category: "fry",
  },
  {
    id: "nattu-kozhi-pepper-fry",
    name: "Nattukolli Pepper Fry",
    nameTamil: "நாட்டுக்கோழி மிளகு வறுவல்",
    description: "Country chicken slow-cooked with Kolli Hills black pepper",
    price: 249,
    image: "/assets/generated/nattu-kozhi-pepper-fry.dim_800x600.jpg",
    category: "fry",
    isSpecial: true,
  },
  {
    id: "chicken-65-boneless",
    name: "Chicken 65 Boneless",
    nameTamil: "சிக்கன் 65 போன்லெஸ்",
    description: "Crispy boneless chicken in aromatic spice coating",
    price: 149,
    image: "/assets/generated/chicken-65-boneless.dim_800x600.jpg",
    category: "fry",
  },
  {
    id: "grill-chicken",
    name: "Grill Chicken",
    nameTamil: "கிரில் சிக்கன்",
    description: "Whole chicken grilled over charcoal with aromatic herbs",
    price: 399,
    image: "/assets/generated/grill-chicken.dim_800x600.jpg",
    category: "fry",
  },
];

export const comboItems: MenuItem[] = [
  {
    id: "couple-combo",
    name: "Couple Combo",
    nameTamil: "கபள் காம்போ",
    description: "2 Chicken Biryani + 2 Chicken Fry + 2 Sweets",
    price: 499,
    image: "/assets/generated/biryani-combo.dim_800x600.jpg",
    category: "combo",
  },
  {
    id: "royal-family-pack",
    name: "Royal Family Pack",
    nameTamil: "அரச குடும்ப பாக்",
    description: "4 Meals + 2 Biryani + 4 Fry + 4 Sweets",
    price: 799,
    image: "/assets/generated/non-veg-meals.dim_800x600.jpg",
    category: "combo",
  },
  {
    id: "biryani-combo",
    name: "Biryani Combo",
    nameTamil: "பிரியாணி காம்போ",
    description: "Chicken Biryani + Raita + Chicken Gravy + Chicken 65",
    price: 199,
    image: "/assets/generated/biryani-combo.dim_800x600.jpg",
    category: "combo",
  },
];

export const weekendSpecials: MenuItem[] = [
  menuItems.find((m) => m.id === "royal-chicken-biryani")!,
  menuItems.find((m) => m.id === "nattu-kozhi-pepper-fry")!,
  menuItems.find((m) => m.id === "grill-chicken")!,
  comboItems.find((m) => m.id === "couple-combo")!,
];
