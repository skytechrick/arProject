"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import FlipCard from "@/components/FlipCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Heart, Download, Eye, Grid3X3, List, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const bannerImages = [
    {
        id: 1,
        src: "/banner1.jpeg",
    },
    {
        id: 2,
        src: "banner2.jpeg",
    },
    {
        id: 3,
        src: "banner3.png",
    },

]

const modelsDummy = [
    {
        "id": "2",
        "title": "Handwoven Bamboo Storage Basket",
        "creator": "Lina Patel",
        "price": 24.50,
        "originalPrice": 30.00,
        "rating": 4.5,
        "reviews": 112,
        "likes": 345,
        "downloads": 890,
        "image": "https://readdy.ai/api/search-image?query=colorful%20imitation%20jewelry%20artificial%20ornaments%20traditional%20indian%20accessories%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art33&orientation=landscape",
        "tags": ["Handwoven", "Bamboo", "Storage", "Basket"],
        "featured": false
    },
    {
        "id": "3",
        "title": "Traditional Kalimpong Yatha Carpet",
        "creator": "Tenzin Dorji",
        "price": 150.00,
        "originalPrice": 180.00,
        "rating": 4.9,
        "reviews": 78,
        "likes": 210,
        "downloads": 550,
        "image": "/id7.png",
        "tags": ["Traditional", "Kalimpong", "Carpet", "Yatha"],
        "featured": true
    },
    {
        "id": "4",
        "title": "Sacred Buddha Thangka Painting",
        "creator": "Sonam Wangchuk",
        "price": 250.00,
        "originalPrice": 300.00,
        "rating": 5.0,
        "reviews": 55,
        "likes": 180,
        "downloads": 400,
        "image": "https://readdy.ai/api/search-image?query=traditional%20tribal%20masks%20colorful%20painted%20faces%20cultural%20art%20chhattisgarh%20craft%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art47&orientation=landscape",
        "tags": ["Thangka", "Buddha", "Painting", "Sacred"],
        "featured": true
    },
    {
        "id": "5",
        "title": "Handcrafted Silver Filigree Necklace",
        "creator": "Rakesh Sharma",
        "price": 75.00,
        "originalPrice": 90.00,
        "rating": 4.7,
        "reviews": 95,
        "likes": 300,
        "downloads": 750,
        "image": "/id9.png",
        "tags": ["Handcrafted", "Silver", "Filigree", "Necklace"],
        "featured": false
    },
    {
        "id": "6",
        "title": "Intricate Wooden Elephant Sculpture",
        "creator": "Prakash Rai",
        "price": 85.00,
        "originalPrice": 100.00,
        "rating": 4.6,
        "reviews": 68,
        "likes": 250,
        "downloads": 600,
        "image": "https://readdy.ai/api/search-image?query=beautiful%20chikankari%20embroidery%20lucknowi%20needlework%20white%20fabric%20intricate%20patterns%20warm%20natural%20lighting%20clean%20background&width=400&height=300&seq=art44&orientation=landscape",
        "tags": ["Wooden", "Elephant", "Sculpture", "Intricate"],
        "featured": false
    },
    {
        "id": "7",
        "title": "Traditional Terracotta Water Pot",
        "creator": "Geeta Devi",
        "price": 35.00,
        "originalPrice": 45.00,
        "rating": 4.4,
        "reviews": 150,
        "likes": 400,
        "downloads": 950,
        "image": "https://readdy.ai/api/search-image?query=detailed%20rajasthani%20stone%20carvings%20architectural%20elements%20traditional%20stonework%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art43&orientation=landscape",
        "tags": ["Traditional", "Terracotta", "Pot"],
        "featured": false
    },
    {
        "id": "8",
        "title": "Eco-Friendly Jute Tote Bag",
        "creator": "Ananya Ghosh",
        "price": 15.00,
        "originalPrice": 20.00,
        "rating": 4.8,
        "reviews": 200,
        "likes": 550,
        "downloads": 1100,
        "image": "/id12.png",
        "tags": ["Jute", "Tote Bag", "Eco-Friendly"],
        "featured": true
    },
    {
        "id": "9",
        "title": "Ancient Dokra Tribal Figurine",
        "creator": "Suresh Murmu",
        "price": 60.00,
        "originalPrice": 75.00,
        "rating": 4.9,
        "reviews": 45,
        "likes": 150,
        "downloads": 350,
        "image": "https://readdy.ai/api/search-image?query=handcrafted%20wooden%20items%20furniture%20decorative%20pieces%20mountain%20woodwork%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art37&orientation=landscape",
        "tags": ["Dokra", "Tribal", "Figurine", "Ancient"],
        "featured": true
    },
    {
        "id": "10",
        "title": "Vintage Leather Wallet",
        "creator": "John Smith",
        "price": 45.00,
        "originalPrice": 55.00,
        "rating": 4.6,
        "reviews": 180,
        "likes": 450,
        "downloads": 900,
        "image": "https://readdy.ai/api/search-image?query=intricate%20rajasthani%20wood%20carvings%20decorative%20panels%20traditional%20woodwork%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art41&orientation=landscape",
        "tags": ["Leather", "Wallet", "Vintage"],
        "featured": false
    },
    {
        "id": "11",
        "title": "Ceramic Coffee Mug",
        "creator": "Emily White",
        "price": 18.00,
        "originalPrice": 22.00,
        "rating": 4.5,
        "reviews": 250,
        "likes": 600,
        "downloads": 1300,
        "image": "https://readdy.ai/api/search-image?query=handcrafted%20wooden%20items%20furniture%20decorative%20pieces%20mountain%20woodwork%20warm%20studio%20lighting%20clean%20background&width=400&height=300&seq=art37&orientation=landscape",
        "tags": ["Ceramic", "Coffee Mug", "Handmade"],
        "featured": false
    },
    {
        "id": "12",
        "title": "Modern Abstract Canvas",
        "creator": "David Lee",
        "price": 120.00,
        "originalPrice": 150.00,
        "rating": 4.9,
        "reviews": 85,
        "likes": 280,
        "downloads": 650,
        "image": "https://readdy.ai/api/search-image?query=traditional%20kalimpong%20hill%20station%20arts%20colorful%20mountain%20crafts%20warm%20natural%20lighting%20clean%20background&width=400&height=300&seq=art38&orientation=landscape",
        "tags": ["Abstract", "Canvas", "Modern", "Art"],
        "featured": true
    },
    {
        "id": "13",
        "title": "Organic Cotton T-Shirt",
        "creator": "Sarah Jones",
        "price": 28.00,
        "originalPrice": 35.00,
        "rating": 4.7,
        "reviews": 190,
        "likes": 520,
        "downloads": 1050,
        "image": "https://readdy.ai/api/search-image?query=handwoven%20jute%20bags%20eco%20friendly%20products%20sustainable%20crafts%20bengali%20jute%20work%20warm%20natural%20lighting%20clean%20background&width=400&height=300&seq=art48&orientation=landscape",
        "tags": ["Cotton", "T-Shirt", "Organic"],
        "featured": false
    },
    {
        "id": "14",
        "title": "Sterling Silver Ring",
        "creator": "Michael Brown",
        "price": 55.00,
        "originalPrice": 65.00,
        "rating": 4.8,
        "reviews": 110,
        "likes": 320,
        "downloads": 700,
        "image": "https://readdy.ai/api/search-image?query=beautiful%20odia%20terracotta%20sculptures%20clay%20art%20traditional%20pottery%20warm%20earthy%20tones%20studio%20lighting%20clean%20background&width=400&height=300&seq=art50&orientation=landscape",
        "tags": ["Silver", "Ring", "Jewelry"],
        "featured": true
    },
    {
        "id": "15",
        "title": "Handmade Clay Vase",
        "creator": "Jessica Kim",
        "price": 40.00,
        "originalPrice": 50.00,
        "rating": 4.5,
        "reviews": 140,
        "likes": 380,
        "downloads": 850,
        "image": "https://readdy.ai/api/search-image?query=traditional%20tripura%20bamboo%20crafts%20baskets%20furniture%20northeast%20indian%20bamboo%20work%20warm%20natural%20lighting%20clean%20background&width=400&height=300&seq=art49&orientation=landscape",
        "tags": ["Clay", "Vase", "Handmade"],
        "featured": false
    }
];
// const modelsDummy = [
//     {
//         id: "1",
//         title: "Cyberpunk Helmet",
//         creator: "Alex Chen",
//         price: 12.99,
//         originalPrice: 19.99,
//         rating: 4.8,
//         reviews: 234,
//         likes: 567,
//         downloads: 1200,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Cyberpunk", "Helmet", "Sci-Fi"],
//         featured: true,
//     },
//     {
//         id: "2",
//         title: "Fantasy Sword",
//         creator: "Maya Studio",
//         price: 0,
//         rating: 4.9,
//         reviews: 456,
//         likes: 890,
//         downloads: 2300,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Fantasy", "Weapon", "Medieval"],
//         featured: false,
//     },
//     {
//         id: "3",
//         title: "Modern Chair",
//         creator: "Design Co",
//         price: 8.5,
//         rating: 4.6,
//         reviews: 123,
//         likes: 234,
//         downloads: 567,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Furniture", "Modern", "Interior"],
//         featured: false,
//     },
//     {
//         id: "4",
//         title: "Robot Character",
//         creator: "Tech Arts",
//         price: 25.0,
//         rating: 4.9,
//         reviews: 789,
//         likes: 1234,
//         downloads: 890,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Robot", "Character", "Animation"],
//         featured: true,
//     },
//     {
//         id: "5",
//         title: "Crystal Formation",
//         creator: "Geo Studio",
//         price: 15.99,
//         rating: 4.7,
//         reviews: 345,
//         likes: 678,
//         downloads: 456,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Crystal", "Nature", "Geology"],
//         featured: false,
//     },
//     {
//         id: "6",
//         title: "Spaceship",
//         creator: "Space Designs",
//         price: 0,
//         rating: 4.8,
//         reviews: 567,
//         likes: 901,
//         downloads: 1567,
//         image: "/placeholder.svg?height=300&width=300",
//         tags: ["Spaceship", "Sci-Fi", "Vehicle"],
//         featured: false,
//     },
// ]

const categories = [
    "All Categories",
    "Characters",
    "Vehicles",
    "Architecture",
    "Furniture",
    "Weapons",
    "Nature",
    "Sci-Fi",
    "Fantasy",
]

type Creator = {
    id: number;
    name: string;
    shopName: string;
    avatarUrl: string;
    followers: number;
    products: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    isFeatured: boolean;
};

const creatorsData: Creator[] = [
    {
        "id": 1,
        "name": "Anjali Gupta",
        "shopName": "Gupta's Weaves",
        "avatarUrl": "/image-creator.png",
        "followers": 567,
        "products": 1200,
        "rating": 4.8,
        "reviewCount": 234,
        "tags": ["weaving", "textiles"],
        "isFeatured": true
    },
    {
        "id": 2,
        "name": "Ravi Sharma",
        "shopName": "Sharma's Bamboo Crafts",
        "avatarUrl": "g1.jpeg",
        "followers": 980,
        "products": 850,
        "rating": 4.9,
        "reviewCount": 512,
        "tags": ["bamboo", "basketry"],
        "isFeatured": false
    },
    {
        "id": 3,
        "name": "Priya Singh",
        "shopName": "Singh's Looms",
        "avatarUrl": "/g2.jpeg",
        "followers": 1200,
        "products": 2300,
        "rating": 4.7,
        "reviewCount": 890,
        "tags": ["weaving", "textiles"],
        "isFeatured": true
    },
    {
        "id": 4,
        "name": "Meena Kumari",
        "shopName": "Kumari's Handicrafts",
        "avatarUrl": "/g3.jpeg",
        "followers": 340,
        "products": 500,
        "rating": 4.6,
        "reviewCount": 150,
        "tags": ["pottery", "sculpture"],
        "isFeatured": false
    },
    {
        "id": 5,
        "name": "Arjun Patel",
        "shopName": "Patel's Carvings",
        "avatarUrl": "/g4.jpeg",
        "followers": 750,
        "products": 1500,
        "rating": 4.5,
        "reviewCount": 450,
        "tags": ["wood carving", "sculpture"],
        "isFeatured": true
    },
    {
        "id": 6,
        "name": "Sanjay Das",
        "shopName": "Das's Wooden Wonders",
        "avatarUrl": "/g5.jpeg",
        "followers": 420,
        "products": 900,
        "rating": 4.8,
        "reviewCount": 300,
        "tags": ["woodwork", "vessels"],
        "isFeatured": true
    },
    {
        "id": 7,
        "name": "Sunita Devi",
        "shopName": "Devi's Designs",
        "avatarUrl": "/g6.jpeg",
        "followers": 1500,
        "products": 3000,
        "rating": 5.0,
        "reviewCount": 1200,
        "tags": ["weaving", "textiles"],
        "isFeatured": true
    },
    {
        "id": 8,
        "name": "Paul Wilson",
        "shopName": "Wilson's Wares",
        "avatarUrl": "https://readdy.ai/api/search-image?query=skilled%20indian%20artisan%20craftsman%20working%20with%20bamboo%20cane%20materials%20in%20traditional%20workshop%20setting%20warm%20natural%20lighting%20authentic%20handcraft%20scene&width=400&height=300&seq=art1&orientation=landscape",
        "followers": 600,
        "products": 1100,
        "rating": 4.6,
        "reviewCount": 200,
        "tags": ["bamboo", "cane craft"],
        "isFeatured": false
    }
]

const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-gray-600 bg-slate-800/50">
        <div className="relative overflow-hidden flex-shrink-0">
            <Image
                src={creator.avatarUrl || "/placeholder.svg"}
                alt={creator.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                </Button>
            </div>

            {/* Featured Badge */}
            {creator.isFeatured && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
                    Featured
                </Badge>
            )}

            {/* Price Badge */}
            {/* <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                {creator. === 0 ? "Free" : `$${model.price}`}
            </Badge> */}
        </div>

        {/* <img src={creator.avatarUrl} alt={creator.name} className="w-20 h-20 rounded-full border-4 border-gray-700 m-3 mb-0" /> */}
        <div className="p-4">
            <h3 className="font-bold text-base text-white">{creator.shopName}</h3>
            <p className="text-xs text-gray-400 mb-2">by {creator.name}</p>
            <div className="flex flex-wrap gap-2 mb-3">
                {creator.tags.map(tag => <span key={tag} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4 text-xs">
                <div className="flex items-center">

                    <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                    <span className="text-white font-bold">{creator.rating}</span>
                    <span className="ml-1">({creator.reviewCount})</span>
                </div>
                <div>

                    {/* <span className="mx-1">·</span> */}
                    <span>{creator.followers} Followers</span>
                    <span className="mx-[3px]">·</span>
                    <span>{creator.products} Products</span>
                </div>
            </div>
            <div className="text-right">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-lg inline-block">
                    Follow
                </button>
            </div>
        </div>
    </div>
);

export default function MarketplacePage() {
    const [models, setModels] = useState(modelsDummy);
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [sortBy, setSortBy] = useState("popular")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [priceFilter, setPriceFilter] = useState("all")

    const [activeBanner, setActiveBanner] = useState(1);
    const [bannerTimer, setBannerTimer] = useState(1);
    const [activeView, setActiveView] = useState<'creator' | 'product' | 'lens'>('product');

    setTimeout(() => {
        bannerTimer == bannerImages.length ? setBannerTimer(1) : setBannerTimer(bannerTimer + 1);
    }, 5000);

    useEffect(() => {
        setActiveBanner(bannerTimer);
    }, [bannerTimer]);

    const filteredModels = models.filter((model) => {
        const matchesSearch =
            model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "free" && model.price === 0) ||
            (priceFilter === "paid" && model.price > 0)

        return matchesSearch && matchesPrice
    })

    const fetchModels = async () => {
        try {


            // const res = await fetch(`/api/v1/products`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: "include"
            // });
            // return await res.json();
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {

        const products = async () => {
            // const res = await fetchModels();
            // const products = res.products || [];
            // const formatedProducts = products.map((product: any): object => (
            //     {
            //         id: product._id,
            //         title: product.name || "Untitled Model",
            //         creator: product.creator || "Unknown Creator",
            //         price: product.price,
            //         rating: product.rating || 4.5,
            //         reviews: 789,
            //         likes: 1234,
            //         downloads: 890,
            //         image: product.image[0].url,
            //         tags: ["Robot", "Character", "Animation"],
            //         featured: true,
            //     }
            // ))
            // setModels(formatedProducts);
        }
        products();

    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pt-20">
            <div className="container mx-auto px-4 py-8 pt-0">
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">3D Model Marketplace</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Discover, buy, and sell amazing 3D models created by talented artists worldwide
                    </p>
                </motion.div> */}

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search models, creators, or tags..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger className="w-full lg:w-48 bg-slate-800 border-slate-600 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-600">
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                                        <SelectTrigger className="w-full lg:w-32 bg-slate-800 border-slate-600 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-600">
                                            <SelectItem value="all">All Prices</SelectItem>
                                            <SelectItem value="free">Free</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-full lg:w-32 bg-slate-800 border-slate-600 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-600">
                                            <SelectItem value="popular">Popular</SelectItem>
                                            <SelectItem value="newest">Newest</SelectItem>
                                            <SelectItem value="price-low">Price: Low</SelectItem>
                                            <SelectItem value="price-high">Price: High</SelectItem>
                                            <SelectItem value="rating">Rating</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex border border-slate-600 rounded-md bg-slate-800">
                                        <Button
                                            variant={viewMode === "grid" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("grid")}
                                            className="rounded-r-none"
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={viewMode === "list" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("list")}
                                            className="rounded-l-none"
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div>
                    <div className="text-center mb-8 w-full relative top-0">
                        {/* Left button */}
                        <ChevronLeft
                            className="cursor-pointer transition-all duration-200 w-8 h-8 hover:bg-gray-500 bg-gray-100/80 text-gray-600 rounded-full py-1 absolute left-0 top-[40%] z-10 outline-none"
                            onClick={() => {
                                activeBanner === 1 ? setActiveBanner(bannerImages.length) : setActiveBanner(activeBanner - 1);
                                activeBanner === 1 ? setBannerTimer(bannerImages.length) : setBannerTimer(activeBanner - 1);
                            }}
                        />
                        <div className="w-full overflow-hidden">

                            {
                                bannerImages.map((banner) => (
                                    activeBanner === banner.id &&
                                    <img
                                        key={banner.id}
                                        src={banner.src}
                                        alt={`Banner ${banner.id}`}
                                        className="mx-auto rounded-lg shadow-lg w-full h-48 object-cover"
                                    />
                                ))
                            }
                        </div>
                        <ChevronRight
                            className="cursor-pointer transition-all duration-200 w-8 h-8 hover:bg-gray-500 bg-gray-100/80 text-gray-600 rounded-full py-1 absolute right-0 top-[40%] z-10 outline-none"
                            onClick={() => {
                                activeBanner === bannerImages.length ? setActiveBanner(1) : setActiveBanner(activeBanner + 1);
                                activeBanner === bannerImages.length ? setBannerTimer(1) : setBannerTimer(activeBanner + 1);
                            }}
                        />
                    </div>
                </motion.div>


                {/* Models Grid */}
                {/* <div
                    className={`relative top-0 grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                        }`}
                >
                    {filteredModels.map((model, index) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        > 
                            <div>

                                <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={model.image || "/placeholder.svg"}
                                            alt={model.title}
                                            width={300}
                                            height={300}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                                <Heart className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {model.featured && (
                                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
                                                Featured
                                            </Badge>
                                        )}

                                        <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                                            {model.price === 0 ? "Free" : `$${model.price}`}
                                        </Badge>
                                    </div>

                                    <CardContent className="p-4 relative top-0">
                                        <h3 className="font-semibold text-white mb-1 truncate">{model.title}</h3>
                                        <p className="text-sm text-slate-400 mb-2">by {model.creator}</p>

                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {model.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                                            <div className="flex items-center">
                                                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                <span>{model.rating}</span>
                                                <span className="ml-1">({model.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span>{model.likes} likes</span>
                                                <span>{model.downloads} downloads</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                {model.price === 0 ? (
                                                    <span className="font-bold text-green-400">Free</span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-yellow-400">${model.price}</span>
                                                        {model.originalPrice && (
                                                            <span className="text-xs text-slate-500 line-through">${model.originalPrice}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>



                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                            >
                                                Add to cart
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                            >
                                                {model.price === 0 ? (
                                                    <>
                                                        <Download className="w-3 h-3 mr-1" />
                                                        Download
                                                    </>
                                                ) : (
                                                    "Buy Now"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between absolute right-5 top-[35%]">
                                            <span className="text-xs text-slate-400 mt-2 cursor-pointer hover:underline rounded-2xl bg-slate-400/50 px-2 py-[2px] hover:bg-slate-600/90 transition-all duration-200">
                                                View story
                                            </span>
                                        </div>

                                    </CardContent>
                                </Card>

                            </div>
                        </motion.div>
                    ))}

                </div> */}

                <div className="flex justify-between mb-8">
                    <div>

                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-1 rounded-lg flex space-x-1">
                        <button
                            onClick={() => setActiveView('product')}
                            className={`px-16 py-2 rounded-md text-sm font-semibold ${activeView === 'product' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            Product
                        </button>
                        <button
                            onClick={() => setActiveView('creator')}
                            className={`px-16 py-2 rounded-md text-sm font-semibold ${activeView === 'creator' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            Creator
                        </button>
                    </div>
                    <div>

                        <button
                            onClick={() => setActiveView('lens')}
                            className={`px-16 py-2 rounded-md text-sm font-semibold ${activeView === 'lens' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'} border border-gray-500 `}
                        >
                            Lens
                        </button>
                    </div>
                </div>

                {/* Results */}

                {
                    activeView === 'product' ? (

                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-6"
                            >
                                <p className="text-slate-400">Showing {filteredModels.length} results</p>
                            </motion.div>

                            <FlipCard filteredModels={filteredModels} />
                        </>
                    ) : activeView === 'creator' ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-6"
                            >
                                <p className="text-slate-400">Showing {creatorsData.length} results</p>
                            </motion.div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {
                                    creatorsData.map(creator => <CreatorCard key={creator.id} creator={creator} />)
                                }
                            </div>
                        </>

                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-white mb-4">AR/VR Lenses Coming Soon!</h2>
                            <p className="text-slate-400">We're working hard to bring you an exciting collection of AR/VR lenses. Stay tuned!</p>
                        </div>
                    )

                }

                {/* Load More */}
                <div className="text-center mt-12">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        Load More Models
                    </Button>
                </div>
            </div>
        </div>
    )
}
