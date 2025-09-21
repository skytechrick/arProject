"use client"
import { useMemo } from "react"
const aiTags = ["Handmade", "Sustainable", "Eco-friendly", "Gift-worthy", "Traditional", "Modern", "Unique"];
type Product = {
    id: number; name: string; category: 'Electronics' | 'Home Decor' | 'Fashion' | 'Jewelry'; price: number; originalPrice?: number; rating: number; reviewCount: number; artisan: string; region: string; material: string; images: string[]; description: string; details: { dimensions: string; timeToMake: string; }; artisanStory: { bio: string; imageUrl: string; }; availability: 'In Stock' | 'Out of Stock'; likes: number; shares: number; isNew: boolean; isTrending?: boolean; collection?: 'Diwali' | 'Holi' | 'Rakhi';
    aiNarrative?: string;
};
import { SearchIcon, MicIcon, RefreshCwIcon } from "lucide-react"
const handleVoiceSearch = () => {
    alert("Voice search activated! (This is a placeholder action.)");
};
const handleRefresh = () => {
    alert("Content refreshed! (This is a placeholder action.)");
};
const onProductSelect = (product: Product) => {
    alert(`Selected product: ${product.name} by ${product.artisan}`);
};
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Hand-Painted Ceramic Vase",
        category: "Home Decor",
        price: 2499,
        originalPrice: 3999,
        rating: 4.8,
        reviewCount: 124,
        artisan: "Rina Devi",
        region: "Jaipur",
        material: "Clay",
        images: [
            "/s10.png",
        ],
        description:
            "A beautifully hand-painted ceramic vase, perfect for adding a touch of elegance to any room. Each piece is unique, showcasing the rich heritage of Jaipur pottery.",
        details: { dimensions: '12" H x 6" W', timeToMake: "5 days" },
        artisanStory: {
            bio: "Rina Devi has been perfecting her craft for over 20 years, learning the art of pottery from her mother. Her workshop in Jaipur is a hub of creativity and tradition.",
            imageUrl: "/s10.png",
        },
        availability: "In Stock",
        likes: 1500,
        shares: 450,
        isNew: true,
        collection: "Diwali",
    },
    {
        id: 2,
        name: "Mysore Silk Saree",
        category: "Fashion",
        price: 8999,
        rating: 4.9,
        reviewCount: 250,
        artisan: "Anand Kumar",
        region: "Mysore",
        material: "Silk",
        images: [
            "/s11.png",
        ],
        description:
            "Experience luxury with this authentic Mysore silk saree, known for its softness, lustre, and durability. Woven with pure silk and real gold zari.",
        details: { dimensions: "6.25 meters", timeToMake: "15 days" },
        artisanStory: {
            bio: "Anand Kumar is a third-generation weaver from Mysore, dedicated to preserving the traditional techniques of silk weaving that his family has practiced for a century.",
            imageUrl: "s11.png",
        },
        availability: "In Stock",
        likes: 3200,
        shares: 800,
        isNew: false,
        isTrending: true,
        aiNarrative:
            "A trending masterpiece from Murshidabad, perfect for festive occasions.",
    },
    {
        id: 3,
        name: "Xiaomi 11i Hypercharge 5G",
        category: "Electronics",
        price: 23990,
        originalPrice: 33999,
        rating: 4.5,
        reviewCount: 580,
        artisan: "Tech Innovations Ltd.",
        region: "Jaipur",
        material: "Brass",
        images: [
            "/s12.png",
        ],
        description:
            "A powerful smartphone featuring 120W HyperCharge, a stunning 120Hz AMOLED display, and a 108MP pro-grade camera. Experience flagship performance.",
        details: { dimensions: "163.7 x 76.2 x 8.3 mm", timeToMake: "N/A" },
        artisanStory: {
            bio: "Crafted by leading engineers at Tech Innovations, this device combines cutting-edge technology with sleek, user-friendly design.",
            imageUrl: "/s12.png",
        },
        availability: "In Stock",
        likes: 8500,
        shares: 2100,
        isNew: true,
        isTrending: true,
    },
    {
        id: 4,
        name: "Hand-carved Wooden Elephant",
        category: "Home Decor",
        price: 4500,
        rating: 4.7,
        reviewCount: 95,
        artisan: "Suresh Patel",
        region: "Kutch",
        material: "Wood",
        images: [
            "/s13.png",
        ],
        description:
            "An intricately carved wooden elephant statue, made from sustainably sourced teak wood. A symbol of strength and wisdom for your home.",
        details: { dimensions: '8" L x 7" H', timeToMake: "8 days" },
        artisanStory: {
            bio: "Suresh Patel is a master woodcarver from the Kutch region, known for his detailed and lifelike animal sculptures.",
            imageUrl:
                "/s13.png",
        },
        availability: "Out of Stock",
        likes: 980,
        shares: 220,
        isNew: false,
    },
    {
        id: 5,
        name: "Bankura Terracotta Horse",
        category: "Home Decor",
        price: 3500,
        originalPrice: 4200,
        rating: 4.9,
        reviewCount: 155,
        artisan: "Aditya Das",
        region: "Bankura",
        material: "Terracotta",
        images: ["/s14.png"],
        description:
            "A classic symbol of Indian folk art, the Bankura horse is known for its elegant, symmetrical shape and earthy appeal. Handmade by terracotta artisans.",
        details: { dimensions: '15" H x 9" W', timeToMake: "7 days" },
        artisanStory: {
            bio: "Aditya Das belongs to a family that has been creating terracotta masterpieces in Bankura for generations, keeping the ancient art form alive.",
            imageUrl:
                "/s14.png",
        },
        availability: "In Stock",
        likes: 2200,
        shares: 550,
        isNew: true,
        isTrending: true,
        aiNarrative:
            "Handpicked for Durga Puja celebrations, adding a traditional touch.",
    },
    {
        id: 6,
        name: "Murshidabad Kantha Stitch Saree",
        category: "Fashion",
        price: 12500,
        rating: 4.8,
        reviewCount: 98,
        artisan: "Fatima Begum",
        region: "Murshidabad",
        material: "Silk",
        images: ["/s10.png"],
        description:
            "An exquisite silk saree adorned with intricate Kantha embroidery, a traditional craft of Bengal. Each motif tells a story, making it a wearable piece of art.",
        details: { dimensions: "5.5 meters", timeToMake: "25 days" },
        artisanStory: {
            bio: "Fatima Begum leads a cooperative of women artisans in Murshidabad, empowering them through the art of Kantha stitch and preserving this beautiful heritage.",
            imageUrl:
                "/s10.png",
        },
        availability: "In Stock",
        likes: 4100,
        shares: 900,
        isNew: false,
        isTrending: true,
        aiNarrative:
            "A trending masterpiece from Murshidabad, perfect for festive occasions.",
    },
    {
        id: 7,
        name: "Purulia Chhau Mask",
        category: "Home Decor",
        price: 2800,
        rating: 4.7,
        reviewCount: 75,
        artisan: "Gouranga Sutradhar",
        region: "Purulia",
        material: "Paper Mache",
        images: ["/s10.png"],
        description:
            "A vibrant and dramatic Chhau dance mask from Purulia. Traditionally used in folk dance-dramas, these masks are now celebrated as unique decorative artifacts.",
        details: { dimensions: '14" H x 10" W', timeToMake: "10 days" },
        artisanStory: {
            bio: "Gouranga Sutradhar is a renowned Chhau mask maker, whose creations have been featured in cultural festivals across the globe.",
            imageUrl:
                "/s10.png",
        },
        availability: "In Stock",
        likes: 1800,
        shares: 400,
        isNew: true,
    },
    {
        id: 8,
        name: "Dokra Peacock Figurine",
        category: "Jewelry",
        price: 1999,
        originalPrice: 2500,
        rating: 4.9,
        reviewCount: 210,
        artisan: "Shambhu Karmakar",
        region: "Bankura",
        material: "Dokra",
        images: ["/s10.png"],
        description:
            "A stunning peacock figurine crafted using the ancient Dokra art of lost-wax metal casting. Its intricate details and rustic charm make it a perfect collectible.",
        details: { dimensions: '6" H x 5" W', timeToMake: "12 days" },
        artisanStory: {
            bio: "Shambhu Karmakar from Bankura is keeping the 4,000-year-old Dokra craft alive, creating mesmerizing metal figurines with his ancestral knowledge.",
            imageUrl:
                "/s10.png",
        },
        availability: "In Stock",
        likes: 3500,
        shares: 750,
        isNew: false,
        collection: "Rakhi",
        aiNarrative:
            "This Dokra figurine from Bankura carries 400 years of tradition.",
    },
    {
        id: 9,
        name: "Coochbehar Shital Pati Mat",
        category: "Home Decor",
        price: 1500,
        rating: 4.8,
        reviewCount: 65,
        artisan: "Amina Khatun",
        region: "Coochbehar",
        material: "Natural Fibre",
        images: ["/s10.png"],
        description:
            'A handwoven "Shital Pati" or cool mat, made from green cane slips. Known for its natural cooling properties, it is an eco-friendly addition to your home decor.',
        details: { dimensions: "6ft x 4ft", timeToMake: "5 days" },
        artisanStory: {
            bio: "Amina Khatun is a master weaver of Shital Pati in Coochbehar, a craft that has earned a UNESCO Intangible Cultural Heritage tag.",
            imageUrl: "/s10.png",
        },
        availability: "Out of Stock",
        likes: 1200,
        shares: 250,
        isNew: false,
        aiNarrative: "Best eco-friendly bamboo craft for sustainable home décor.",
    },
];
export default () => {
    const topPicks = useMemo(() => [...mockProducts].sort((a, b) => b.likes - a.likes).slice(0, 5), []);
    const trending = useMemo(() => mockProducts.filter(p => p.isTrending), []);

    const artisanOfTheWeek = useMemo(() => mockProducts.map(p => ({ name: p.artisan, bio: p.artisanStory.bio, imageUrl: p.artisanStory.imageUrl })).find(a => a.name === 'Aditya Das'), []);


    return <>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pt-20">
            <div className="min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Explore personalized recommendations and trending crafts.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Search..." className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><SearchIcon className="h-5 w-5 text-gray-400" /></div>
                            </div>
                            <button onClick={handleVoiceSearch} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"><MicIcon /></button>
                            <button onClick={handleRefresh} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"><RefreshCwIcon /></button>
                        </div>
                    </div>

                    {/* Top Picks For You */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Picks Just For You</h2>
                        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
                            {topPicks.map(product => (
                                <div key={product.id} onClick={() => onProductSelect(product)} className="flex-shrink-0 w-64 group cursor-pointer">
                                    <div className="rounded-lg overflow-hidden aspect-square">
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <h3 className="mt-3 font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Trending Now */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trending Now in Your Region</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trending.map(product => (
                                <div key={product.id} onClick={() => onProductSelect(product)} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl cursor-pointer">
                                    <div className="relative"><img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover" /></div>
                                    <div className="p-4">
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate mt-1">{product.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">by {product.artisan}</p>
                                        {product.aiNarrative && <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 p-2 rounded-md">"{product.aiNarrative}"</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Artisan of the Week */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Artisan of the Week</h2>
                        {artisanOfTheWeek && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
                                <img src={artisanOfTheWeek.imageUrl} alt={artisanOfTheWeek.name} className="w-32 h-32 rounded-full object-cover flex-shrink-0" />
                                <div className="text-center md:text-left">
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Featured Artisan</p>
                                    <h3 className="text-xl font-bold mt-1 dark:text-white">{artisanOfTheWeek.name}</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-lg">{artisanOfTheWeek.bio}</p>
                                    <button className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">View Profile</button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* AI Suggested Tags */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Suggested Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {aiTags.map(tag => (
                                <button key={tag} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
}
