// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Heart, Eye, Star, Download } from 'lucide-react';
// import Image from 'next/image';



// interface Model {
//     id: string;
//     title: string;
//     creator: string;
//     image?: string;
//     featured: boolean;
//     price: number;
//     originalPrice?: number;
//     tags: string[];
//     rating: number;
//     reviews: number;
//     likes: number;
//     downloads: number;
// }

// interface ModelCardsProps {
//     filteredModels: Model[];
// }

// const ModelCards: React.FC<ModelCardsProps> = ({ filteredModels }) => {
//     const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

//     console.log('Filtered Models:', filteredModels);

//     const handleFlip = (id: string) => {
//         setFlippedCards(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(id)) {
//                 newSet.delete(id);
//             } else {
//                 newSet.add(id);
//             }
//             return newSet;
//         });
//     };

//     return (
//         <>
//             {filteredModels.map((model, index) => {

//                 const isFlipped = flippedCards.has(model.id);

//                 return (
//                     <motion.div
//                         key={model.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: index * 0.1 }}
//                         className="relative w-full h-full"
//                         style={{ perspective: '1000px' }}
//                     >
//                         <motion.div
//                             className="relative w-full h-full"
//                             animate={{ rotateY: isFlipped ? 180 : 0 }}
//                             transition={{ duration: 0.6 }}
//                             style={{ transformStyle: 'preserve-3d' }}
//                         >
//                             {/* Front of card */}
//                             <motion.div
//                                 className="absolute inset-0 w-full h-full"
//                                 style={{ backfaceVisibility: 'hidden' }}
//                             >
//                                 <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm h-full">
//                                     <div className="relative overflow-hidden">
//                                         <Image
//                                             src={model.image || "/placeholder.svg"}
//                                             alt={model.title}
//                                             width={300}
//                                             height={300}
//                                             className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                                         />

//                                         {/* Overlay */}
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                                         {/* Action Buttons */}
//                                         <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
//                                                 <Heart className="w-4 h-4" />
//                                             </Button>
//                                             <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
//                                                 <Eye className="w-4 h-4" />
//                                             </Button>
//                                         </div>

//                                         {/* Featured Badge */}
//                                         {model.featured && (
//                                             <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
//                                                 Featured
//                                             </Badge>
//                                         )}

//                                         {/* Price Badge */}
//                                         <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
//                                             {model.price === 0 ? "Free" : `$${model.price}`}
//                                         </Badge>
//                                     </div>

//                                     <CardContent className="p-4">
//                                         <h3 className="font-semibold text-white mb-1 truncate">{model.title}</h3>
//                                         <p className="text-sm text-slate-400 mb-2">by {model.creator}</p>

//                                         {/* Tags */}
//                                         <div className="flex flex-wrap gap-1 mb-3">
//                                             {model.tags.slice(0, 2).map((tag) => (
//                                                 <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
//                                                     {tag}
//                                                 </Badge>
//                                             ))}
//                                         </div>

//                                         {/* Stats */}
//                                         <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
//                                             <div className="flex items-center">
//                                                 <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
//                                                 <span>{model.rating}</span>
//                                                 <span className="ml-1">({model.reviews})</span>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span>{model.likes} likes</span>
//                                                 <span>{model.downloads} downloads</span>
//                                             </div>
//                                         </div>

//                                         {/* Price and Action */}
//                                         <div className="flex items-center justify-between">
//                                             <div>
//                                                 {model.price === 0 ? (
//                                                     <span className="font-bold text-green-400">Free</span>
//                                                 ) : (
//                                                     <div className="flex items-center gap-2">
//                                                         <span className="font-bold text-yellow-400">${model.price}</span>
//                                                         {model.originalPrice && (
//                                                             <span className="text-xs text-slate-500 line-through">${model.originalPrice}</span>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="flex gap-2">
//                                                 <Button
//                                                     size="sm"
//                                                     className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
//                                                 >
//                                                     Add to cart
//                                                 </Button>
//                                                 <Button
//                                                     size="sm"
//                                                     className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
//                                                 >
//                                                     {model.price === 0 ? (
//                                                         <>
//                                                             <Download className="w-3 h-3 mr-1" />
//                                                             Download
//                                                         </>
//                                                     ) : (
//                                                         "Buy Now"
//                                                     )}
//                                                 </Button>
//                                             </div>
//                                         </div>

//                                         {/* View Story Button */}
//                                         <div className="flex items-center justify-center mt-4">
//                                             <Button
//                                                 variant="ghost"
//                                                 className="text-xs text-slate-400 hover:text-white hover:bg-slate-400/20 rounded-2xl bg-slate-400/10 px-3 py-1 transition-all duration-200"
//                                                 onClick={() => handleFlip(model.id)}
//                                             >
//                                                 View story
//                                             </Button>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </motion.div>

//                             {/* Back of card (flipped) */}
//                             <motion.div
//                                 className="absolute inset-0 w-full h-full bg-red-500 rounded-lg flex items-center justify-center"
//                                 style={{
//                                     backfaceVisibility: 'hidden',
//                                     transform: 'rotateY(180deg)'
//                                 }}
//                             >
//                                 <div className="p-4 text-center">
//                                     <h3 className="font-bold text-white text-xl mb-2">Story Mode</h3>
//                                     <p className="text-white mb-4">This is the back of the card for {model.title}</p>
//                                     <Button
//                                         onClick={() => handleFlip(model.id)}
//                                         className="bg-white text-red-500 hover:bg-gray-100"
//                                     >
//                                         Flip Back
//                                     </Button>
//                                 </div>
//                             </motion.div>

//                         </motion.div>
//                     </motion.div>
//                 );
//             })}
//         </>
//     );
// };

// export default ModelCards;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, Star, Download, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const textPara = `"Lorem ipsum dolor, sit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetursit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetur adipisicing Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi doloribus inventore eveniet, itaque eligendi ducimus molestias atque nostrum deleniti possimus enim quas harum facilis, amet quidem ab perferendis voluptatibus quasi. Nihil aliquid amet sequi porro omnis`

interface Model {
    id: string;
    title: string;
    creator: string;
    image?: string;
    featured: boolean;
    price: number;
    originalPrice?: number;
    tags: string[];
    rating: number;
    reviews: number;
    likes: number;
    downloads: number;
}

interface ModelCardsProps {
    filteredModels: Model[];
}

const ModelCards: React.FC<ModelCardsProps> = ({ filteredModels }) => {
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

    const handleFlip = (id: string) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModels.map((model, index) => {
                const isFlipped = flippedCards.has(model.id);

                return (
                    <div key={model.id} className="h-[380px] w-full" style={{ perspective: '1000px' }}>
                        <motion.div
                            className="relative w-full h-full"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front of card */}
                            <div
                                className="absolute inset-0 w-full h-full bg-slate-900 rounded-xl overflow-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
                                    <div className="relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src={model.image || "/placeholder.svg"}
                                            alt={model.title}
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
                                        {model.featured && (
                                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white">
                                                Featured
                                            </Badge>
                                        )}

                                        {/* Price Badge */}
                                        <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                                            {model.price === 0 ? "Free" : `₹${model.price}`}
                                        </Badge>
                                    </div>

                                    <CardContent className="relative top-0 p-4 flex-grow flex flex-col">
                                        <h3 className="font-semibold text-white mb-1 truncate">{model.title}</h3>
                                        <p className="text-sm text-slate-400 mb-2">by {model.creator}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {model.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Stats */}
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

                                        {/* Price and Action */}
                                        <div className="flex items-center justify-between mt-0">
                                            <div>
                                                {model.price === 0 ? (
                                                    <span className="font-bold text-green-400">Free</span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-yellow-400">₹{model.price}</span>
                                                        {model.originalPrice && (
                                                            <span className="text-xs text-slate-500 line-through">₹{model.originalPrice}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
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
                                        </div>

                                        {/* View Story Button */}
                                        <div className="flex items-center justify-center mt-4">
                                            <Button
                                                variant="ghost"
                                                className="absolute right-3 top-[30%] text-xs text-slate-400 hover:text-white hover:bg-slate-400/20 rounded-2xl bg-slate-400/10 px-3 py-1 transition-all duration-200"
                                                onClick={() => handleFlip(model.id)}
                                            >
                                                View story
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Back of card (flipped) */}
                            <div
                                className="absolute inset-0 w-full h-full bg-slate-800/70 rounded-xl p-4 shadow-lg shadow-blue-100/20"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="">
                                    <div className='mb-2'>
                                        <img
                                            src="/placeholder.svg"
                                            alt="Profile image"
                                            className="w-14 h-14 rounded-full mx-auto inline-block mr-4"
                                        />
                                        <h2 className="inline-block text-white text-lg font-semibold">Profile Name</h2>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base mb-2">Story Mode</h3>
                                        <p className='text-sm'>{textPara.slice(0, 360)}...</p>
                                    </div>
                                    <div
                                        className='flex items-center justify-between mt-2'
                                    >

                                        <Button
                                            onClick={() => handleFlip(model.id)}
                                            className="bg-white text-slate-500 hover:bg-gray-100 font-medium px-2 py-1"
                                        >
                                            <ChevronLeft /> Back
                                        </Button>
                                        <div className='flex gap-2 text-sm'>
                                            Signature
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

export default ModelCards;