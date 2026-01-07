/**
 * Mock data for Drone Service Providers in Andhra Pradesh
 */
export const SERVICE_PROVIDERS = [
    {
        id: "provider_001",
        name: "Vijay Drone Services",
        businessName: "Vijay Agricultural Drones Pvt Ltd",
        verified: true,
        rating: 4.8,
        reviewCount: 234,
        servicesCompleted: 456,
        location: {
            district: "Visakhapatnam",
            area: "Madhurawada",
            coordinates: {
                lat: 17.7833,
                lng: 83.3167
            }
        },
        services: [
            { type: "agriculture", name: "Agriculture Spraying", price: 1500, duration: 60 },
            { type: "mapping", name: "Land Surveying & Mapping", price: 3000, duration: 90 },
            { type: "surveillance", name: "Area Monitoring", price: 2500, duration: 120 }
        ],
        availableDrones: 4,
        availability: "available",
        availableToday: true,
        priceRange: { min: 1500, max: 3000 },
        image: "/aggriimage.jpg",
        description: "Professional drone services with 5+ years of experience in agriculture and surveying.",
        certifications: ["DGCA Certified", "RPL License"]
    },
    {
        id: "provider_002",
        name: "AP Agri Drones",
        businessName: "Andhra Pradesh Agricultural Solutions",
        verified: true,
        rating: 4.5,
        reviewCount: 156,
        servicesCompleted: 320,
        location: {
            district: "Vijayawada",
            area: "Benz Circle",
            coordinates: {
                lat: 16.5062,
                lng: 80.6480
            }
        },
        services: [
            { type: "agriculture", name: "Pesticide Spraying", price: 1200, duration: 45 },
            { type: "inspection", name: "Crop Health Inspection", price: 2000, duration: 60 }
        ],
        availableDrones: 6,
        availability: "available",
        availableToday: true,
        priceRange: { min: 1200, max: 2000 },
        image: "/aggriimage.jpg",
        description: "Leading agricultural drone service provider in the Krishna delta region.",
        certifications: ["DGCA Certified"]
    },
    {
        id: "provider_003",
        name: "SkyView Surveillance",
        businessName: "SkyView Security Systems",
        verified: false,
        rating: 4.2,
        reviewCount: 89,
        servicesCompleted: 145,
        location: {
            district: "Guntur",
            area: "Tenali",
            coordinates: {
                lat: 16.3067,
                lng: 80.4365
            }
        },
        services: [
            { type: "surveillance", name: "Security Monitoring", price: 3500, duration: 180 },
            { type: "photography", name: "Event Coverage", price: 5000, duration: 240 }
        ],
        availableDrones: 2,
        availability: "scheduled",
        availableToday: false,
        priceRange: { min: 3500, max: 5000 },
        image: "/aggriimage.jpg",
        description: "Specialized in high-altitude surveillance and professional event photography.",
        certifications: ["RPL License"]
    },
    {
        id: "provider_004",
        name: "Godavari Mapping Solutions",
        businessName: "Godavari Geomatics Pvt Ltd",
        verified: true,
        rating: 4.9,
        reviewCount: 412,
        servicesCompleted: 780,
        location: {
            district: "East Godavari",
            area: "Kakinada",
            coordinates: {
                lat: 16.9891,
                lng: 82.2475
            }
        },
        services: [
            { type: "mapping", name: "3D Terrain Mapping", price: 4500, duration: 120 },
            { type: "inspection", name: "Pipeline Inspection", price: 6000, duration: 180 }
        ],
        availableDrones: 8,
        availability: "available",
        availableToday: true,
        priceRange: { min: 4500, max: 6000 },
        image: "/aggriimage.jpg",
        description: "Expert mapping and industrial inspection services across the Godavari region.",
        certifications: ["ISO 9001", "DGCA Certified"]
    },
    {
        id: "provider_005",
        name: "Coastal Drone Services",
        businessName: "Coastal Aerials & Logistics",
        verified: true,
        rating: 4.6,
        reviewCount: 178,
        servicesCompleted: 290,
        location: {
            district: "Nellore",
            area: "Kavali",
            coordinates: {
                lat: 14.4426,
                lng: 79.9865
            }
        },
        services: [
            { type: "delivery", name: "Medical Supply Delivery", price: 2500, duration: 30 },
            { type: "photography", name: "Beachfront Coverage", price: 3000, duration: 120 }
        ],
        availableDrones: 3,
        availability: "busy",
        availableToday: false,
        priceRange: { min: 2500, max: 3000 },
        image: "/aggriimage.jpg",
        description: "Specialized in coastal logistics and aerial media production.",
        certifications: ["Logistics Certified"]
    },
    {
        id: "provider_006",
        name: "Krishna Valley Aerials",
        businessName: "Krishna Aero-Tech",
        verified: true,
        rating: 4.7,
        reviewCount: 95,
        servicesCompleted: 180,
        location: {
            district: "Krishna",
            area: "Machilipatnam",
            coordinates: {
                lat: 16.1875,
                lng: 81.1391
            }
        },
        services: [
            { type: "agriculture", name: "Fertilizer Spraying", price: 1600, duration: 60 },
            { type: "inspection", name: "Bridge Inspection", price: 4000, duration: 150 }
        ],
        availableDrones: 3,
        availability: "available",
        availableToday: true,
        priceRange: { min: 1600, max: 4000 },
        image: "/aggriimage.jpg",
        description: "Bridging the gap between traditional farming and modern technology.",
        certifications: ["DGCA Certified"]
    },
    {
        id: "provider_007",
        name: "Rayalaseema Drone Tech",
        businessName: "Rayalaseema Advanced Systems",
        verified: true,
        rating: 4.4,
        reviewCount: 67,
        servicesCompleted: 120,
        location: {
            district: "Kurnool",
            area: "Nandyal",
            coordinates: {
                lat: 15.4847,
                lng: 78.4867
            }
        },
        services: [
            { type: "surveillance", name: "Mining Site Monitoring", price: 5500, duration: 240 },
            { type: "mapping", name: "Mineral Mapping", price: 7000, duration: 180 }
        ],
        availableDrones: 2,
        availability: "scheduled",
        availableToday: false,
        priceRange: { min: 5500, max: 7000 },
        image: "/aggriimage.jpg",
        description: "Providing high-tech solutions for the mining and mineral industries.",
        certifications: ["Mining Safety Certified"]
    },
    {
        id: "provider_008",
        name: "Temple City Drones",
        businessName: "Tirupati Aerial Arts",
        verified: false,
        rating: 3.9,
        reviewCount: 45,
        servicesCompleted: 88,
        location: {
            district: "Chittoor",
            area: "Tirupati",
            coordinates: {
                lat: 13.6288,
                lng: 79.4192
            }
        },
        services: [
            { type: "photography", name: "Pilgrimage Documentation", price: 4000, duration: 180 },
            { type: "surveillance", name: "Crowd Management", price: 6000, duration: 300 }
        ],
        availableDrones: 5,
        availability: "available",
        availableToday: true,
        priceRange: { min: 4000, max: 6000 },
        image: "/aggriimage.jpg",
        description: "Supporting large scale event management and documentary services.",
        certifications: []
    },
    {
        id: "provider_009",
        name: "Amaravati Aerials",
        businessName: "Capital Drone Corp",
        verified: true,
        rating: 4.8,
        reviewCount: 312,
        servicesCompleted: 640,
        location: {
            district: "Guntur",
            area: "Amaravati",
            coordinates: {
                lat: 16.5131,
                lng: 80.5186
            }
        },
        services: [
            { type: "inspection", name: "Construction Monitoring", price: 3000, duration: 90 },
            { type: "mapping", name: "Urban Planning Survey", price: 5000, duration: 180 }
        ],
        availableDrones: 10,
        availability: "available",
        availableToday: true,
        priceRange: { min: 3000, max: 5000 },
        image: "/aggriimage.jpg",
        description: "Pioneering urban development monitoring in the new capital region.",
        certifications: ["Urban Planning Certified"]
    },
    {
        id: "provider_010",
        name: "Kadapa Aero Solutions",
        businessName: "R-Seema Sky Solutions",
        verified: true,
        rating: 4.3,
        reviewCount: 54,
        servicesCompleted: 110,
        location: {
            district: "Kadapa",
            area: "Proddatur",
            coordinates: {
                lat: 14.7500,
                lng: 78.5500
            }
        },
        services: [
            { type: "agriculture", name: "Orchard Spraying", price: 1800, duration: 60 },
            { type: "surveillance", name: "Solar Farm Inspection", price: 4000, duration: 120 }
        ],
        availableDrones: 2,
        availability: "available",
        availableToday: true,
        priceRange: { min: 1800, max: 4000 },
        image: "/aggriimage.jpg",
        description: "Reliable drone services for specialized agriculture and renewable energy.",
        certifications: ["DGCA Certified"]
    }
];

export const MOCK_BOOKINGS = [
    {
        id: "BK-1001",
        providerId: "provider_001",
        providerName: "Krishi Drone Services",
        serviceName: "Agricultural Spraying",
        date: "2025-01-10",
        slot: "10:00 AM",
        status: "scheduled", // scheduled, accepted, in-progress, completed
        amount: 1500,
        paymentStatus: "paid"
    },
    {
        id: "BK-1002",
        providerId: "provider_002",
        providerName: "SkyScan Solutions",
        serviceName: "Infrastructure Inspection",
        date: "2025-01-05",
        slot: "02:00 PM",
        status: "completed",
        amount: 4500,
        paymentStatus: "paid",
        reportUrl: "#"
    }
];

export const DRONE_PRODUCTS = [
    {
        id: "prod_001",
        name: "Agri-Sprayer X1",
        brand: "BharatDrones",
        price: 85000,
        rating: 4.8,
        category: "drones",
        image: "/aggriimage.jpg",
        description: "High-capacity agricultural spraying drone with precision nozzle system.",
        specs: {
            tank: "10L",
            flightTime: "25 mins",
            coverage: "2 acres/hr"
        }
    },
    {
        id: "prod_002",
        name: "Surveyor Pro V3",
        brand: "SkyScan",
        price: 120000,
        rating: 4.9,
        category: "drones",
        image: "/aggriimage.jpg",
        description: "RTK enabled mapping drone for high-precision land surveys.",
        specs: {
            camera: "45MP",
            flightTime: "45 mins",
            accuracy: "1cm RTK"
        }
    },
    {
        id: "prod_003",
        name: "Lipo Battery 16000mAh",
        brand: "PowerCell",
        price: 15000,
        rating: 4.5,
        category: "parts",
        image: "/aggriimage.jpg",
        description: "High-density flight battery for heavy-lift drones.",
        specs: {
            voltage: "22.2V",
            capacity: "16000mAh",
            weight: "1.2kg"
        }
    },
    {
        id: "prod_004",
        name: "Carbon Fiber Props (Set)",
        brand: "AeroProps",
        price: 4500,
        rating: 4.7,
        category: "parts",
        image: "/aggriimage.jpg",
        description: "Balanced carbon fiber propellers for reduced vibration.",
        specs: {
            size: "24 inch",
            material: "Carbon Fiber",
            quantity: "4 pcs"
        }
    }
];
