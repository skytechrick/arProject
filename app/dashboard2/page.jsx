'use client';

import { useState, useEffect, useMemo } from 'react';
import Sidebar from './Side';
import {
    UploadCloud,
    X,
    Search,
    MoreVertical,
    Wallet,
    Banknote,
    ArrowRightLeft,
    Calendar,
    Download,
    TrendingUp,
    MousePointerClick,
    Lightbulb,
    CheckCircle,
    Camera,
    Instagram,
    Facebook,
    Twitter,
    Globe,
    BookText,
    ImagePlus,
    FileText,
    Trash2,
    Save,
    MessageSquare,
    Star,
    Ticket,
    Send,
    PlusCircle,
    Sparkles,
    Hash,
    Image as ImageIcon,
    LoaderCircle,
    Languages,
    Bell,
    Lock,
    HelpCircle,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useToast } from "@/hooks/use-toast"
import AddNewProduct from './AddNewProduct';

const faqData = [
    { q: 'How do I update my payment details?', a: 'You can update your payment details in the "Earnings & Payouts" section by clicking on "Manage Payout Methods".' },
    { q: 'What is the platform commission fee?', a: 'Our platform fee is a flat 10% on all sales, which helps us maintain the marketplace and develop new tools for you.' },
    { q: 'How long does it take for a payout to process?', a: 'Payouts are processed within 3-5 business days after you initiate a withdrawal request.' },
    { q: 'Can I sell internationally?', a: 'Yes, our platform supports international sales and shipping. Please ensure your shipping profiles are set up correctly.' },
];

const initialSupportTickets = [
    { id: 'TKT-001', subject: 'Issue with payout delay', status: 'Open', lastUpdate: '2h ago' },
    { id: 'TKT-002', subject: 'Question about product categories', status: 'Closed', lastUpdate: '3d ago' },
];

// --- Custom Toggle Switch Component ---
const ToggleSwitch = ({ id, checked, onChange, label }) => (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer">
        <span className="text-gray-300">{label}</span>
        <div className="relative">
            <input id={id} type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
            <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
        </div>
    </label>
);


const posterTemplates = [
    { id: 'diwali', name: 'Diwali Theme', imageUrl: 'https://i.imgur.com/uR5g1xZ.png' },
    { id: 'modern', name: 'Modern Minimal', imageUrl: 'https://i.imgur.com/gDN22a2.png' },
    { id: 'craft', name: 'Handicraft Fair', imageUrl: 'https://i.imgur.com/2s3e2X3.png' },
];

const marketingRecommendations = [
    { title: 'Boost Your Top Product', description: 'Your "Handcrafted Wooden Bowl" is getting a lot of views. Boost it with a targeted ad campaign on Instagram.' },
    { title: 'Engage Weekend Shoppers', description: 'Schedule a social media post for Saturday at 7 PM, as this is your peak sales time.' },
    { title: 'Create a Holiday Bundle', description: 'Diwali is approaching. Consider creating a gift bundle with your top-selling candles and mugs.' },
];


const initialProfileData = {
    avatarUrl: 'https://i.pravatar.cc/150?u=rick_shop',
    shopName: 'SKY TECH - RICK',
    tagline: 'Crafting digital experiences with code.',
    story: "From the foothills of the Himalayas in Siliguri, I started my journey into the world of technology. As a full-stack developer, I blend artistry with logic to build beautiful, functional applications. My passion lies in helping startups grow by providing robust IT services and creating seamless e-commerce solutions. Every line of code is a brushstroke in a larger digital masterpiece.",
    socials: {
        instagram: '@reality_loops',
        facebook: '@reality_loops',
        twitter: '@reality_loops',
        website: '@reality_loops',
    },
};

const initialConversations = [
    { id: 1, customerName: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/40?u=jane', lastMessage: 'Hi, can you tell me the dimensions?', timestamp: '10m ago', messages: [{ from: 'customer', text: 'Hi, can you tell me the dimensions?' }] },
    { id: 2, customerName: 'John Smith', avatarUrl: 'https://i.pravatar.cc/40?u=john', lastMessage: 'Thank you so much!', timestamp: '2h ago', messages: [{ from: 'customer', text: 'Order received.' }, { from: 'me', text: 'Glad you like it!' }, { from: 'customer', text: 'Thank you so much!' }] },
    { id: 3, customerName: 'Sophia Williams', avatarUrl: 'https://i.pravatar.cc/40?u=sophia', lastMessage: 'Can I get this gift wrapped?', timestamp: '1d ago', messages: [{ from: 'customer', text: 'Can I get this gift wrapped?' }] }
];
const initialReviews = [
    { id: 1, customerName: 'Sophia Williams', avatarUrl: 'https://i.pravatar.cc/40?u=sophia', rating: 5, date: '2 days ago', reviewText: 'Absolutely beautiful craftsmanship! The wooden bowl is even more stunning in person. Shipped quickly and was packaged perfectly.', replyText: null },
    { id: 2, customerName: 'Rick Sarkar', avatarUrl: 'https://i.pravatar.cc/40?u=rick', rating: 4, date: '5 days ago', reviewText: 'Great product, but the color was slightly different than the photo. Still, very high quality.', replyText: 'Hi Rick, thanks for the feedback! The natural wood grain can cause slight variations in color. We\'re glad you love the quality!' },
];
const initialCoupons = [
    { id: 1, code: 'WELCOME10', type: 'percentage', value: 10, status: 'Active' },
    { id: 2, code: 'DIWALI2025', type: 'fixed', value: 15, status: 'Active' },
    { id: 3, code: 'SUMMERFUN', type: 'percentage', value: 15, status: 'Expired' },
];
const MessagesView = () => {
    const [conversations] = useState(initialConversations);
    const [selectedConvoId, setSelectedConvoId] = useState(1);
    const [message, setMessage] = useState('');

    const selectedConversation = useMemo(() => {
        return conversations.find(c => c.id === selectedConvoId);
    }, [conversations, selectedConvoId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        // Add logic to send message to backend
        console.log(`Replying to ${selectedConversation.customerName}: ${message}`);
        setMessage('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
            {/* Conversation List */}
            <div className="lg:col-span-1 rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 text-white">Inbox</h3>
                <div className="space-y-2">
                    {conversations.map(convo => (
                        <div key={convo.id} onClick={() => setSelectedConvoId(convo.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedConvoId === convo.id ? 'bg-slate-700/80' : 'hover:bg-slate-800/60'}`}>
                            <div className="flex items-center gap-3">
                                <img src={convo.avatarUrl} alt={convo.customerName} className="w-10 h-10 rounded-full" />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold truncate text-white">{convo.customerName}</p>
                                    <p className="text-sm text-gray-400 truncate">{convo.lastMessage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-3 rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b border-slate-700">
                            <h3 className="text-lg font-semibold text-white">{selectedConversation.customerName}</h3>
                        </div>
                        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {selectedConversation.messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <p className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.from === 'me' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-gray-200'}`}>
                                        {msg.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex items-center gap-3">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your reply..."
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button type="submit" className="bg-amber-600 p-3 rounded-lg text-white hover:bg-amber-700 transition-colors"><Send size={20} /></button>
                        </form>
                    </>
                ) : <p className="p-4 text-gray-400">Select a conversation to start chatting.</p>}
            </div>
        </div>
    );
};

const ReviewsView = () => {
    const [reviews] = useState(initialReviews);
    const StarRating = ({ rating }) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'} />
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            {reviews.map(review => (
                <div key={review.id} className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                    <div className="flex items-start gap-4">
                        <img src={review.avatarUrl} alt={review.customerName} className="w-12 h-12 rounded-full" />
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{review.customerName}</p>
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="mt-3 text-gray-300">{review.reviewText}</p>

                            {review.replyText ? (
                                <div className="mt-4 p-4 bg-slate-800/50 border-l-2 border-amber-500 rounded-r-lg">
                                    <p className="font-semibold text-sm text-amber-400">Your Reply</p>
                                    <p className="text-sm text-gray-300 mt-1">{review.replyText}</p>
                                </div>
                            ) : (
                                <form className="mt-4 flex items-center gap-3">
                                    <input type="text" placeholder="Write a public reply..." className="w-full bg-slate-800/60 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                    <button type="submit" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg">Reply</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CouponsView = () => {
    const [coupons] = useState(initialCoupons);
    const inputStyle = "w-full bg-slate-800/60 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500";
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Coupon Form */}
            <div className="lg:col-span-1">
                <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Create New Coupon</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="couponName" className="block text-sm text-gray-400 mb-1">Coupon Name</label>
                            <input type="text" id="couponName" placeholder="e.g. Rakhi Special" className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="couponCode" className="block text-sm text-gray-400 mb-1">Coupon Code</label>
                            <input type="text" id="couponCode" placeholder="RAKHI2025" className={inputStyle} />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-grow">
                                <label htmlFor="discountType" className="block text-sm text-gray-400 mb-1">Type</label>
                                <select id="discountType" className={inputStyle}>
                                    <option>Percentage (%)</option>
                                    <option>Fixed Amount ($)</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="discountValue" className="block text-sm text-gray-400 mb-1">Value</label>
                                <input type="number" id="discountValue" placeholder="10" className={inputStyle} />
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 bg-amber-600 text-white font-semibold py-3 rounded-md hover:bg-amber-700 transition-colors">
                            <PlusCircle size={20} /> Create Coupon
                        </button>
                    </form>
                </div>
            </div>

            {/* Existing Coupons List */}
            <div className="lg:col-span-2">
                <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Active Coupons</h3>
                    <div className="space-y-3">
                        {coupons.map(coupon => (
                            <div key={coupon.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                                <div className="flex items-center gap-3">
                                    <Ticket className="text-amber-400" />
                                    <div>
                                        <p className="font-mono font-semibold text-white">{coupon.code}</p>
                                        <p className="text-sm text-gray-400">
                                            {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${coupon.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{coupon.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const initialWorkshopImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=400' },
    { id: 2, url: 'https://images.unsplash.com/photo-1555066931-4365d14694dd?q=80&w=400' },
    { id: 3, url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400' },
];

const initialCertifications = [
    { id: 1, name: 'Full-Stack Developer Certification.pdf' },
    { id: 2, name: 'AWS Certified Cloud Practitioner.pdf' },
];

const topProducts = [
    { id: 1, name: 'Handcrafted Wooden Bowl', image: 'https://images.unsplash.com/photo-1590004586265-555cef1b3aa5?q=80&w=200', sales: 152, revenue: 4560 },
    { id: 2, name: 'Ceramic Mug', image: 'https://images.unsplash.com/photo-1613431603246-88a3189a19a9?q=80&w=200', sales: 121, revenue: 1815 },
    { id: 3, name: 'Scented Candle', image: 'https://images.unsplash.com/photo-1613203425953-c1a536915234?q=80&w=200', sales: 98, revenue: 1470 },
    { id: 4, name: 'Leather Wallet', image: 'https://images.unsplash.com/photo-1615393483185-263a2a8a18b5?q=80&w=200', sales: 75, revenue: 3750 },
];

const trafficData = [
    { name: 'Google', value: 4560, fill: '#8884d8' },
    { name: 'Instagram', value: 2890, fill: '#82ca9d' },
    { name: 'Direct', value: 1850, fill: '#ffc658' },
    { name: 'Facebook', value: 1230, fill: '#ff8042' },
];

const aiInsights = [
    "Your 'Handcrafted Wooden Bowl' is trending in Delhi and Mumbai.",
    "Sales peak between 6 PM and 9 PM on weekends.",
    "Customers who buy mugs also frequently view your scented candles.",
];

const recommendations = [
    "Add a 'Diwali Gifting' category to boost seasonal sales.",
    "Create a product bundle with a mug and a candle to increase average order value.",
    "Run targeted Instagram ads for wooden crafts to users in Delhi.",
];

const initialTransactions = [
    {
        id: 'txn_1',
        date: '2025-09-17',
        description: 'Sale from Order #AE8654',
        grossAmount: 1250.00,
        platformFee: 125.00,
        netPayout: 1125.00,
        status: 'Completed',
    },
    {
        id: 'txn_2',
        date: '2025-09-16',
        description: 'Sale from Order #AE8655',
        grossAmount: 85.50,
        platformFee: 8.55,
        netPayout: 76.95,
        status: 'Completed',
    },
    {
        id: 'txn_3',
        date: '2025-09-15',
        description: 'Sale from Order #AE8657',
        grossAmount: 450.75,
        platformFee: 45.08,
        netPayout: 405.67,
        status: 'Completed',
    },
    {
        id: 'txn_4',
        date: '2025-09-14',
        description: 'Withdrawal to Bank Account',
        grossAmount: -1000.00,
        platformFee: 0,
        netPayout: -1000.00,
        status: 'Processed',
    },
    {
        id: 'txn_5',
        date: '2025-09-12',
        description: 'Refund for Order #AE8650',
        grossAmount: -50.00,
        platformFee: 5.00,
        netPayout: -55.00,
        status: 'Refunded',
    },
];

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-medium rounded-full inline-block";
    const statusClasses = {
        Completed: "bg-green-500/20 text-green-300",
        Processed: "bg-blue-500/20 text-blue-300",
        Refunded: "bg-orange-500/20 text-orange-300",
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-500/20 text-gray-300'}`}>{status}</span>;
};

const Placeholder = ({ title }) => (
    <div className="bg-white p-10 text-center rounded-xl border-2 border-dashed border-gray-300">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500">This section is under construction. Features for {title} will be added here.</p>
    </div>
);

const Overview = () => {
    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Hello, Sophia</h1>
                <div className="flex gap-3 mt-2">
                    <button className="border border-white px-4 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-500">
                        Voice Command
                    </button>
                    <button className="border border-white px-4 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-500">
                        Bilingual Toggle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Revenue</h2>
                    <p className="text-2xl font-bold">$1,250</p>
                    <span className="text-green-600 text-sm">+10%</span>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Orders</h2>
                    <p className="text-2xl font-bold">32</p>
                    <span className="text-green-600 text-sm">+5%</span>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Listings</h2>
                    <p className="text-2xl font-bold">15</p>
                    <span className="text-green-600 text-sm">+2%</span>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Views</h2>
                    <p className="text-2xl font-bold">4,520</p>
                    <span className="text-green-600 text-sm">+12%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Earnings</h2>
                    <p className="text-2xl font-bold">$980</p>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Orders Pending</h2>
                    <p className="text-2xl font-bold">7</p>
                </div>
                <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4">
                    <h2 className="text-sm font-medium text-gray-600">Low Stock Alerts</h2>
                    <p className="text-2xl font-bold">3</p>
                </div>
            </div>

            <div className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6 mb-8">
                <h2 className="text-lg font-semibold mb-3">Notifications</h2>
                <ul className="space-y-2 text-sm">
                    <li className="p-2 rounded-md bg-gray-50">🔔 New Order #12345 received</li>
                    <li className="p-2 rounded-md bg-gray-50">💬 Message from customer John</li>
                    <li className="p-2 rounded-md bg-gray-50">⚠️ Low stock on "Wireless Earbuds"</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <div className="flex gap-3 mt-3">
                    <button className="border border-white px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
                        Add New Listing
                    </button>
                    <button className="border border-white px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        View All Listings
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Active Orders</h2>
                <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow">
                    <p className="text-gray-600">No active orders right now ✅</p>
                </div>
            </div>
        </div>
    )
};


const OrderManagement = () => {
    const initialOrders = [
        {
            id: '#AE8654',
            buyerName: 'Rick Sarkar',
            buyerAvatar: 'https://i.pravatar.cc/40?u=rick',
            date: '2025-09-17',
            total: 1250.00,
            status: 'Shipped',
            items: [
                { name: 'Handcrafted Wooden Bowl', quantity: 1 },
                { name: 'Ceramic Mug', quantity: 2 },
            ],
        },
        {
            id: '#AE8655',
            buyerName: 'Jane Doe',
            buyerAvatar: 'https://i.pravatar.cc/40?u=jane',
            date: '2025-09-16',
            total: 85.50,
            status: 'Processing',
            items: [{ name: 'Scented Candle', quantity: 3 }],
        },
        {
            id: '#AE8656',
            buyerName: 'John Smith',
            buyerAvatar: 'https://i.pravatar.cc/40?u=john',
            date: '2025-09-16',
            total: 210.00,
            status: 'Pending',
            items: [{ name: 'Leather Wallet', quantity: 1 }],
        },
        {
            id: '#AE8657',
            buyerName: 'Sophia Williams',
            buyerAvatar: 'https://i.pravatar.cc/40?u=sophia',
            date: '2025-09-15',
            total: 450.75,
            status: 'Delivered',
            items: [
                { name: 'Silk Scarf', quantity: 1 },
                { name: 'Silver Earrings', quantity: 1 },
            ],
        },
    ];

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const StatusBadge = ({ status }) => {
        const baseClasses = "px-2.5 py-1 text-xs font-medium rounded-full inline-block";
        const statusClasses = {
            Pending: "bg-yellow-500/20 text-yellow-300",
            Processing: "bg-blue-500/20 text-blue-300",
            Shipped: "bg-purple-500/20 text-purple-300",
            Delivered: "bg-green-500/20 text-green-300",
        };
        return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-500/20 text-gray-300'}`}>{status}</span>;
    };
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(currentOrders =>
            currentOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order =>
            order.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    return (
        <>
            <div className="bg-transparent p-6 text-white min-h-screen">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

                {/* Toolbar: Search and Filters */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by buyer name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-800/50 border border-slate-700 py-2"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-slate-800/60 border border-slate-700 px-4 py-2 text-sm rounded-lg hover:bg-slate-700/80">
                            Filter
                        </button>
                        <button className="bg-slate-800/60 border border-slate-700 px-4 py-2 text-sm rounded-lg hover:bg-slate-700/80">
                            Sort
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="rounded-lg border text-card-foreground shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-4 transition-all hover:border-slate-600">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                                    {/* Buyer Details */}
                                    <div className="col-span-2 md:col-span-2 flex items-center gap-3">
                                        <img src={order.buyerAvatar} alt={order.buyerName} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-white">{order.buyerName}</p>
                                            <p className="text-sm text-gray-400">{order.id} &bull; {order.date}</p>
                                        </div>
                                    </div>

                                    {/* Total Price */}
                                    <div className="text-left md:text-center">
                                        <p className="text-sm text-gray-400">Total</p>
                                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                                    </div>

                                    {/* Status */}
                                    <div className="text-left md:text-center">
                                        <p className="text-sm text-gray-400 mb-1">Status</p>
                                        <StatusBadge status={order.status} />
                                    </div>

                                    {/* Actions - Status Update */}
                                    <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-2">
                                        <div className="relative w-full md:w-auto">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="appearance-none w-full bg-slate-800/80 border border-slate-600 rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 px-4 bg-slate-800/50 border border-slate-700"
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            {/* <ChevronDown size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" /> */}
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/80 rounded-md">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/50">
                            <p className="text-gray-400">No orders match your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

const EarningsAndPayments = () => {
    const [transactions] = useState(initialTransactions);
    const [activeFilter, setActiveFilter] = useState('monthly');

    const filteredTransactions = useMemo(() => {
        return transactions;
    }, [transactions, activeFilter]);

    const availableForPayout = 980.00;
    const totalEarnings = 12550.00;

    return (
        <div className="bg-transparent p-6 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Earnings & Payments</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Right Column: Summary & Withdraw */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Summary Cards */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-300">Available for Payout</h3>
                            <Wallet size={24} className="text-amber-400" />
                        </div>
                        <p className="text-4xl font-bold text-white">${availableForPayout.toFixed(2)}</p>
                        <p className="text-sm text-gray-400 mt-1">Next payout on 1st Oct 2025</p>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-300">Total Earnings (All Time)</h3>
                            <TrendingUp size={24} className="text-green-400" />
                        </div>
                        <p className="text-4xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
                    </div>

                    {/* Withdraw Card */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <h3 className="text-lg font-medium text-gray-200 mb-4">Request a Payout</h3>
                        <div>
                            <label htmlFor="payout-amount" className="block text-sm text-gray-400 mb-2">Amount</label>
                            <input
                                id="payout-amount"
                                type="number"
                                placeholder={`e.g., ${availableForPayout.toFixed(2)}`}
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-800/50 border border-slate-700"
                            />
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-amber-600 text-white font-semibold py-3 rounded-md hover:bg-amber-700 transition-colors">
                            <Banknote size={20} />
                            Withdraw Funds
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm">

                        <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-xl font-semibold">Transaction History</h2>
                            <div className="flex items-center gap-2 bg-slate-800/60 p-1 rounded-lg border border-slate-700">
                                <button onClick={() => setActiveFilter('daily')} className={`px-3 py-1 text-sm rounded-md ${activeFilter === 'daily' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>Daily</button>
                                <button onClick={() => setActiveFilter('monthly')} className={`px-3 py-1 text-sm rounded-md ${activeFilter === 'monthly' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>Monthly</button>
                                <button onClick={() => setActiveFilter('custom')} className="p-2 hover:bg-slate-700/50 rounded-md"><Calendar size={16} /></button>
                                <button className="p-2 hover:bg-slate-700/50 rounded-md"><Download size={16} /></button>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            {filteredTransactions.map(tx => (
                                <div key={tx.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-800/50">
                                    <div className="p-2 bg-slate-700/50 rounded-full">
                                        <ArrowRightLeft size={20} className={tx.grossAmount > 0 ? "text-green-400" : "text-red-400"} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium text-white">{tx.description}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.grossAmount > 0 ? "text-green-400" : "text-red-400"}`}>
                                            {tx.grossAmount > 0 ? `+` : ''}${tx.grossAmount.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            <span>Fee: ${tx.platformFee.toFixed(2)}</span> / <span className="text-gray-400">Net: ${tx.netPayout.toFixed(2)}</span>
                                        </p>
                                    </div>
                                    <div className="w-24 text-right">
                                        <StatusBadge status={tx.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalyticsAndInsights = () => {
    const [activeDateFilter, setActiveDateFilter] = useState('30d');

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800/80 backdrop-blur-sm p-3 border border-slate-700 rounded-lg text-white">
                    <p className="label text-sm">{`${payload[0].name} : ${payload[0].value} visitors`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-transparent p-6 text-white min-h-screen">
            {/* Header and Date Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-3xl font-bold">Analytics & Insights</h1>
                <div className="flex items-center gap-2 bg-slate-800/60 p-1 rounded-lg border border-slate-700 mt-4 md:mt-0">
                    <button onClick={() => setActiveDateFilter('24h')} className={`px-3 py-1 text-sm rounded-md ${activeDateFilter === '24h' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>24 Hours</button>
                    <button onClick={() => setActiveDateFilter('7d')} className={`px-3 py-1 text-sm rounded-md ${activeDateFilter === '7d' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>7 Days</button>
                    <button onClick={() => setActiveDateFilter('30d')} className={`px-3 py-1 text-sm rounded-md ${activeDateFilter === '30d' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}>30 Days</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="text-amber-400" />
                            <h2 className="text-xl font-semibold">Top Selling Products</h2>
                        </div>
                        <div className="space-y-4">
                            {topProducts.map((product) => (
                                <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-white">{product.name}</p>
                                        <p className="text-sm text-gray-400">{product.sales} units sold</p>
                                    </div>
                                    <p className="text-lg font-bold text-green-400">${product.revenue.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Column */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MousePointerClick className="text-blue-400" />
                            <h2 className="text-xl font-semibold">Traffic Sources</h2>
                        </div>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={trafficData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {trafficData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: "14px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="text-yellow-400" />
                            <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
                        </div>
                        <ul className="space-y-3 text-gray-300">
                            {aiInsights.map((insight, index) => (
                                <li key={index} className="flex gap-3 text-sm">
                                    <span className="text-yellow-400 mt-1">&bull;</span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="text-green-400" />
                            <h2 className="text-xl font-semibold">Recommendations</h2>
                        </div>
                        <ul className="space-y-3 text-gray-300">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="flex gap-3 text-sm">
                                    <span className="text-green-400 mt-1">&#10140;</span>
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArtisanProfile = () => {
    const [profile, setProfile] = useState(initialProfileData);
    const [workshopImages, setWorkshopImages] = useState(initialWorkshopImages);
    const [certifications, setCertifications] = useState(initialCertifications);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            socials: { ...prev.socials, [name]: value },
        }));
    };

    const handleSaveChanges = () => {
        // In a real app, you would send the updated 'profile', new images, and new certifications to your API.
        console.log("Saving changes:", { profile, workshopImages, certifications });
        alert("Changes Saved!");
    };

    return (
        <div className="bg-transparent p-6 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Profile & Shop Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1 space-y-8">

                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <img src={profile.avatarUrl} alt="Artisan Avatar" className="block mx-auto w-4/5 h-4/5 rounded-full object-cover border-2 border-slate-600" />
                            <button className="absolute bottom-1 right-1 bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors">
                                <Camera size={18} />
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </button>
                        </div>
                        <div>
                            <label htmlFor="shopName" className="sr-only">Shop Name</label>
                            <input
                                id="shopName"
                                name="shopName"
                                type="text"
                                value={profile.shopName}
                                onChange={handleInputChange}
                                className="w-full bg-transparent text-xl font-bold text-center placeholder-gray-400 focus:outline-none bg-slate-900/50 border-slate-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="tagline" className="sr-only">Tagline</label>
                            <input
                                id="tagline"
                                name="tagline"
                                type="text"
                                value={profile.tagline}
                                onChange={handleInputChange}
                                className="w-full bg-transparent text-sm text-gray-400 text-center placeholder-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Social Media Card */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">Social Media Links</h3>
                        <div className="space-y-4">
                            {Object.keys(profile.socials).map((key) => (
                                <div key={key} className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 pl-2">
                                        {key === 'instagram' && <Instagram size={18} />}
                                        {key === 'facebook' && <Facebook size={18} />}
                                        {key === 'twitter' && <Twitter size={18} />}
                                        {key === 'website' && <Globe size={18} />}
                                    </div>
                                    <input
                                        type="text"
                                        name={key}
                                        value={profile.socials[key]}
                                        onChange={handleSocialChange}
                                        placeholder={`your${key}handle`}
                                        className="w-full bg-slate-800/60 border border-slate-600 rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-900/50 border-slate-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Story, Media, Certifications */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Artisan Story */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <BookText className="text-amber-400" />
                            <h2 className="text-xl font-semibold">Your Story</h2>
                        </div>
                        <textarea
                            name="story"
                            value={profile.story}
                            onChange={handleInputChange}
                            rows="6"
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-900/50 border-slate-700"
                            placeholder="Tell your customers about your craft, your passion, and what makes your products unique..."
                        ></textarea>
                    </div>

                    {/* Workshop Photos */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Workshop Photos & Videos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {workshopImages.map(img => (
                                <div key={img.id} className="relative group">
                                    <img src={img.url} alt={`Workshop photo ${img.id}`} className="w-full h-32 object-cover rounded-md" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-red-500 hover:text-red-400"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full h-32 border-2 border-dashed border-slate-600 rounded-md flex flex-col items-center justify-center text-gray-400 hover:bg-slate-800/50 hover:border-slate-500">
                                <ImagePlus size={24} />
                                <span className="text-sm mt-2">Add Media</span>
                                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                            </button>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="rounded-lg border shadow-sm bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Manage Certifications</h2>
                        <div className="space-y-3 mb-4">
                            {certifications.map(cert => (
                                <div key={cert.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-blue-400" />
                                        <span className="text-sm text-gray-300">{cert.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a href="#" className="text-sm text-amber-400 hover:underline">View</a>
                                        <button className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full border-2 border-dashed border-slate-600 rounded-md py-3 text-sm text-gray-400 hover:bg-slate-800/50 hover:border-slate-500">
                            Upload New Certificate
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Action Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSaveChanges}
                    className="flex items-center justify-center gap-2 bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors"
                >
                    <Save size={20} />
                    Save All Changes
                </button>
            </div>
        </div>
    );
};

const CustomerEngagement = () => {
    const [activeTab, setActiveTab] = useState('messages');

    const renderContent = () => {
        switch (activeTab) {
            case 'messages': return <MessagesView />;
            case 'reviews': return <ReviewsView />;
            case 'coupons': return <CouponsView />;
            default: return <MessagesView />;
        }
    };

    const TabButton = ({ id, label, icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${activeTab === id
                ? 'border-amber-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className="bg-transparent text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Customer Engagement</h1>

            {/* Tab Navigation */}
            <div className="flex items-center border-b border-slate-700 mb-6">
                <TabButton id="messages" label="Messages" icon={<MessageSquare size={16} />} />
                <TabButton id="reviews" label="Reviews & Ratings" icon={<Star size={16} />} />
                <TabButton id="coupons" label="Offers & Coupons" icon={<Ticket size={16} />} />
            </div>

            {/* Tab Content */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};
const MarketingTools = () => {
    const [descKeywords, setDescKeywords] = useState('Handcrafted wooden bowl, acacia wood, salad serving');
    const [generatedDesc, setGeneratedDesc] = useState('');
    const [isDescLoading, setIsDescLoading] = useState(false);

    const [hashtagTopic, setHashtagTopic] = useState('handmade crafts');
    const [generatedHashtags, setGeneratedHashtags] = useState([]);
    const [isHashtagLoading, setIsHashtagLoading] = useState(false);

    const [selectedTemplate, setSelectedTemplate] = useState(posterTemplates[0].id);

    // Simulate AI description generation
    const handleGenerateDescription = (e) => {
        e.preventDefault();
        setIsDescLoading(true);
        setGeneratedDesc('');
        setTimeout(() => {
            setGeneratedDesc("Discover the perfect centerpiece for your table with our exquisite Handcrafted Wooden Bowl. Made from sustainably sourced acacia wood, this stunning bowl is ideal for serving fresh salads, fruits, or as a standalone decorative piece. Each bowl showcases unique natural grain patterns, making it a one-of-a-kind treasure for your home.");
            setIsDescLoading(false);
        }, 2000);
    };

    // Simulate AI hashtag generation
    const handleGenerateHashtags = (e) => {
        e.preventDefault();
        setIsHashtagLoading(true);
        setGeneratedHashtags([]);
        setTimeout(() => {
            setGeneratedHashtags(['#handmade', '#crafts', '#artisan', '#supportlocal', '#handmadegifts', '#woodworking', '#homedecor', '#shopsmall', '#craftsmanship']);
            setIsHashtagLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-transparent text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-8">AI Marketing Toolkit</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* --- LEFT COLUMN --- */}
                <div className="space-y-8">
                    {/* AI Product Description Generator */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="text-purple-400" />
                            <h2 className="text-xl font-semibold">AI Product Description Generator</h2>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Enter a few keywords about your product, and let Gemini write a compelling description for you.</p>
                        <form onSubmit={handleGenerateDescription}>
                            <input
                                type="text"
                                value={descKeywords}
                                onChange={(e) => setDescKeywords(e.target.value)}
                                placeholder="e.g., Ceramic mug, blue glaze, handmade"
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-800/50 border border-slate-700"
                            />
                            <button type="submit" disabled={isDescLoading} className="w-full mt-3 bg-amber-600 font-semibold py-2.5 rounded-md hover:bg-amber-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {isDescLoading ? <LoaderCircle className="animate-spin mx-auto" /> : 'Generate Description'}
                            </button>
                        </form>
                        {generatedDesc && (
                            <div className="mt-4 p-4 bg-slate-800/50 rounded-md border border-slate-700">
                                <p className="text-gray-300 whitespace-pre-wrap">{generatedDesc}</p>
                            </div>
                        )}
                    </div>

                    {/* AI Hashtag Generator */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Hash className="text-blue-400" />
                            <h2 className="text-xl font-semibold">Suggested Hashtags</h2>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Enter a topic to get a list of trending and relevant hashtags for social media.</p>
                        <form onSubmit={handleGenerateHashtags}>
                            <input
                                type="text"
                                value={hashtagTopic}
                                onChange={(e) => setHashtagTopic(e.target.value)}
                                placeholder="e.g., pottery, diwali gifts"
                                className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-800/50 border border-slate-700"
                            />
                            <button type="submit" disabled={isHashtagLoading} className="w-full mt-3 bg-amber-600 font-semibold py-2.5 rounded-md hover:bg-amber-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {isHashtagLoading ? <LoaderCircle className="animate-spin mx-auto" /> : 'Generate Hashtags'}
                            </button>
                        </form>
                        {generatedHashtags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {generatedHashtags.map((tag, i) => (
                                    <span key={i} className="bg-slate-700 text-gray-300 text-sm px-3 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="space-y-8">
                    {/* Poster Generator */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ImageIcon className="text-green-400" />
                            <h2 className="text-xl font-semibold">Auto-Generated Posters</h2>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Select a template and a product to instantly create promotional material.</p>

                        <label className="block text-sm font-medium text-gray-300 mb-2">1. Select a Template</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {posterTemplates.map(template => (
                                <div key={template.id} onClick={() => setSelectedTemplate(template.id)}
                                    className={`rounded-md overflow-hidden cursor-pointer border-2 ${selectedTemplate === template.id ? 'border-amber-500' : 'border-transparent'} `}
                                >
                                    <img src={template.imageUrl} alt={template.name} className="w-full h-full object-cover bg-slate-800/50 border border-slate-700" />
                                </div>
                            ))}
                        </div>

                        <label htmlFor="product-select" className="block text-sm font-medium text-gray-300 mb-2">2. Select a Product</label>
                        <select id="product-select" className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500">
                            <option>Handcrafted Wooden Bowl</option>
                            <option>Ceramic Mug</option>
                            <option>Scented Candle</option>
                        </select>
                        <button className="w-full mt-4 bg-amber-600 font-semibold py-2.5 rounded-md hover:bg-amber-700 transition-colors">Generate Poster</button>
                    </div>

                    {/* Personalized Recommendations */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="text-yellow-400" />
                            <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
                        </div>
                        <div className="space-y-4">
                            {marketingRecommendations.map((rec, i) => (
                                <div key={i} className="p-3 bg-slate-800/50 rounded-lg">
                                    <h3 className="font-semibold text-amber-400">{rec.title}</h3>
                                    <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingsAndSupport = () => {
    const [settings, setSettings] = useState({
        language: 'en',
        notifications: {
            newOrders: true,
            customerMessages: true,
            lowStockAlerts: false,
            promotionalUpdates: true,
        },
    });

    const handleNotificationToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key],
            },
        }));
    };

    return (
        <div className="bg-transparent text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Settings & Support</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* --- LEFT COLUMN: SETTINGS --- */}
                <div className="space-y-8">
                    {/* Language Preferences */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Languages className="text-blue-400" />
                            <h2 className="text-xl font-semibold">Language & Region</h2>
                        </div>
                        <label htmlFor="language-select" className="block text-sm text-gray-400 mb-2">Select your preferred language</label>
                        <select
                            id="language-select"
                            className="w-full bg-slate-800/60 border border-slate-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-900/50"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिन्दी (Hindi)</option>
                            <option value="bn">বাংলা (Bengali)</option>
                            <option value="mr">मराठी (Marathi)</option>
                        </select>
                    </div>

                    {/* Notification Preferences */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="text-amber-400" />
                            <h2 className="text-xl font-semibold">Notification Preferences</h2>
                        </div>
                        <div className="space-y-4">
                            <ToggleSwitch id="notif-orders" label="New Order Alerts" checked={settings.notifications.newOrders} onChange={() => handleNotificationToggle('newOrders')} />
                            <ToggleSwitch id="notif-messages" label="Customer Messages" checked={settings.notifications.customerMessages} onChange={() => handleNotificationToggle('customerMessages')} />
                            <ToggleSwitch id="notif-stock" label="Low Stock Warnings" checked={settings.notifications.lowStockAlerts} onChange={() => handleNotificationToggle('lowStockAlerts')} />
                            <ToggleSwitch id="notif-promos" label="Promotional Updates" checked={settings.notifications.promotionalUpdates} onChange={() => handleNotificationToggle('promotionalUpdates')} />
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 bg-slate-700 font-semibold py-2.5 rounded-md hover:bg-slate-600 transition-colors py-3">
                                <Lock size={16} /> Change Password
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 bg-red-800/50 text-red-300 font-semibold py-2.5 rounded-md hover:bg-red-800/70 transition-colors py-3">
                                <Trash2 size={16} /> Delete Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: SUPPORT --- */}
                <div className="space-y-8">
                    {/* Help Center */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="text-green-400" />
                            <h2 className="text-xl font-semibold">Help Center</h2>
                        </div>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input type="text" placeholder="Search for help articles..." className="w-full bg-slate-800/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-900/50 py-2" />
                        </div>
                        <div className="space-y-3">
                            {faqData.map((faq, i) => (
                                <div key={i}>
                                    <h3 className="font-semibold text-gray-200">{faq.q}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Tickets */}
                    <div className="rounded-lg border bg-slate-900/50 border-slate-700 backdrop-blur-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <Ticket className="text-purple-400" />
                                <h2 className="text-xl font-semibold">My Support Tickets</h2>
                            </div>
                            <button className="flex items-center gap-2 bg-amber-600 text-white font-semibold py-2 px-3 text-sm rounded-md hover:bg-amber-700">
                                <PlusCircle size={16} /> New Ticket
                            </button>
                        </div>
                        <div className="space-y-3">
                            {initialSupportTickets.map(ticket => (
                                <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                                    <div>
                                        <p className="font-medium">{ticket.subject}</p>
                                        <p className="text-xs text-gray-400">{ticket.id} &bull; Last update: {ticket.lastUpdate}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${ticket.status === 'Open' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>{ticket.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const SellerDashboard = () => {
    const [activeView, setActiveView] = useState('overview');

    useEffect(() => {
        document.title = `Seller Dashboard - ${activeView}`;
        console.log(`Active view changed to: ${activeView}`);
    }, [activeView]);

    const renderView = () => {
        switch (activeView) {
            case 'overview':
                return <Overview />;
            case 'add-product':
                return <AddNewProduct />;
            case 'orders':
                return <OrderManagement />;
            case 'payouts-history':
                return <EarningsAndPayments />;
            case 'analytics':
                return <AnalyticsAndInsights />;

            case 'artisan-profile':
                return <ArtisanProfile />;

            case 'buyer-chats':
                return <CustomerEngagement />;

            case 'marketing':
                return <MarketingTools />;
            case 'setting':
                return <SettingsAndSupport />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pt-20">
            <div className="flex font-sans min-h-screen text-gray-800">

                <Sidebar activeView={activeView} setActiveView={setActiveView} />

                <main className="flex-1 p-8 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;