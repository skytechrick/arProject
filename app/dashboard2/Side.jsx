'use client';
import React from 'react';
import {
    Home,
    LayoutList,
    PlusSquare,
    Package,
    DollarSign,
    BarChart2,
    Lightbulb,
    MessageCircle,
    Settings,
    LogOut,
    Gem
} from 'lucide-react';

const user = {
    name: 'Crafted Creations',
    shopName: 'Rick Sarkar',
    avatarUrl: 'https://i.pravatar.cc/40?u=rick_shop',
};

const Sidebar = ({ activeView, setActiveView }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
        { id: 'add-product', label: 'Add New Product', icon: <PlusSquare size={20} /> },
        { id: 'orders', label: 'Manage Orders', icon: <Package size={20} /> },
        { id: 'payouts-history', label: 'Payouts & History', icon: <DollarSign size={20} /> },
        { id: 'analytics', label: 'AI Analytics', icon: <BarChart2 size={20} /> },
        { id: 'artisan-profile', label: 'Artisan Profile', icon: <Lightbulb size={20} /> },
        { id: 'buyer-chats', label: 'Buyer Chats', icon: <MessageCircle size={20} /> },
        { id: 'marketing', label: 'Marketing Tools', icon: <Gem size={20} /> },
        { id: '3darvr', label: '3D(AR/VR)', icon: <BarChart2 size={20} /> },
        { id: 'setting', label: 'Setting', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-64 flex flex-col justify-center border-r border-gray-200 shadow-sm">

            <div className="p-5 flex items-center justify-center gap-4 border-b border-gray-100">
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h3 className="text-base font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-white">{user.shopName}</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-5 space-y-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}

                        >
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveView(item.id);
                                }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${activeView === item.id
                                    ? 'bg-white font-bold text-orange-600 font-medium'
                                    : 'text-white hover:bg-gray-50 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Logout clicked");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;