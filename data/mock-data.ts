export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: { [key: string]: string };
  colors: { name: string; hex: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  iconName: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface BookingPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
}

export interface Booking {
  id: string;
  packageName: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  price: number;
  clientName: string;
  notes: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Chairs & Seating',
    slug: 'chairs',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=600&q=80',
    iconName: 'Armchair',
  },
  {
    id: 'c2',
    name: 'Desks & Tables',
    slug: 'desks',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    iconName: 'Table',
  },
  {
    id: 'c3',
    name: 'Lighting',
    slug: 'lighting',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    iconName: 'Lamp',
  },
  {
    id: 'c4',
    name: 'Decor & Storage',
    slug: 'decor',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    iconName: 'Package',
  },
  {
    id: 'c5',
    name: 'Bags & Carrying',
    slug: 'bags',
    itemCount: 10,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    iconName: 'ShoppingBag',
  },
  {
    id: 'c6',
    name: 'Workspace Accessories',
    slug: 'accessories',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    iconName: 'Monitor',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ergonomic Executive Chair Pro',
    category: 'Chairs & Seating',
    categorySlug: 'chairs',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Designed for long hours of intense focus. Features dynamic lumbar support, breathable 3D mesh fabric, adjustable 4D armrests, and synchro-tilt mechanism.',
    features: [
      '3D Dynamic Lumbar Support Cushioning',
      'Breathable High-Tension Mesh Backrest',
      '4D Multi-Directional Padded Armrests',
      'Class-4 Heavy Duty Gas Lift Cylinder (Up to 330 lbs)',
      'Smooth 60mm PU Mute Caster Wheels',
    ],
    specs: {
      'Seat Height': '18.5" - 22.5"',
      'Total Height': '46.5" - 50.5"',
      'Seat Width': '20.5"',
      'Weight Capacity': '330 lbs',
      'Warranty': '5 Years Limited',
    },
    colors: [
      { name: 'Space Gray', hex: '#4b5563' },
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Walnut Accent', hex: '#78350f' },
    ],
  },
  {
    id: 'p2',
    name: 'Minimalist Solid Oak Standing Desk',
    category: 'Desks & Tables',
    categorySlug: 'desks',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Crafted from sustainably sourced North American White Oak with dual motor electronic height adjustment. Ultra-quiet transitions with 4 memory presets.',
    features: [
      'Dual Electric Motors for Smooth Height Transition',
      'Custom Memory Controller with OLED Display',
      'Integrated Cable Management Tray & Grommets',
      'Anti-Collision Safety Sensor System',
    ],
    specs: {
      'Desktop Dimensions': '60" x 30" x 1"',
      'Height Range': '24.5" - 50.0"',
      'Max Weight Limit': '275 lbs',
      'Motor Noise Level': '< 45 dB',
    },
    colors: [
      { name: 'Natural Oak', hex: '#d97706' },
      { name: 'Smoked Walnut', hex: '#451a03' },
      { name: 'Matte White', hex: '#f9fafb' },
    ],
  },
  {
    id: 'p3',
    name: 'Architectural LED Desk Lamp',
    category: 'Lighting',
    categorySlug: 'lighting',
    price: 89,
    originalPrice: 119,
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534353473418-4cfa6c5df851?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Precision-crafted aluminum desk lamp featuring glare-free warm-to-cool LED lighting, intuitive touch slider control, and integrated wireless phone charging base.',
    features: [
      '15W Fast Wireless Qi Charging Base',
      '5 Color Temperatures (2700K - 6500K)',
      'CRI > 95 True Color Rendering Index',
      'Auto-Dimming Ambient Light Sensor',
    ],
    specs: {
      'Brightness': '1000 Lumens',
      'Power Consumption': '12W LED',
      'Arm Adjustment': '360 degree rotation',
      'Material': 'Anodized Aircraft Aluminum',
    },
    colors: [
      { name: 'Matte Black', hex: '#18181b' },
      { name: 'Silver Anodized', hex: '#e4e4e7' },
    ],
  },
  {
    id: 'p4',
    name: 'Acoustic Desk Divider & Shelf',
    category: 'Decor & Storage',
    categorySlug: 'decor',
    price: 129,
    rating: 4.6,
    reviewCount: 42,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Noise-absorbing PET felt desk organizer and riser shelf. Reduces ambient office noise while elevating your monitors to ergonomic eye level.',
    features: [
      'Recycled PET Sound Absorbent Material',
      'Solid Hardwood Top Riser Board',
      'Modular Storage Trays & Cable Channels',
    ],
    specs: {
      'Dimensions': '42" L x 9" W x 4.5" H',
      'Material': 'FSC Certified Oak & PET Felt',
      'Weight': '8.5 lbs',
    },
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Oatmeal Beige', hex: '#f3f4f6' },
    ],
  },
  {
    id: 'p5',
    name: 'Leather Commuter Tech Backpack',
    category: 'Bags & Carrying',
    categorySlug: 'bags',
    price: 179,
    originalPrice: 210,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Handcrafted full-grain leather backpack with dedicated padded sleeve for up to 16" laptops, waterproof YKK zippers, and hidden passport pocket.',
    features: [
      'Full-Grain Tuscan Leather Outer',
      'Shock-Proof 16" Laptop Compartment',
      'Luggage Pass-Through Strap',
      'Water-Resistant Lining & Zippers',
    ],
    specs: {
      'Capacity': '22 Liters',
      'Dimensions': '18" x 12" x 6"',
      'Weight': '2.4 lbs',
    },
    colors: [
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Midnight Black', hex: '#09090b' },
      { name: 'Cognac Tan', hex: '#b45309' },
    ],
  },
  {
    id: 'p6',
    name: 'Aluminum Dual Monitor Arm',
    category: 'Workspace Accessories',
    categorySlug: 'accessories',
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    reviewCount: 110,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Heavy-duty mechanical spring dual monitor mount. Supports two displays up to 32 inches each with full articulation and hidden cable routing.',
    features: [
      'Supports VESA 75x75 & 100x100',
      'Gas Spring Assisted Arm Tensioning',
      'Supports 4.4 to 19.8 lbs Per Monitor',
      'C-Clamp & Grommet Mounting Included',
    ],
    specs: {
      'Screen Size Compatibility': '17" to 32"',
      'Tilt Range': '+90 to -45 degrees',
      'Swivel Range': '+90 to -90 degrees',
    },
    colors: [
      { name: 'Space Gray', hex: '#4b5563' },
      { name: 'Matte White', hex: '#f9fafb' },
    ],
  },
  {
    id: 'p7',
    name: 'Merino Wool Desk Mat (Large)',
    category: 'Workspace Accessories',
    categorySlug: 'accessories',
    price: 49,
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Premium 100% natural wool felt desk pad. Protects your desk surface while providing a soft touch for wrist resting and smooth mouse tracking.',
    features: [
      '100% German Merino Wool Felt',
      'Anti-Slip Natural Cork Backing',
      'Water-Repellent Protective Coating',
    ],
    specs: {
      'Dimensions': '35.4" x 11.8" x 0.2"',
      'Edge Finish': 'Precision Laser Cut',
    },
    colors: [
      { name: 'Dark Heather Grey', hex: '#374151' },
      { name: 'Sand Brown', hex: '#d97706' },
    ],
  },
  {
    id: 'p8',
    name: 'Ergonomic Active Balance Stool',
    category: 'Chairs & Seating',
    categorySlug: 'chairs',
    price: 159,
    originalPrice: 189,
    rating: 4.5,
    reviewCount: 38,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Dynamic perching stool designed to keep your core engaged while standing or sitting at a height-adjustable desk.',
    features: [
      'Weighted Base with Non-Slip Rubber Base',
      '360-Degree Swivel and Tilt Movement',
      'Pneumatic Height Adjustment Push Button',
    ],
    specs: {
      'Height Range': '20" - 28"',
      'Weight Capacity': '250 lbs',
    },
    colors: [
      { name: 'Charcoal Black', hex: '#1f2937' },
      { name: 'Olive Green', hex: '#365314' },
    ],
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'August 14, 2026',
    title: 'Transformed my work-from-home comfort!',
    content: 'The Ergonomic Executive Chair Pro exceeds all expectations. The lumbar support aligns perfectly with my lower back, eliminating hours of fatigue. Worth every single penny!',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'August 02, 2026',
    title: 'Solid build quality & sleek design',
    content: 'Assembly took under 15 minutes. The materials feel premium and sturdy. The smooth armrest adjustments make dialing in the ideal position effortless.',
    verified: true,
  },
  {
    id: 'r3',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 4,
    date: 'July 28, 2026',
    title: 'Great chair, fast shipping',
    content: 'Delivered in 2 days. Very comfortable mesh material that stays cool throughout long coding sessions. Highly recommend!',
    verified: true,
  },
];

export const BOOKING_PACKAGES: BookingPackage[] = [
  {
    id: 'bp1',
    name: 'Virtual Ergonomic Audit',
    duration: '45 Mins',
    price: 75,
    description: 'One-on-one virtual walkthrough with an ergonomic specialist to evaluate posture, monitor positioning, and seating posture.',
    features: [
      'Comprehensive posture analysis',
      'Personalized workspace recommendations report',
      '10% discount voucher for recommended furniture',
    ],
  },
  {
    id: 'bp2',
    name: 'On-Site Space & Layout Planning',
    duration: '90 Mins',
    price: 199,
    description: 'In-person space planning and 3D interior design proposal tailored for home offices, executive suites, or corporate floors.',
    features: [
      'In-person room measurement & lighting assessment',
      'Custom 3D CAD layout diagram',
      'Direct sourcing catalog pricing',
      'White-glove installation coordination',
    ],
  },
  {
    id: 'bp3',
    name: 'Full Corporate Workspace Setup',
    duration: 'Half Day',
    price: 499,
    description: 'Complete end-to-end design, ergonomics calibration, and equipment deployment for teams of 5 to 50 employees.',
    features: [
      'Multi-workstation ergonomic evaluation',
      'Bulk purchasing discounts & logistics management',
      'Dedicated project manager & ongoing maintenance plan',
    ],
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-84920',
    date: 'Aug 29, 2026',
    status: 'Delivered',
    total: 378,
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    items: [
      {
        productId: 'p1',
        name: 'Ergonomic Executive Chair Pro',
        price: 249,
        quantity: 1,
        color: 'Matte Black',
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=400&q=80',
      },
      {
        productId: 'p4',
        name: 'Acoustic Desk Divider & Shelf',
        price: 129,
        quantity: 1,
        color: 'Charcoal Grey',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'ORD-83104',
    date: 'Aug 15, 2026',
    status: 'Processing',
    total: 499,
    shippingAddress: '100 Market St, Suite 400, San Francisco, CA 94105',
    items: [
      {
        productId: 'p2',
        name: 'Minimalist Solid Oak Standing Desk',
        price: 499,
        quantity: 1,
        color: 'Natural Oak',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-9021',
    packageName: 'Virtual Ergonomic Audit',
    date: 'Sep 10, 2026',
    timeSlot: '11:00 AM',
    status: 'Confirmed',
    price: 75,
    clientName: 'Alex Rivera',
    notes: 'Focus on lower back pain relief during 8+ hour coding desk sessions.',
  },
];
