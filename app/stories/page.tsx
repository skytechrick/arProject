
const featuredArtisans = [
    { name: 'Ramesh', craft: 'Pottery', image: "/s1.png" },
    { name: 'Priya', craft: 'Weaving', image: "/s2.png" },
    { name: 'Arjun', craft: 'Wood Carving', image: "/s3.png" },
    { name: 'Meera', craft: 'Painting', image: "/s4.png" },
    { name: 'Vikram', craft: 'Jewelry', image: "/s5.png" },
];

const regions = [
    { name: 'Kashmir', image: '/t1.png' },
    { name: 'Rajasthan', image: '/t2.png' },
    { name: 'Kerala', image: '/t3.png' },
    { name: 'Uttar Pradesh', image: '/t4.png' },
    { name: 'Gujarat', image: '/t5.png' },
    { name: 'Tamil Nadu', image: 't6.png' },
    { name: 'West Bengal', image: '/t7.png' },
    { name: 'Maharashtra', image: '/t8.png' },
];

export default function Page() {

    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pt-20'>


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

                <section className="py-16">
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

                <section className="py-16">

                </section>

            </div>
        </>
    )
}