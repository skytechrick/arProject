"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
    Menu, X, CuboidIcon as Cube, Sparkles, User, Settings, LogOut, ChevronDown, Store, ShoppingCart
    , Package, Heart, Gift, CreditCard, Bell, Headset

} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DemoModal } from "@/components/demo-modal"

const navigation = [
    //   { name: "Home", href: "/" },
    // { name: "Location", href: "/location" },
    { name: "Marketplace", href: "/" },
    { name: "Stories", href: "/stories" },
    { name: "Explore", href: "/explore" },
    { name: "AI picks", href: "/ai-picks" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [showDemo, setShowDemo] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const [locationDrop, setLocationDrop] = useState(false);
    const [languageDrop, setLanguageDrop] = useState(false);

    const onLocationClick = () => {
        setLocationDrop(!locationDrop);
    }
    const onLanguageClick = () => {
        setLanguageDrop(!languageDrop);
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true"
        const email = localStorage.getItem("userEmail") || ""
        const name = localStorage.getItem("userName") || ""
        setIsLoggedIn(loggedIn)
        setUserEmail(email)
        setUserName(name)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userName")
        setIsLoggedIn(false)
        router.push("/")
    }

    const getInitials = (name: string, email: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
        }
        return email.charAt(0).toUpperCase()
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50" : "bg-transparent"
                    }`}
            >
                <div className="mx-auto w-9/10 mx-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex">

                            <Link href="/" className="flex items-center space-x-2 ">
                                <div className="relative ">
                                    {/* <Cube className="h-8 w-8 text-purple-400" /> */}

                                    <div className="h-full">
                                        <img
                                            src="/logo.png"
                                            alt="Logo"
                                            className="h-8 w-8"
                                        />
                                    </div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        className="absolute inset-0"
                                    >
                                        <Sparkles className="h-3 w-3 text-cyan-400 absolute -top-1 -right-1" />
                                    </motion.div>
                                </div>
                                {/* <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    AI3D Studio
                                </span> */}
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex md:items-center md:space-x-8">
                                <div
                                    key={"location2"}
                                    className={`relative top-0 left-2 px-3 py-2 text-sm font-medium transition-colors duration-200 text-slate-300 hover:text-white`}
                                    onClick={onLocationClick}
                                >
                                    <div className="flex items-start justify-center cursor-pointer select-none">

                                        {"Location"} <ChevronDown
                                            className={`ml-1 h-4 w-4 relative top-1 transition-transform duration-200 ${locationDrop ? "transform rotate-180" : ""}`}
                                        />
                                    </div>
                                    {
                                        locationDrop &&
                                        <div className="absolute top-10 left-0 bg-slate-900 border border-slate-700 rounded-md shadow-lg p-2 w-48">
                                            <ul>
                                                <li className="p-1 hover:bg-gray-100/50">Siliguri</li>
                                                <li className="p-1 hover:bg-gray-100/50">Darjeeling</li>
                                                <li className="p-1 hover:bg-gray-100/50">Jalpaiguri</li>
                                                <li className="p-1 hover:bg-gray-100/50">Alipurduwar</li>
                                                <li className="p-1 hover:bg-gray-100/50">Malda</li>
                                                <li className="p-1 hover:bg-gray-100/50">Kolkata</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname === item.href ? "text-purple-400" : "text-slate-300 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                        {pathname === item.href && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>

                        </div>
                        {/* Right Side */}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            <div
                                className="relative top-0 hover:bg-slate-500/50 rounded-lg cursor-pointer px-2 py-1 hidden md:flex md:items-center md:space-x-2 text-sm"
                                onClick={onLanguageClick}
                            >
                                English
                                <ChevronDown
                                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${languageDrop ? "transform rotate-180" : ""}`}
                                />

                                {
                                    languageDrop &&
                                    <div className="absolute top-10 left-0 bg-slate-900 border border-slate-700 rounded-md shadow-lg p-2 w-48">
                                        <ul>
                                            <li className="p-1 hover:bg-gray-100/50">English</li>
                                            <li className="p-1 hover:bg-gray-100/50">Hindi</li>
                                            <li className="p-1 hover:bg-gray-100/50">Bengali</li>
                                            <li className="p-1 hover:bg-gray-100/50">Marathi</li>
                                            <li className="p-1 hover:bg-gray-100/50">Panjabi</li>
                                        </ul>
                                    </div>
                                }
                            </div>

                            <Link href={"/become-a-seller"} className="hover:bg-slate-500/50 rounded-lg cursor-pointer px-2 py-1 hidden md:flex md:items-center md:space-x-2 text-sm">
                                <Store />
                                <span>Become a Seller</span>
                            </Link>
                            <div className="hover:bg-slate-500/50 rounded-lg cursor-pointer px-2 py-1 hidden md:flex md:items-center md:space-x-2 text-sm">
                                <ShoppingCart />
                                <span>Cart</span>
                            </div>

                            {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                                <AvatarFallback className="bg-purple-600 text-white">
                                                    {getInitials(userName, userEmail)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700" align="end">
                                        <div className="flex items-center justify-start gap-2 p-2">
                                            <div className="flex flex-col space-y-1 leading-none">
                                                {userName && <p className="font-medium text-white">{userName}</p>}
                                                <p className="w-[200px] truncate text-sm text-slate-400">{userEmail}</p>
                                            </div>
                                        </div>
                                        <DropdownMenuSeparator className="bg-slate-700" />
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                My profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard2" className="flex items-center">
                                                <Sparkles className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/orders" className="flex items-center">
                                                <Package className="mr-2 h-4 w-4" />
                                                Orders
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/wishlist" className="flex items-center">
                                                <Heart className="mr-2 h-4 w-4" />
                                                Wishlist
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/rewards" className="flex items-center">
                                                <Gift className="mr-2 h-4 w-4" />
                                                Rewards
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/gift-cards" className="flex items-center">
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Gift cards
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/notification" className="flex items-center">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Notification
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/customer-care" className="flex items-center">
                                                <Headset className="mr-2 h-4 w-4" />
                                                24x7 Customer Care
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-700" />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="hidden md:flex md:items-center md:space-x-2">
                                    <Button variant="ghost" className="text-slate-300 hover:text-white" onClick={() => setShowDemo(true)}>
                                        Watch Demo
                                    </Button>
                                    <Button variant="ghost" className="text-slate-300 hover:text-white" asChild>
                                        <Link href="/auth/login">Sign In</Link>
                                    </Button>
                                    <Button
                                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                        asChild
                                    >
                                        <Link href="/auth/signup">Sign Up</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-slate-300"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md"
                        >
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${pathname === item.href
                                            ? "text-purple-400 bg-purple-900/20"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                {!isLoggedIn && (
                                    <div className="space-y-2 pt-4 border-t border-slate-800">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-slate-300"
                                            onClick={() => {
                                                setShowDemo(true)
                                                setIsOpen(false)
                                            }}
                                        >
                                            Watch Demo
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-slate-300"
                                            asChild
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Link href="/auth/login">Sign In</Link>
                                        </Button>
                                        <Button
                                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0"
                                            asChild
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Link href="/auth/signup">Sign Up</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            <DemoModal open={showDemo} onOpenChange={setShowDemo} />
        </>
    )
}
