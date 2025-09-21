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
        src: "data:image/jpeg;base64,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",
    },

]

const modelsDummy = [
    {
        id: "1",
        title: "Cyberpunk Helmet",
        creator: "Alex Chen",
        price: 12.99,
        originalPrice: 19.99,
        rating: 4.8,
        reviews: 234,
        likes: 567,
        downloads: 1200,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Cyberpunk", "Helmet", "Sci-Fi"],
        featured: true,
    },
    {
        id: "2",
        title: "Fantasy Sword",
        creator: "Maya Studio",
        price: 0,
        rating: 4.9,
        reviews: 456,
        likes: 890,
        downloads: 2300,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Fantasy", "Weapon", "Medieval"],
        featured: false,
    },
    {
        id: "3",
        title: "Modern Chair",
        creator: "Design Co",
        price: 8.5,
        rating: 4.6,
        reviews: 123,
        likes: 234,
        downloads: 567,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Furniture", "Modern", "Interior"],
        featured: false,
    },
    {
        id: "4",
        title: "Robot Character",
        creator: "Tech Arts",
        price: 25.0,
        rating: 4.9,
        reviews: 789,
        likes: 1234,
        downloads: 890,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Robot", "Character", "Animation"],
        featured: true,
    },
    {
        id: "5",
        title: "Crystal Formation",
        creator: "Geo Studio",
        price: 15.99,
        rating: 4.7,
        reviews: 345,
        likes: 678,
        downloads: 456,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Crystal", "Nature", "Geology"],
        featured: false,
    },
    {
        id: "6",
        title: "Spaceship",
        creator: "Space Designs",
        price: 0,
        rating: 4.8,
        reviews: 567,
        likes: 901,
        downloads: 1567,
        image: "/placeholder.svg?height=300&width=300",
        tags: ["Spaceship", "Sci-Fi", "Vehicle"],
        featured: false,
    },
]

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
    { id: 1, name: 'shyam lila', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 567, products: 1200, rating: 4.8, reviewCount: 234, tags: ['jute', 'bamboo'], isFeatured: true },
    { id: 2, name: 'Alex Chen', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 980, products: 850, rating: 4.9, reviewCount: 512, tags: ['helmet', 'model'], isFeatured: true },
    { id: 3, name: 'Maria Garcia', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 1200, products: 2300, rating: 4.7, reviewCount: 890, tags: ['jute', 'bamboo'], isFeatured: true },
    { id: 4, name: 'David Kim', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 340, products: 500, rating: 4.6, reviewCount: 150, tags: ['model', 'helmet'], isFeatured: true },
    { id: 5, name: 'shyam lila', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 567, products: 1200, rating: 4.8, reviewCount: 234, tags: ['container'], isFeatured: true },
    { id: 6, name: 'Alex Chen', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 980, products: 850, rating: 4.9, reviewCount: 512, tags: ['helmet', 'model'], isFeatured: false },
    { id: 7, name: 'Maria Garcia', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 1200, products: 2300, rating: 4.7, reviewCount: 890, tags: ['jute', 'bamboo'], isFeatured: true },
    { id: 8, name: 'David Kim', shopName: 'Shop Name', avatarUrl: 'https://placehold.co/100x100/e2e8f0/e2e8f0', followers: 340, products: 500, rating: 4.6, reviewCount: 150, tags: ['container'], isFeatured: true },
];

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
    const [activeView, setActiveView] = useState<'creator' | 'product'>('product');

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


            const res = await fetch(`/api/v1/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });
            return await res.json();
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {

        const products = async () => {
            const res = await fetchModels();
            const products = res.products || [];
            const formatedProducts = products.map((product: any): object => (
                {
                    id: product._id,
                    title: product.name || "Untitled Model",
                    creator: product.creator || "Unknown Creator",
                    price: product.price,
                    rating: product.rating || 4.5,
                    reviews: 789,
                    likes: 1234,
                    downloads: 890,
                    image: product.image[0].url,
                    tags: ["Robot", "Character", "Animation"],
                    featured: true,
                }
            ))
            setModels(formatedProducts);
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

                <div className="flex justify-center mb-8">
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
                    ) : (
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
