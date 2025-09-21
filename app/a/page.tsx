"use client";
import React, { useState, useMemo, useCallback, useEffect } from 'react';

// --- Helper Functions & Mock Data ---

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// --- SVG Icons (as React Components) ---
const ShoppingCartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const HeartIcon = ({ className = "w-6 h-6", isFilled = false }: { className?: string, isFilled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const StarIcon = ({ className = "w-5 h-5", isFilled = true }: { className?: string, isFilled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const SearchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const PlusIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const TrashIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const UserIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const ShareIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
);
const XIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ChevronRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const MessageSquareIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const MicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
);
const RefreshCwIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);
const LogOutIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);
const MapPinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const SunIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const GlobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);


// Social Icons
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.55 0 .68-.07.13-.5.55-1.13.88-.63.33-1.13.43-1.63.3-1.07-.27-1.93-.7-2.75-1.53-1.07-1.06-1.7-2.25-1.88-2.5-.17-.24-.4-.4-.4-.68s0-.55.13-.68c.13-.13.3-.2.44-.2.13 0 .27 0 .4.13.13.13.2.3.27.43.13.27.27.55.4.68.13.13.2.2.27.33.07 0 .13-.07.2-.2.13-.27.13-.55 0-.8-.13-.27-.27-.4-.4-.55-.2-.2-.4-.27-.55-.33-.13-.07-.27-.07-.4 0-.13.07-.27.13-.4.27-.13.13-.2.27-.27.4-.2.4-.33.8-.43 1.2a4.3 4.3 0 00.13 2.5c.27.8.7 1.53 1.3 2.13.8.8 1.73 1.33 2.8 1.6.33.13.68.2 1.02.2.4 0 .8-.07 1.14-.2.33-.13.6-.3.8-.55.2-.27.33-.55.4-.88.07-.33.07-.68 0-1.02-.07-.33-.2-.55-.4-.68-.13-.13-.27-.13-.4-.13-.13 0-.27 0-.4.07z M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" /></svg>;
const PinterestIcon = () => <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.8 7.9 6.8 9.3-.1-1.1.2-2.3.5-3.2.3-.9.9-1.9.9-1.9s-.2-.5-.2-1.2c0-1.1.7-1.9 1.5-1.9.7 0 1 .5 1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.4 0 2.5-1.5 2.5-3.7 0-2-1.4-3.4-3.5-3.4-2.4 0-3.9 1.8-3.9 3.6 0 .7.3 1.5.6 1.9.1.1.1.2 0 .3-.1.3-.2.8-.2 1 0 .1-.1.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-2.8 2.1-5.6 5.8-5.6 3.1 0 5.4 2.2 5.4 5.1 0 3-1.9 5.3-4.5 5.3-.9 0-1.7-.5-2-1.1 0 0-.5 1.8-.6 2.2-.3.9-1 1.9-1.5 2.5.3.1.6.1.9.1 4.5 0 8.2-3.7 8.2-8.2C22 6.5 17.5 2 12 2z" /></svg>;
const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.03A4.37 4.37 0 0016.14 4c-2.45 0-4.43 1.98-4.43 4.43 0 .35.04.69.11 1.02-3.68-.18-6.94-1.95-9.13-4.62-.38.65-.6 1.41-.6 2.24 0 1.54.78 2.89 1.97 3.68-.72-.02-1.4-.22-1.99-.55v.05c0 2.14 1.52 3.93 3.54 4.33-.37.1-.76.15-1.16.15-.28 0-.56-.03-.83-.08.56 1.76 2.18 3.03 4.1 3.07-1.51 1.18-3.42 1.89-5.49 1.89-.36 0-.71-.02-1.06-.06 1.95 1.25 4.27 1.98 6.74 1.98 8.09 0 12.52-6.7 12.52-12.52 0-.19 0-.38-.01-.57.86-.62 1.6-1.4 2.2-2.28z" /></svg>;
const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2c2.72 0 3.05.01 4.12.06 1.06.05 1.79.22 2.42.47.65.25 1.13.59 1.64 1.1.5.5.85.98 1.1 1.64.25.63.42 1.36.47 2.42.05 1.07.06 1.4.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.42-.25.65-.59 1.13-1.1 1.64-.5.5-.98.85-1.64 1.1-.63.25-1.36.42-2.42.47-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.42-.47-.65-.25-1.13-.59-1.64-1.1-.5-.5-.85-.98-1.1-1.64-.25-.63-.42-1.36-.47-2.42-.05-1.07-.06-1.4-.06-4.12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.42.25-.65.59-1.13 1.1-1.64.5-.5.98-.85 1.64-1.1.63-.25 1.36-.42 2.42-.47C8.95 2.01 9.28 2 12 2zm0 1.8c-2.69 0-3.01.01-4.07.06-1.03.05-1.63.21-2.12.42-.53.2-.89.47-1.29.87-.4.4-.67.76-.87 1.29-.21.5-.37 1.09-.42 2.12-.05 1.06-.06 1.38-.06 4.07s.01 3.01.06 4.07c.05 1.03.21 1.63.42 2.12.2.53.47.89.87 1.29.4.4.76.67 1.29.87.5.21 1.09.37 2.12.42 1.06.05 1.38.06 4.07.06s3.01-.01 4.07-.06c1.03-.05 1.63-.21 2.12-.42.53-.2.89-.47 1.29-.87.4-.4.67-.76.87-1.29.21-.5.37-1.09.42-2.12.05-1.06.06-1.38.06-4.07s-.01-3.01-.06-4.07c-.05-1.03-.21-1.63-.42-2.12-.2-.53-.47-.89-.87-1.29-.4-.4-.76-.67-1.29-.87-.5-.21-1.09-.37-2.12-.42C15.01 3.81 14.69 3.8 12 3.8zm0 4.33c-2.27 0-4.1 1.83-4.1 4.1s1.83 4.1 4.1 4.1 4.1-1.83 4.1-4.1-1.83-4.1-4.1-4.1zm0 6.51c-1.33 0-2.41-1.08-2.41-2.41S10.67 9.59 12 9.59s2.41 1.08 2.41 2.41-1.08 2.41-2.41 2.41zm4.87-6.39c-.58 0-1.05-.47-1.05-1.05s.47-1.05 1.05-1.05 1.05.47 1.05 1.05-.47 1.05-1.05 1.05z" /></svg>;
const LinkedInIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-11 5H5v10h3V8zm-1.5-2.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19 8h-3a3.02 3.02 0 00-3 3v7h3v-7c0-1.1.9-2 2-2s2 .9 2 2v7h3V11a3.02 3.02 0 00-3-3z" /></svg>;


// --- Type Definitions ---
type User = { id: number; name: string; email: string; };
type Product = {
    id: number; name: string; category: 'Electronics' | 'Home Decor' | 'Fashion' | 'Jewelry'; price: number; originalPrice?: number; rating: number; reviewCount: number; artisan: string; region: string; material: string; images: string[]; description: string; details: { dimensions: string; timeToMake: string; }; artisanStory: { bio: string; imageUrl: string; }; availability: 'In Stock' | 'Out of Stock'; likes: number; shares: number; isNew: boolean; isTrending?: boolean; collection?: 'Diwali' | 'Holi' | 'Rakhi';
    aiNarrative?: string;
};
type CartItem = Product & { quantity: number; };
type BlogPost = { id: number; title: string; author: string; date: string; imageUrl: string; excerpt: string; };

// --- Mock Data ---
const mockProducts: Product[] = [
    { id: 1, name: 'Hand-Painted Ceramic Vase', category: 'Home Decor', price: 2499, originalPrice: 3999, rating: 4.8, reviewCount: 124, artisan: 'Rina Devi', region: 'Jaipur', material: 'Clay', images: ['https://placehold.co/800x800/a2d2ff/ffffff?text=Vase+1', 'https://placehold.co/800x800/a2d2ff/ffffff?text=Vase+2', 'https://placehold.co/800x800/a2d2ff/ffffff?text=Vase+3'], description: 'A beautifully hand-painted ceramic vase, perfect for adding a touch of elegance to any room. Each piece is unique, showcasing the rich heritage of Jaipur pottery.', details: { dimensions: '12" H x 6" W', timeToMake: '5 days' }, artisanStory: { bio: 'Rina Devi has been perfecting her craft for over 20 years, learning the art of pottery from her mother. Her workshop in Jaipur is a hub of creativity and tradition.', imageUrl: 'https://placehold.co/400x300/f2d7d5/ffffff?text=Artisan+Rina' }, availability: 'In Stock', likes: 1500, shares: 450, isNew: true, collection: 'Diwali' },
    { id: 2, name: 'Mysore Silk Saree', category: 'Fashion', price: 8999, rating: 4.9, reviewCount: 250, artisan: 'Anand Kumar', region: 'Mysore', material: 'Silk', images: ['https://placehold.co/800x800/fec89a/ffffff?text=Saree+1', 'https://placehold.co/800x800/fec89a/ffffff?text=Saree+2'], description: 'Experience luxury with this authentic Mysore silk saree, known for its softness, lustre, and durability. Woven with pure silk and real gold zari.', details: { dimensions: '6.25 meters', timeToMake: '15 days' }, artisanStory: { bio: 'Anand Kumar is a third-generation weaver from Mysore, dedicated to preserving the traditional techniques of silk weaving that his family has practiced for a century.', imageUrl: 'https://placehold.co/400x300/d4a373/ffffff?text=Artisan+Anand' }, availability: 'In Stock', likes: 3200, shares: 800, isNew: false, isTrending: true, aiNarrative: 'A trending masterpiece from Murshidabad, perfect for festive occasions.' },
    { id: 3, name: 'Xiaomi 11i Hypercharge 5G', category: 'Electronics', price: 23990, originalPrice: 33999, rating: 4.5, reviewCount: 580, artisan: 'Tech Innovations Ltd.', region: 'Jaipur', material: 'Brass', images: ['https://rukminim2.flixcart.com/image/832/832/l1fc0i80/mobile/p/y/d/-original-imagcz23rk9y69mm.jpeg?q=70&crop=false', 'https://placehold.co/800x800/c7f9cc/ffffff?text=Phone+2', 'https://placehold.co/800x800/c7f9cc/ffffff?text=Phone+3'], description: 'A powerful smartphone featuring 120W HyperCharge, a stunning 120Hz AMOLED display, and a 108MP pro-grade camera. Experience flagship performance.', details: { dimensions: '163.7 x 76.2 x 8.3 mm', timeToMake: 'N/A' }, artisanStory: { bio: 'Crafted by leading engineers at Tech Innovations, this device combines cutting-edge technology with sleek, user-friendly design.', imageUrl: 'https://placehold.co/400x300/80ed99/ffffff?text=Tech+Factory' }, availability: 'In Stock', likes: 8500, shares: 2100, isNew: true, isTrending: true },
    { id: 4, name: 'Hand-carved Wooden Elephant', category: 'Home Decor', price: 4500, rating: 4.7, reviewCount: 95, artisan: 'Suresh Patel', region: 'Kutch', material: 'Wood', images: ['https://placehold.co/800x800/e5e5e5/000000?text=Elephant+1', 'https://placehold.co/800x800/e5e5e5/000000?text=Elephant+2'], description: 'An intricately carved wooden elephant statue, made from sustainably sourced teak wood. A symbol of strength and wisdom for your home.', details: { dimensions: '8" L x 7" H', timeToMake: '8 days' }, artisanStory: { bio: 'Suresh Patel is a master woodcarver from the Kutch region, known for his detailed and lifelike animal sculptures.', imageUrl: 'https://placehold.co/400x300/a3b18a/ffffff?text=Artisan+Suresh' }, availability: 'Out of Stock', likes: 980, shares: 220, isNew: false },
    { id: 5, name: 'Bankura Terracotta Horse', category: 'Home Decor', price: 3500, originalPrice: 4200, rating: 4.9, reviewCount: 155, artisan: 'Aditya Das', region: 'Bankura', material: 'Terracotta', images: ['https://placehold.co/800x800/d68c45/ffffff?text=Bankura+Horse'], description: 'A classic symbol of Indian folk art, the Bankura horse is known for its elegant, symmetrical shape and earthy appeal. Handmade by terracotta artisans.', details: { dimensions: '15" H x 9" W', timeToMake: '7 days' }, artisanStory: { bio: 'Aditya Das belongs to a family that has been creating terracotta masterpieces in Bankura for generations, keeping the ancient art form alive.', imageUrl: 'https://placehold.co/400x300/c19a6b/ffffff?text=Artisan+Aditya' }, availability: 'In Stock', likes: 2200, shares: 550, isNew: true, isTrending: true, aiNarrative: 'Handpicked for Durga Puja celebrations, adding a traditional touch.' },
    { id: 6, name: 'Murshidabad Kantha Stitch Saree', category: 'Fashion', price: 12500, rating: 4.8, reviewCount: 98, artisan: 'Fatima Begum', region: 'Murshidabad', material: 'Silk', images: ['https://placehold.co/800x800/f8ad9d/ffffff?text=Kantha+Saree'], description: 'An exquisite silk saree adorned with intricate Kantha embroidery, a traditional craft of Bengal. Each motif tells a story, making it a wearable piece of art.', details: { dimensions: '5.5 meters', timeToMake: '25 days' }, artisanStory: { bio: 'Fatima Begum leads a cooperative of women artisans in Murshidabad, empowering them through the art of Kantha stitch and preserving this beautiful heritage.', imageUrl: 'https://placehold.co/400x300/f4a261/ffffff?text=Artisan+Fatima' }, availability: 'In Stock', likes: 4100, shares: 900, isNew: false, isTrending: true, aiNarrative: "A trending masterpiece from Murshidabad, perfect for festive occasions." },
    { id: 7, name: 'Purulia Chhau Mask', category: 'Home Decor', price: 2800, rating: 4.7, reviewCount: 75, artisan: 'Gouranga Sutradhar', region: 'Purulia', material: 'Paper Mache', images: ['https://placehold.co/800x800/83c5be/ffffff?text=Chhau+Mask'], description: 'A vibrant and dramatic Chhau dance mask from Purulia. Traditionally used in folk dance-dramas, these masks are now celebrated as unique decorative artifacts.', details: { dimensions: '14" H x 10" W', timeToMake: '10 days' }, artisanStory: { bio: 'Gouranga Sutradhar is a renowned Chhau mask maker, whose creations have been featured in cultural festivals across the globe.', imageUrl: 'https://placehold.co/400x300/6a994e/ffffff?text=Artisan+Gouranga' }, availability: 'In Stock', likes: 1800, shares: 400, isNew: true },
    { id: 8, name: 'Dokra Peacock Figurine', category: 'Jewelry', price: 1999, originalPrice: 2500, rating: 4.9, reviewCount: 210, artisan: 'Shambhu Karmakar', region: 'Bankura', material: 'Dokra', images: ['https://placehold.co/800x800/ffd166/ffffff?text=Dokra+Peacock'], description: 'A stunning peacock figurine crafted using the ancient Dokra art of lost-wax metal casting. Its intricate details and rustic charm make it a perfect collectible.', details: { dimensions: '6" H x 5" W', timeToMake: '12 days' }, artisanStory: { bio: 'Shambhu Karmakar from Bankura is keeping the 4,000-year-old Dokra craft alive, creating mesmerizing metal figurines with his ancestral knowledge.', imageUrl: 'https://placehold.co/400x300/e9c46a/ffffff?text=Artisan+Shambhu' }, availability: 'In Stock', likes: 3500, shares: 750, isNew: false, collection: 'Rakhi', aiNarrative: 'This Dokra figurine from Bankura carries 400 years of tradition.' },
    { id: 9, name: 'Coochbehar Shital Pati Mat', category: 'Home Decor', price: 1500, rating: 4.8, reviewCount: 65, artisan: 'Amina Khatun', region: 'Coochbehar', material: 'Natural Fibre', images: ['https://placehold.co/800x800/a9def9/ffffff?text=Shital+Pati'], description: 'A handwoven "Shital Pati" or cool mat, made from green cane slips. Known for its natural cooling properties, it is an eco-friendly addition to your home decor.', details: { dimensions: '6ft x 4ft', timeToMake: '5 days' }, artisanStory: { bio: 'Amina Khatun is a master weaver of Shital Pati in Coochbehar, a craft that has earned a UNESCO Intangible Cultural Heritage tag.', imageUrl: 'https://placehold.co/400x300/bde0fe/ffffff?text=Artisan+Amina' }, availability: 'Out of Stock', likes: 1200, shares: 250, isNew: false, aiNarrative: 'Best eco-friendly bamboo craft for sustainable home décor.' },
];

const mockBlogPosts: BlogPost[] = [
    { id: 1, title: 'The Weaving Wisdom of Anand Kumar', author: 'RealityLoop Staff', date: 'Sep 12, 2025', imageUrl: 'https://placehold.co/800x500/d4a373/ffffff?text=Anand+at+Loom', excerpt: 'Step into the world of Mysore silk with Anand Kumar, a third-generation weaver dedicated to preserving the traditional techniques that make each saree a masterpiece.' },
    { id: 2, title: 'Rina Devi and the Magic of Blue Pottery', author: 'RealityLoop Staff', date: 'Sep 05, 2025', imageUrl: 'https://placehold.co/800x500/f2d7d5/ffffff?text=Rina+with+Pottery', excerpt: 'Discover how Rina Devi transforms simple clay into stunning works of art, keeping the centuries-old tradition of Jaipur blue pottery alive and vibrant for a new generation.' },
    { id: 3, title: 'Preserving Heritage: The Dokra Art of Shambhu Karmakar', author: 'RealityLoop Staff', date: 'Aug 28, 2025', imageUrl: 'https://placehold.co/800x500/e9c46a/ffffff?text=Shambhu+and+Dokra', excerpt: 'Journey with Shambhu Karmakar as he practices the 4,000-year-old craft of Dokra, creating mesmerizing metal figurines using the ancient lost-wax casting technique.' },
];


// --- Header Component ---
const Header = ({ onNavigate, cartItemCount, user, onLogout, isDarkMode, setIsDarkMode }: { onNavigate: (page: string, params?: any) => void; cartItemCount: number; user: User | null; onLogout: () => void; isDarkMode: boolean; setIsDarkMode: (value: boolean) => void; }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const NavLink = ({ page, children, className = "" }: { page: string; children: React.ReactNode, className?: string }) => (
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(page); setIsMenuOpen(false); }} className={`block lg:inline-block py-2 lg:py-0 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${className}`}>
            {children}
        </a>
    );

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="text-3xl font-bold text-gray-900 dark:text-white">
                            RealityLoop
                        </a>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink page="catalog">Marketplace</NavLink>
                        <NavLink page="blog">Artisan Stories</NavLink>
                        <NavLink page="catalog">Explore</NavLink>
                        <NavLink page="aiPicks">AI Picks</NavLink>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="hidden sm:flex items-center space-x-3">
                            <div className="relative">
                                <select className="appearance-none bg-transparent text-sm font-medium focus:outline-none pr-6">
                                    <option>Language</option>
                                    <option>English</option>
                                    <option>Hindi</option>
                                </select>
                                <ChevronDownIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                            </div>
                            <NavLink page="becomeSeller" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-4 py-2 rounded-lg text-sm !text-gray-800 hover:!text-black">Become a Seller</NavLink>
                        </div>

                        <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <ShoppingCartIcon className="h-6 w-6" />
                            {cartItemCount > 0 && (<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">{cartItemCount}</span>)}
                        </button>

                        {user ? (
                            <button onClick={() => onNavigate('profile')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><UserIcon className="h-6 w-6" /></button>
                        ) : (
                            <button onClick={() => onNavigate('login')} className="hidden lg:block text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg">Login</button>
                        )}

                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md">
                                <MenuIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden pb-4">
                        <nav className="flex flex-col space-y-3">
                            <NavLink page="catalog">Marketplace</NavLink>
                            <NavLink page="blog">Artisan Stories</NavLink>
                            <NavLink page="catalog">Explore</NavLink>
                            <NavLink page="aiPicks">AI Picks</NavLink>
                            <hr className="dark:border-gray-700" />
                            <NavLink page="becomeSeller">Become a Seller</NavLink>
                            {!user && <NavLink page="login">Login</NavLink>}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

// --- Footer Component ---
const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">About</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms</a>
            </div>
            <p>&copy; 2025 RealityLoop. All Rights Reserved.</p>
        </div>
    </footer>
);


// --- Landing Page Component ---
const LandingPage = ({ onNavigate, onProductSelect }: { onNavigate: (page: string, params?: any) => void; onProductSelect: (product: Product) => void; }) => {

    const featuredArtisans = [
        { name: 'Ramesh', craft: 'Pottery', image: 'https://placehold.co/200x250/f2d7d5/333333?text=Ramesh' },
        { name: 'Priya', craft: 'Weaving', image: 'https://placehold.co/200x250/d4a373/333333?text=Priya' },
        { name: 'Arjun', craft: 'Wood Carving', image: 'https://placehold.co/200x250/a3b18a/333333?text=Arjun' },
        { name: 'Meera', craft: 'Painting', image: 'https://placehold.co/200x250/a2d2ff/333333?text=Meera' },
        { name: 'Vikram', craft: 'Jewelry', image: 'https://placehold.co/200x250/e9c46a/333333?text=Vikram' },
    ];

    const regions = [
        { name: 'Kashmir', image: 'https://placehold.co/400x300/c7f9cc/333333?text=Kashmir' },
        { name: 'Rajasthan', image: 'https://placehold.co/400x300/fec89a/333333?text=Rajasthan' },
        { name: 'Kerala', image: 'https://placehold.co/400x300/a9def9/333333?text=Kerala' },
        { name: 'Uttar Pradesh', image: 'https://placehold.co/400x300/f8ad9d/333333?text=UP' },
        { name: 'Gujarat', image: 'https://placehold.co/400x300/ffd166/333333?text=Gujarat' },
        { name: 'Tamil Nadu', image: 'https://placehold.co/400x300/bde0fe/333333?text=Tamil+Nadu' },
        { name: 'West Bengal', image: 'https://placehold.co/400x300/ffc09f/333333?text=Bengal' },
        { name: 'Maharashtra', image: 'https://placehold.co/400x300/ffee99/333333?text=Maharashtra' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-cover bg-center h-[70vh] text-white" style={{ backgroundImage: "url('https://placehold.co/1800x1000/8a5a44/ffffff?text=Artisan+at+Work')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Discover the Soul of India Through Crafts</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl">Explore a curated collection of handcrafted treasures, each telling a story of tradition and artistry.</p>
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="mt-8 bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                    >
                        Explore Crafts
                    </button>
                </div>
            </section>

            {/* Featured Artisans */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Featured Artisans</h2>
                    <div className="flex justify-center space-x-4 sm:space-x-8 overflow-x-auto pb-4">
                        {featuredArtisans.map(artisan => (
                            <div key={artisan.name} className="flex-shrink-0 text-center group cursor-pointer">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto border-4 border-transparent group-hover:border-amber-700/50 transition-all">
                                    <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-200">{artisan.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{artisan.craft}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore by Region */}
            <section className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Explore Crafts by Region</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {regions.map(region => (
                            <div key={region.name} className="relative rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <img src={region.image} alt={region.name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-white text-lg font-bold">{region.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- Product Card Component ---
const ProductCard = ({ product, onProductSelect, onAddToCart, onToggleWishlist, isWishlisted }: { product: Product; onProductSelect: (product: Product) => void; onAddToCart: (product: Product, quantity: number) => void; onToggleWishlist: (productId: number) => void; isWishlisted: boolean; }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><div className="relative"><img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover cursor-pointer" onClick={() => onProductSelect(product)} />{product.originalPrice && (<div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</div>)}<div onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }} className="absolute top-2 right-2 p-1.5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white dark:hover:bg-gray-900"><HeartIcon className={`w-5 h-5 ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-300 hover:text-red-500'}`} isFilled={isWishlisted} /></div><div className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}><button onClick={() => onAddToCart(product, 1)} className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors">Add to Cart</button></div></div><div className="p-4"><p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p><h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate mt-1 cursor-pointer" onClick={() => onProductSelect(product)}>{product.name}</h3><div className="mt-2 flex items-center justify-between"><p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</p>{product.originalPrice && (<p className="text-sm text-gray-500 dark:text-gray-400 line-through">{formatCurrency(product.originalPrice)}</p>)}</div><div className="mt-2 flex items-center"><StarIcon className="text-yellow-400 w-4 h-4" /><span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span><span className="text-sm text-gray-400 dark:text-gray-500 ml-2">({product.reviewCount})</span></div></div></div>
    );
};

// --- Product Catalog Component ---
const ProductCatalog = ({ onProductSelect, onAddToCart, onToggleWishlist, wishlist }: { onProductSelect: (product: Product) => void; onAddToCart: (product: Product, quantity: number) => void; onToggleWishlist: (productId: number) => void; wishlist: number[]; }) => {
    const [filters, setFilters] = useState({ category: 'All', priceRange: 'All', region: 'All', material: 'All', artisan: 'All', });
    const [sort, setSort] = useState('relevance');
    const handleFilterChange = (filterName: string, value: string) => { setFilters(prev => ({ ...prev, [filterName]: value })); };
    const uniqueArtisans = [...new Set(mockProducts.map(p => p.artisan))];
    const uniqueRegions = [...new Set(mockProducts.map(p => p.region))];
    const uniqueMaterials = [...new Set(mockProducts.map(p => p.material))];
    const filteredAndSortedProducts = useMemo(() => {
        let products = [...mockProducts];
        if (filters.category !== 'All') { products = products.filter(p => p.category === filters.category); }
        if (filters.priceRange !== 'All') { const [min, max] = filters.priceRange.split('-').map(Number); products = products.filter(p => p.price >= min && (isNaN(max) || p.price <= max)); }
        if (filters.region !== 'All') { products = products.filter(p => p.region === filters.region); }
        if (filters.material !== 'All') { products = products.filter(p => p.material === filters.material); }
        if (filters.artisan !== 'All') { products = products.filter(p => p.artisan === filters.artisan); }
        switch (sort) {
            case 'price-asc': products.sort((a, b) => a.price - b.price); break;
            case 'price-desc': products.sort((a, b) => b.price - a.price); break;
            case 'newest': products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
            case 'popularity': products.sort((a, b) => b.likes - a.likes); break;
            default: break;
        }
        return products;
    }, [filters, sort]);
    const FilterDropdown = ({ name, options, value, onChange }: { name: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
        <div className="relative"><select name={name} id={name} value={value} onChange={onChange} className="appearance-none w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"><option value="All">{name.charAt(0).toUpperCase() + name.slice(1)}</option>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"><ChevronDownIcon /></div></div>
    );
    return (
        <div className="bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Explore Our Collection</h1><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><FilterDropdown name="category" options={['Electronics', 'Home Decor', 'Fashion', 'Jewelry']} value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)} /><FilterDropdown name="priceRange" options={['0-3000', '3001-10000', '10001-30000']} value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)} /><FilterDropdown name="region" options={uniqueRegions} value={filters.region} onChange={(e) => handleFilterChange('region', e.target.value)} /><FilterDropdown name="material" options={uniqueMaterials} value={filters.material} onChange={(e) => handleFilterChange('material', e.target.value)} /><FilterDropdown name="artisan" options={uniqueArtisans} value={filters.artisan} onChange={(e) => handleFilterChange('artisan', e.target.value)} /><div className="relative col-span-2 md:col-span-4 lg:col-span-1"><select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"><option value="relevance">Sort by: Relevance</option><option value="popularity">Popularity</option><option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"><ChevronDownIcon /></div></div></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredAndSortedProducts.map(product => (<ProductCard key={product.id} product={product} onProductSelect={onProductSelect} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.includes(product.id)} />))}</div></div></div>
    );
};

// --- Image Zoom Modal Component ---
const ImageZoomModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void; }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]" onClick={onClose}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <XIcon className="w-8 h-8" />
        </button>
        <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img src={imageUrl} alt="Zoomed product view" className="w-full h-full object-contain rounded-lg" />
        </div>
    </div>
);

// --- Share Modal Component ---
const ShareModal = ({ product, onClose }: { product: Product; onClose: () => void; }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-2 text-center dark:text-white">Share "{product.name}"</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Share this beautiful craft with your friends!</p>
            <div className="flex justify-center space-x-6">
                <button className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-green-500" onClick={() => alert('Sharing to WhatsApp!')}>
                    <WhatsAppIcon /><span className="text-sm mt-1">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-blue-600" onClick={() => alert('Sharing to Facebook!')}>
                    <FacebookIcon /><span className="text-sm mt-1">Facebook</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-red-600" onClick={() => alert('Sharing to Pinterest!')}>
                    <PinterestIcon /><span className="text-sm mt-1">Pinterest</span>
                </button>
            </div>
            <button onClick={onClose} className="mt-8 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Close</button>
        </div>
    </div>
);


// --- Product Detail Component ---
const ProductDetail = ({ product, onAddToCart, onNavigate, onToggleWishlist, isWishlisted, onProductSelect, onShare }: { product: Product; onAddToCart: (product: Product, quantity: number) => void; onNavigate: (page: string, params?: any) => void; onToggleWishlist: (productId: number) => void; isWishlisted: boolean; onProductSelect: (product: Product) => void; onShare: (product: Product) => void; }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [isZoomModalOpen, setZoomModalOpen] = useState(false);

    const recommendedProducts = useMemo(() => {
        return mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    }, [product]);

    useEffect(() => {
        setMainImage(product.images[0]);
        setQuantity(1);
    }, [product]);

    return (
        <>
            {isZoomModalOpen && <ImageZoomModal imageUrl={mainImage} onClose={() => setZoomModalOpen(false)} />}
            <div className="bg-white dark:bg-gray-800 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div>
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4 cursor-zoom-in" onClick={() => setZoomModalOpen(true)}>
                                <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, index) => (
                                    <div key={index} className={`aspect-square rounded-md cursor-pointer overflow-hidden border-2 ${mainImage === img ? 'border-indigo-600' : 'border-transparent'}`} onClick={() => setMainImage(img)}>
                                        <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Product Info */}
                        <div>
                            <button onClick={() => onNavigate('catalog')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-2">&larr; Back to catalog</button>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{product.rating} ({product.reviewCount} reviews)</span>
                                </div>
                                <span className="text-gray-400 dark:text-gray-500">|</span>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300"><HeartIcon className="w-4 h-4 mr-1.5 text-red-500" isFilled={true} /> {product.likes.toLocaleString()} likes</div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300"><ShareIcon className="w-4 h-4 mr-1.5" /> {product.shares.toLocaleString()} shares</div>
                            </div>
                            <div className="mt-6"><span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(product.price)}</span>{product.originalPrice && (<span className="ml-4 text-xl text-gray-500 dark:text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>)}</div>
                            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                            <div className={`mt-6 p-3 rounded-lg ${product.availability === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}><p className="font-semibold text-sm">{product.availability}</p></div>
                            <div className="mt-8 flex items-center space-x-2"><div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg"><button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"><MinusIcon /></button><span className="px-4 text-lg font-semibold">{quantity}</span><button onClick={() => setQuantity(q => q + 1)} className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"><PlusIcon /></button></div><button onClick={() => onAddToCart(product, quantity)} disabled={product.availability === 'Out of Stock'} className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 flex items-center justify-center"><ShoppingCartIcon className="w-5 h-5 mr-2" />Add to Cart</button><button onClick={() => onToggleWishlist(product.id)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Add to wishlist"><HeartIcon className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`} isFilled={isWishlisted} /></button><button onClick={() => onShare(product)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Share"><ShareIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" /></button></div>
                            <button className="mt-4 w-full bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600">See in My Room (AR Preview)</button>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"><div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg"><h3 className="text-xl font-semibold mb-4 dark:text-white">Product Details</h3><ul className="space-y-2 text-gray-700 dark:text-gray-300"><li><strong>Material:</strong> {product.material}</li><li><strong>Dimensions:</strong> {product.details.dimensions}</li><li><strong>Time to Make:</strong> {product.details.timeToMake}</li><li><strong>Region:</strong> {product.region}</li></ul></div><div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg"><h3 className="text-xl font-semibold mb-4 dark:text-white">Artisan Story</h3><div className="flex items-start space-x-4"><img src={product.artisanStory.imageUrl} alt={product.artisan} className="w-24 h-24 rounded-full object-cover" /><div><h4 className="font-bold dark:text-white">{product.artisan}</h4><p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{product.artisanStory.bio}</p></div></div></div></div>
                    <div className="mt-16"><h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You may also like</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{recommendedProducts.map(p => <ProductCard key={p.id} product={p} onProductSelect={onProductSelect} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={isWishlisted} />)}</div></div>
                </div>
            </div>
        </>
    );
};


// --- Cart Component ---
const Cart = ({ cart, onUpdateCart, onRemoveFromCart, onNavigate }: { cart: CartItem[]; onUpdateCart: (productId: number, quantity: number) => void; onRemoveFromCart: (productId: number) => void; onNavigate: (page: string) => void; }) => {
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [donation, setDonation] = useState(0);
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = useMemo(() => subtotal + shippingCost - discount + donation, [subtotal, shippingCost, discount, donation]);
    const handleApplyCoupon = () => { if (coupon.toUpperCase() === 'ARTISAN10') { const calculatedDiscount = subtotal * 0.10; setDiscount(calculatedDiscount); alert(`Success! ${formatCurrency(calculatedDiscount)} discount applied.`); } else { alert('Invalid coupon code.'); setDiscount(0); } };
    const handleAddDonation = (amount: number) => setDonation(donation + amount);

    if (cart.length === 0) { return (<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"><ShoppingCartIcon className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600" /><h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Your cart is empty</h2><p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p><button onClick={() => onNavigate('catalog')} className="mt-6 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Start Shopping</button></div>); }
    return (<div className="bg-gray-50 dark:bg-gray-900 py-12"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Shopping Cart</h1><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"><ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">{cart.map((item) => (<li key={item.id} className="flex py-6"><div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700"><img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" /></div><div className="ml-4 flex flex-1 flex-col"><div><div className="flex justify-between text-base font-medium text-gray-900 dark:text-white"><h3>{item.name}</h3><p className="ml-4">{formatCurrency(item.price * item.quantity)}</p></div><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p></div><div className="flex flex-1 items-end justify-between text-sm"><div className="flex items-center border border-gray-200 dark:border-gray-600 rounded"><button onClick={() => onUpdateCart(item.id, Math.max(1, item.quantity - 1))} className="p-2 text-gray-500 dark:text-gray-400"><MinusIcon /></button><span className="px-3">{item.quantity}</span><button onClick={() => onUpdateCart(item.id, item.quantity + 1)} className="p-2 text-gray-500 dark:text-gray-400"><PlusIcon /></button></div><div className="flex"><button onClick={() => onRemoveFromCart(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"><TrashIcon className="w-4 h-4 mr-1" /> Remove</button></div></div></div></li>))}</ul></div><div className="lg:col-span-1"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"><h2 className="text-lg font-medium text-gray-900 dark:text-white">Order summary</h2><div className="mt-4"><label htmlFor="coupon-code" className="sr-only">Coupon code</label><div className="flex rounded-md shadow-sm"><input type="text" id="coupon-code" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /><button onClick={handleApplyCoupon} className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Apply</button></div></div><div className="mt-6 space-y-4"><div className="flex items-center justify-between"><p className="text-sm text-gray-600 dark:text-gray-300">Subtotal</p><p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</p></div><div className="flex items-center justify-between"><p className="text-sm text-gray-600 dark:text-gray-300">Shipping estimate</p><p className="text-sm font-medium text-gray-900 dark:text-white">{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</p></div>{discount > 0 && (<div className="flex items-center justify-between text-green-600 dark:text-green-400"><p className="text-sm">Coupon Discount ('ARTISAN10')</p><p className="text-sm font-medium">- {formatCurrency(discount)}</p></div>)}{donation > 0 && (<div className="flex items-center justify-between"><p className="text-sm text-gray-600 dark:text-gray-300">Donation</p><p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(donation)}</p></div>)}<div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between"><p className="text-base font-medium text-gray-900 dark:text-white">Order total</p><p className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(total)}</p></div></div><button onClick={() => onNavigate('checkout')} className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Checkout</button></div><div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white">Support our Artisans</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Add a small donation to help support artisan communities and preserve our cultural heritage.</p>
        <div className="mt-4 flex space-x-2">
            <button onClick={() => handleAddDonation(50)} className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700">{formatCurrency(50)}</button>
            <button onClick={() => handleAddDonation(100)} className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700">{formatCurrency(100)}</button>
            <button onClick={() => handleAddDonation(200)} className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700">{formatCurrency(200)}</button>
        </div>
    </div></div></div></div></div>
    );
};

// --- Checkout Component ---
const Checkout = ({ onNavigate, onOrderPlaced }: { onNavigate: (page: string) => void; onOrderPlaced: () => void; }) => {
    const [step, setStep] = useState('Address');
    const handlePlaceOrder = () => { alert("Order placed successfully!"); onOrderPlaced(); onNavigate('orderHistory'); }
    const ProgressStep = ({ num, title, active }: { num: number, title: string, active: boolean }) => (<div className="flex items-center"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{num}</div><span className={`ml-2 font-medium ${active ? 'text-indigo-600' : 'text-gray-600'}`}>{title}</span></div>);
    return (<div className="bg-gray-50 dark:bg-gray-900 py-12"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Secure Checkout</h1><div className="flex justify-between mb-8"><ProgressStep num={1} title="Address" active={step === 'Address' || step === 'Payment' || step === 'Review'} /><div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 self-center mx-4"></div><ProgressStep num={2} title="Payment" active={step === 'Payment' || step === 'Review'} /><div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 self-center mx-4"></div><ProgressStep num={3} title="Review" active={step === 'Review'} /></div><div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">{step === 'Address' && (<div><h2 className="text-xl font-semibold mb-6 dark:text-white">Shipping Address</h2><form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label><input type="text" id="name" className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div><div className="sm:col-span-2"><label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label><input type="text" id="address" className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></form><button onClick={() => setStep('Payment')} className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Continue to Payment</button></div>)}{step === 'Payment' && (<div><h2 className="text-xl font-semibold mb-6 dark:text-white">Payment Method</h2><div className="space-y-4"><div className="border border-gray-300 dark:border-gray-600 p-4 rounded-md cursor-pointer hover:border-indigo-500">Credit/Debit Card</div></div><button onClick={() => setStep('Review')} className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Review Order</button></div>)}{step === 'Review' && (<div><h2 className="text-xl font-semibold mb-6 dark:text-white">Review Your Order</h2><button onClick={handlePlaceOrder} className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Confirm & Place Order</button></div>)}</div></div></div>);
};

// --- Order History Component ---
const OrderHistory = ({ onNavigate }: { onNavigate: (page: string) => void; }) => {
    const pastOrders = [{ id: 'ORD12345', date: '2025-09-15', total: 2549, status: 'Delivered', items: [mockProducts[0]] }, { id: 'ORD67890', date: '2025-08-20', total: 9049, status: 'Delivered', items: [mockProducts[1]] }];
    return (<div className="bg-gray-50 dark:bg-gray-900 py-12"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Orders</h1><div className="space-y-6">{pastOrders.map(order => (<div key={order.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700"><div className="flex justify-between items-start"><div><p className="text-lg font-semibold">Order #{order.id}</p><p className="text-sm text-gray-500 dark:text-gray-400">Placed on {order.date}</p></div><div className="text-right"><p className="font-semibold">{formatCurrency(order.total)}</p><span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900/50 dark:text-green-300">{order.status}</span></div></div><div className="mt-4 border-t dark:border-gray-700 pt-4">{order.items.map(item => (<div key={item.id} className="flex items-center"><img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-md object-cover" /><p className="ml-4 font-medium text-gray-800 dark:text-gray-200">{item.name}</p></div>))}</div><div className="mt-4 flex space-x-4"><button className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Download Invoice</button><button className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Reorder</button><button className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700">Track Order</button></div></div>))}</div></div></div>);
};

// --- Wishlist Component ---
const Wishlist = ({ wishlist, onProductSelect, onAddToCart, onToggleWishlist, onNavigate }: { wishlist: number[]; onProductSelect: (product: Product) => void; onAddToCart: (product: Product, quantity: number) => void; onToggleWishlist: (productId: number) => void; onNavigate: (page: string) => void; }) => {
    const wishlistedProducts = useMemo(() => mockProducts.filter(p => wishlist.includes(p.id)), [wishlist]);
    if (wishlistedProducts.length === 0) { return (<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"><HeartIcon className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600" /><h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Your wishlist is empty</h2><p className="mt-2 text-gray-500 dark:text-gray-400">Add your favorite items to your wishlist to keep track of them.</p><button onClick={() => onNavigate('catalog')} className="mt-6 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Discover Products</button></div>); }
    return (<div className="bg-gray-50 dark:bg-gray-900 py-12"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Wishlist</h1><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{wishlistedProducts.map(product => (<ProductCard key={product.id} product={product} onProductSelect={onProductSelect} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={true} />))}</div></div></div>);
};

// --- User Profile Component ---
const UserProfile = ({ user, onNavigate, wishlist, onProductSelect, onAddToCart, onToggleWishlist }: { user: User; onNavigate: (page: string) => void; wishlist: number[]; onProductSelect: (product: Product) => void; onAddToCart: (product: Product, quantity: number) => void; onToggleWishlist: (productId: number) => void; }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const wishlistedProducts = useMemo(() => mockProducts.filter(p => wishlist.includes(p.id)), [wishlist]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:space-x-8">
                    <div className="lg:w-1/4 mb-8 lg:mb-0"><div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"><div className="flex items-center space-x-4 mb-6"><img src="https://placehold.co/100x100/e2e8f0/64748b?text=User" alt="User" className="w-16 h-16 rounded-full" /><div><h2 className="text-xl font-bold dark:text-white">{user.name}</h2><p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p></div></div><nav className="space-y-2"><button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>My Profile</button><button onClick={() => setActiveTab('addresses')} className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'addresses' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Addresses</button><button onClick={() => setActiveTab('wishlist')} className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'wishlist' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Wishlist</button><button onClick={() => setActiveTab('rewards')} className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'rewards' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Loyalty & Rewards</button></nav></div></div>
                    <div className="lg:w-3/4"><div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">{activeTab === 'profile' && <div><h3 className="text-2xl font-bold mb-6 dark:text-white">Manage Profile</h3> {/* Profile form */}</div>}{activeTab === 'addresses' && <div><h3 className="text-2xl font-bold mb-6 dark:text-white">Manage Addresses</h3> {/* Address UI */}</div>}{activeTab === 'rewards' && <div><h3 className="text-2xl font-bold mb-6 dark:text-white">Your Loyalty Points</h3><p>You have <span className="font-bold text-indigo-600 dark:text-indigo-400">500</span> reward points.</p></div>}{activeTab === 'wishlist' && (<div><h3 className="text-2xl font-bold mb-6 dark:text-white">Your Wishlist</h3>{wishlistedProducts.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{wishlistedProducts.map(p => <ProductCard key={p.id} product={p} onProductSelect={onProductSelect} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={true} />)}</div>) : (<p>Your wishlist is empty.</p>)}</div>)}</div></div>
                </div>
            </div>
        </div>
    );
};

// --- Blog Page Component ---
const BlogPage = ({ onNavigate }: { onNavigate: (page: string) => void; }) => (
    <div className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-10 dark:text-white">Meet the Makers</h1>
            <div className="max-w-4xl mx-auto space-y-12">
                {mockBlogPosts.map(post => (
                    <div key={post.id} className="grid md:grid-cols-2 gap-8 items-center">
                        <img src={post.imageUrl} alt={post.title} className="rounded-lg shadow-lg w-full h-full object-cover" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{post.author} - {post.date}</p>
                            <p className="mt-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                            <button className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Read More &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- Support Page Component ---
const SupportPage = () => {
    const faqs = [{ q: 'What are the shipping options?', a: 'We offer standard and express shipping...' }, { q: 'How do I return an item?', a: 'You can return any item within 30 days...' }, { q: 'How do you ensure artisan authenticity?', a: 'We work directly with artisans and co-operatives...' }];
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"><h1 className="text-4xl font-bold text-center mb-10 dark:text-white">Help & Support</h1><div className="grid grid-cols-1 md:grid-cols-2 gap-12"><div id="faq">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h2><div className="space-y-4">{faqs.map((faq, i) => (<div key={i} className="border-b dark:border-gray-700"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center py-4 text-left font-semibold"><span>{faq.q}</span><ChevronDownIcon className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} /></button><div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 py-4' : 'max-h-0'}`}><p className="text-gray-600 dark:text-gray-300">{faq.a}</p></div></div>))}</div></div><div id="contact"><h2 className="text-2xl font-bold mb-6 dark:text-white">Contact Support</h2><form className="space-y-4"><input type="text" placeholder="Your Name" className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 rounded-md" /><input type="email" placeholder="Your Email" className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 rounded-md" /><textarea placeholder="Your Message" rows={5} className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 rounded-md"></textarea><button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700">Send Message</button></form></div></div></div></div>
    );
};

// --- AI Picks Page Component ---
const AiPicksPage = ({ onProductSelect }: { onProductSelect: (product: Product) => void; }) => {
    const topPicks = useMemo(() => [...mockProducts].sort((a, b) => b.likes - a.likes).slice(0, 5), []);
    const trending = useMemo(() => mockProducts.filter(p => p.isTrending), []);
    const artisanOfTheWeek = useMemo(() => mockProducts.map(p => ({ name: p.artisan, bio: p.artisanStory.bio, imageUrl: p.artisanStory.imageUrl })).find(a => a.name === 'Aditya Das'), []);
    const aiTags = ["Handmade", "Sustainable", "Eco-friendly", "Gift-worthy", "Traditional", "Modern", "Unique"];

    const handleRefresh = () => alert("Refreshing recommendations...");
    const handleVoiceSearch = () => alert("Voice search activated. Say 'Show me gifts under 1500'.");

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
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
    );
};

// --- Login Page Component ---
const LoginPage = ({ onLogin, onNavigate }: { onLogin: (user: User) => void; onNavigate: (page: string) => void; }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        if (email === "user@example.com" && password === "password") {
            onLogin({ id: 1, name: "John Doe", email: "user@example.com" });
            onNavigate('profile');
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2><p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Or <button onClick={() => onNavigate('signup')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">create a new account</button></p></div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"><form className="space-y-6" onSubmit={handleSubmit}><div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label><div className="mt-1"><input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div><div><label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label><div className="mt-1"><input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div><div className="flex items-center justify-between"><div className="text-sm"><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot your password?</a></div></div><div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button></div></form></div></div>
        </div>
    );
};

// --- Signup Page Component ---
const SignupPage = ({ onSignup, onNavigate }: { onSignup: (user: User) => void; onNavigate: (page: string) => void; }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup logic
        const newUser = { id: Date.now(), name, email };
        onSignup(newUser);
        onNavigate('profile');
    };
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create a new account</h2><p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Or <button onClick={() => onNavigate('login')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">sign in to your existing account</button></p></div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"><form className="space-y-6" onSubmit={handleSubmit}><div><label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label><div className="mt-1"><input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div><div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label><div className="mt-1"><input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div><div><label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label><div className="mt-1"><input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div></div><div><button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button></div></form></div></div>
        </div>
    );
};


// --- Chatbot Widget ---
const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div><button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 z-50"><MessageSquareIcon /></button>{isOpen && (<div className="fixed bottom-20 right-6 w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col z-50"><div className="p-4 bg-indigo-600 text-white rounded-t-lg"><h3 className="font-semibold">RealityLoop Helper</h3><p className="text-sm opacity-80">Powered by Gemini</p></div><div className="flex-1 p-4 overflow-y-auto text-sm"><div className="bg-gray-100 p-3 rounded-lg self-start max-w-xs">Hello! How can I help you today?</div></div><div className="p-2 border-t"><input type="text" placeholder="Type your message..." className="w-full p-2 border rounded-md text-sm" /></div></div>)}</div>
    );
};

// --- Become a Seller Page ---
const BecomeSellerPage = () => {
    const [autoPublish, setAutoPublish] = useState(false);
    return (
        <div className="bg-yellow-500 min-h-screen font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Onboarding Form */}
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">List a New Product</h2>
                        <p className="text-gray-600 mb-6">Fill in the details below to get started with our AI-powered tools.</p>
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div>
                                <div className="space-y-4">
                                    <div><label className="text-sm font-medium text-gray-700">Seller Name</label><input type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md" /></div>
                                    <div><label className="text-sm font-medium text-gray-700">Product Name</label><input type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-md" /></div>
                                    <div><label className="text-sm font-medium text-gray-700">Category</label><select className="w-full p-2 mt-1 border border-gray-300 rounded-md"><option>Home Decor</option><option>Fashion</option><option>Jewelry</option></select></div>
                                    <div><label className="text-sm font-medium text-gray-700">Product Image</label><input type="file" className="w-full text-sm mt-1" /></div>
                                </div>
                                <button className="mt-6 w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">Generate Preview</button>
                            </div>
                            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Image Output</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Pricing & Goal Tracker */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">AI Pricing Optimizer</h3>
                            <div className="space-y-4">
                                <div><label className="text-sm font-medium">Cost Price</label><input type="number" placeholder="e.g., 500" className="w-full p-2 mt-1 border rounded-md" /></div>
                                <div><label className="text-sm font-medium">Selling Price Suggestion</label><input type="number" placeholder="AI Suggestion: 999" className="w-full p-2 mt-1 border rounded-md" /></div>
                                <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">Optimize</button>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">Goal Breakdown</h3>
                            <div className="space-y-4">
                                <div><label className="text-sm font-medium">Monthly Sales Target</label><input type="number" placeholder="e.g., 100000" className="w-full p-2 mt-1 border rounded-md" /></div>
                                <div><label className="text-sm font-medium">Current Progress</label><input type="number" placeholder="e.g., 25000" className="w-full p-2 mt-1 border rounded-md" /></div>
                                <button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">Track & Optimize</button>
                            </div>
                        </div>
                    </div>

                    {/* Storytelling AI */}
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Storytelling AI (Artisan Narratives)</h3>
                        <div className="h-48 rounded-lg bg-cover bg-center mb-4" style={{ backgroundImage: "url('https://placehold.co/800x300/d4a373/333333?text=Artisan+Story')" }}></div>
                        <textarea placeholder="AI-generated description: 'This handcrafted vase carries the story of three generations...'" rows={3} className="w-full p-2 border rounded-md mb-2"></textarea>
                        <button className="w-full bg-gray-700 text-white font-bold py-2 rounded-lg hover:bg-gray-800">Generate Narrative</button>
                    </div>

                    {/* Marketing & Auto-Publishing */}
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800">AI-Powered Social Media Auto-Publishing</h3>
                            <div className="flex items-center">
                                <span className="mr-3 text-sm font-medium">{autoPublish ? 'ON' : 'OFF'}</span>
                                <button onClick={() => setAutoPublish(!autoPublish)} className={`w-12 h-6 rounded-full flex items-center transition-colors ${autoPublish ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${autoPublish ? 'translate-x-6' : 'translate-x-1'}`}></span>
                                </button>
                            </div>
                        </div>
                        <textarea placeholder="AI-generated caption for Instagram..." rows={3} className="w-full p-2 border rounded-md mb-4"></textarea>
                        <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center mb-4"><p className="text-gray-500">Image Upload Later On</p></div>
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                <FacebookIcon />
                                <InstagramIcon />
                                <TwitterIcon />
                                <LinkedInIcon />
                            </div>
                            <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700">Publish Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [pageParams, setPageParams] = useState<any>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([2, 5]);
    const [shareProduct, setShareProduct] = useState<Product | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleNavigate = (page: string, params: any = null) => { setCurrentPage(page); setPageParams(params); window.scrollTo(0, 0); };
    const handleProductSelect = (product: Product) => { setSelectedProduct(product); handleNavigate('detail'); };
    const handleToggleWishlist = (productId: number) => {
        if (!currentUser) {
            alert("Please log in to manage your wishlist.");
            handleNavigate('login');
            return;
        }
        setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    };
    const handleShare = (product: Product) => { setShareProduct(product); };

    const handleLogin = (user: User) => { setCurrentUser(user); };
    const handleSignup = (user: User) => { setCurrentUser(user); };
    const handleLogout = () => { setCurrentUser(null); handleNavigate('landing'); };

    const handleAddToCart = useCallback((product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prevCart, { ...product, quantity }];
        });
        alert(`${quantity} x ${product.name} added to cart!`);
    }, []);
    const handleUpdateCart = (productId: number, quantity: number) => { setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: quantity } : item)); };
    const handleRemoveFromCart = (productId: number) => { setCart(prevCart => prevCart.filter(item => item.id !== productId)); };
    const handleOrderPlaced = () => { setCart([]); };
    const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const renderPage = () => {
        const protectedRoutes = ['profile', 'orderHistory', 'wishlist'];
        if (protectedRoutes.includes(currentPage) && !currentUser) {
            return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
        }

        switch (currentPage) {
            case 'detail': return selectedProduct && <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} onNavigate={handleNavigate} onToggleWishlist={handleToggleWishlist} isWishlisted={wishlist.includes(selectedProduct.id)} onProductSelect={handleProductSelect} onShare={handleShare} />;
            case 'cart': return <Cart cart={cart} onUpdateCart={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} onNavigate={handleNavigate} />;
            case 'checkout': return <Checkout onNavigate={handleNavigate} onOrderPlaced={handleOrderPlaced} />;
            case 'orderHistory': return <OrderHistory onNavigate={handleNavigate} />;
            case 'wishlist': return <Wishlist wishlist={wishlist} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} onNavigate={handleNavigate} />;
            case 'profile': return currentUser && <UserProfile user={currentUser} onNavigate={handleNavigate} wishlist={wishlist} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />;
            case 'catalog': return <ProductCatalog onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />;
            case 'blog': return <BlogPage onNavigate={handleNavigate} />;
            case 'support': return <SupportPage />;
            case 'aiPicks': return <AiPicksPage onProductSelect={handleProductSelect} />;
            case 'login': return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
            case 'signup': return <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />;
            case 'becomeSeller': return <BecomeSellerPage />;
            case 'landing': default: return <LandingPage onNavigate={handleNavigate} onProductSelect={handleProductSelect} />;
        }
    };

    return (<div className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"><Header onNavigate={handleNavigate} cartItemCount={cartItemCount} user={currentUser} onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /><main className="min-h-screen">{renderPage()}</main><Footer onNavigate={handleNavigate} /><ChatbotWidget />{shareProduct && <ShareModal product={shareProduct} onClose={() => setShareProduct(null)} />}</div>);
}

