"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Star, LayoutGrid, List, Clock, User, ShoppingCart, Twitter, Linkedin, Dribbble, Youtube } from 'lucide-react';

// --- TYPE DEFINITIONS ---
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

type Product = {
    id: number;
    name: string;
    creatorName: string;
    imageUrl: string;
    price: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    isFeatured: boolean;
};

// --- MOCK DATA ---
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

const productsData: Product[] = [
    { id: 1, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: true },
    { id: 2, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: true },
    { id: 3, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: true },
    { id: 4, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: true },
    { id: 5, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['container'], isFeatured: true },
    { id: 6, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: true },
    { id: 7, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['tag', 'tag', 'tag'], isFeatured: false },
    { id: 8, name: 'Product name', creatorName: 'Alex Chen', imageUrl: 'https://placehold.co/300x200/e2e8f0/e2e8f0', price: 12.99, rating: 4.8, reviewCount: 234, tags: ['container'], isFeatured: true },
];

// --- SUB-COMPONENTS ---

const Header: React.FC = () => (
    <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 7 0 2.657-1.343 2.657-1.343a8 8 0 010 10z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-bold text-lg">AI3D Studio</span>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm">
                    <a href="#" className="hover:text-purple-400">Home</a>
                    <a href="#" className="text-purple-400 font-semibold">Marketplace</a>
                    <a href="#" className="hover:text-purple-400">Explore</a>
                    <a href="#" className="hover:text-purple-400">About</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="hidden md:flex items-center space-x-2 text-sm hover:text-purple-400">
                    <Clock size={16} />
                    <span>Watch Demo</span>
                </a>
                <a href="#" className="text-sm hover:text-purple-400">Sign In</a>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Sign Up
                </button>
            </div>
        </div>
    </header>
);

const Footer: React.FC = () => (
    <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 7 0 2.657-1.343 2.657-1.343a8 8 0 010 10z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-bold text-xl text-white">AI3D Studio</span>
                </div>
                <p className="text-sm mb-6">Empowering creators worldwide with AI-powered 3D model generation. Transform your ideas into stunning 3D content in seconds.</p>
                <div className="flex space-x-4">
                    <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple-600"><Twitter size={16} /></a>
                    <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple-600"><Linkedin size={16} /></a>
                    <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple-600"><Dribbble size={16} /></a>
                    <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-purple-600"><Youtube size={16} /></a>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-white mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Features</a></li>
                    <li><a href="#" className="hover:text-white">Pricing</a></li>
                    <li><a href="#" className="hover:text-white">API</a></li>
                    <li><a href="#" className="hover:text-white">Documentation</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-white mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">About</a></li>
                    <li><a href="#" className="hover:text-white">Blog</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Press</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-white mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Community</a></li>
                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                    <li><a href="#" className="hover:text-white">Tutorials</a></li>
                    <li><a href="#" className="hover:text-white">Status</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                    <li><a href="#" className="hover:text-white">GDPR</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-800">
            <div className="container mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs">
                <p>&copy; 2024 AI3D Studio. All rights reserved.</p>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span>Made with <span className="text-red-500">&hearts;</span> for creators</span>
                    <span className="flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> All systems operational</span>
                </div>
            </div>
        </div>
    </footer>
);


const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => (
    <div className="bg-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-600">
        <div className="relative h-32 bg-gray-600 flex items-center justify-center">
            {creator.isFeatured && <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Featured</div>}
            <img src={creator.avatarUrl} alt={creator.name} className="w-20 h-20 rounded-full border-4 border-gray-700" />
        </div>
        <div className="p-4">
            <h3 className="font-bold text-lg text-white">{creator.shopName}</h3>
            <p className="text-sm text-gray-400 mb-2">by {creator.name}</p>
            <div className="flex flex-wrap gap-2 mb-3">
                {creator.tags.map(tag => <span key={tag} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="flex items-center text-sm text-gray-400 mb-4">
                <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                <span className="text-white font-bold">{creator.rating}</span>
                <span className="ml-1">({creator.reviewCount})</span>
                <span className="mx-2">·</span>
                <span>{creator.followers} Followers</span>
                <span className="mx-2">·</span>
                <span>{creator.products} Products</span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
                Follow
            </button>
        </div>
    </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-600">
        <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            {product.isFeatured && <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Featured</div>}
        </div>
        <div className="p-4">
            <h3 className="font-bold text-lg text-white truncate">{product.name}</h3>
            <div className="flex flex-wrap gap-2 my-2">
                {product.tags.map(tag => <span key={tag} className="text-xs text-gray-400">#{tag}</span>)}
            </div>
            <div className="flex items-center text-sm text-gray-400 mb-3">
                <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                <span className="text-white font-bold">{product.rating}</span>
                <span className="ml-1">({product.reviewCount})</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">${product.price}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Buy Now
                </button>
            </div>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<'creator' | 'product'>('creator');

    return (
        <div className="bg-gray-800 min-h-screen font-sans">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Filter and View Toggles */}
                <div className="bg-gray-700/50 border border-gray-600 p-4 rounded-xl mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative flex-grow w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search models, creators, or tags..."
                                className="bg-gray-800 border border-gray-600 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <select className="appearance-none bg-gray-800 border border-gray-600 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>All Categories</option>
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                </select>
                                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative flex-grow">
                                <select className="appearance-none bg-gray-800 border border-gray-600 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>All Prices</option>
                                    <option>Under $10</option>
                                    <option>$10 - $50</option>
                                </select>
                                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative flex-grow">
                                <select className="appearance-none bg-gray-800 border border-gray-600 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>Popular</option>
                                    <option>Newest</option>
                                    <option>Trending</option>
                                </select>
                                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-1">
                            <button className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400"><List size={20} /></button>
                            <button className="p-1.5 rounded-md bg-gray-600 text-white"><LayoutGrid size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* Creator / Product Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-700/50 border border-gray-600 p-1 rounded-lg flex space-x-1">
                        <button
                            onClick={() => setActiveView('creator')}
                            className={`px-16 py-2 rounded-md text-sm font-semibold ${activeView === 'creator' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            Creator
                        </button>
                        <button
                            onClick={() => setActiveView('product')}
                            className={`px-16 py-2 rounded-md text-sm font-semibold ${activeView === 'product' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            Product
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeView === 'creator'
                        ? creatorsData.map(creator => <CreatorCard key={creator.id} creator={creator} />)
                        : productsData.map(product => <ProductCard key={product.id} product={product} />)
                    }
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
                        Load More Models
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default App;
