import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountry } from '../data/selectors';
import { MapPin, ArrowLeft, ChevronLeft, ChevronRight, Plane } from 'lucide-react';

import CountryNotFound from './CountryNotFound';

export default function CountryPage() {
    const { continent, country } = useParams();
    const data = getCountry(continent, country);

    const [currentSlide, setCurrentSlide] = useState(0);
    
    const [cuisineSlide, setCuisineSlide] = useState(0);

    if (!data)
        return <CountryNotFound continent={continent} slug={country} />;

    const images = data.images && data.images.length > 0 ? data.images : [];
    const hasImages = images.length > 0;

    const nextSlide = () => {
        if (!hasImages) return;
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    const prevSlide = () => {
        if (!hasImages) return;
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const mockCuisines = [
        { name: "Local Delicacy A", desc: "A famous staple dish served in local restaurants.", img: images[0] || "" },
        { name: "Traditional Stew", desc: "Rich flavors made with local spices and ingredients.", img: images[1] || "" },
    ];

    const nextCuisine = () => setCuisineSlide((prev) => (prev === mockCuisines.length - 1 ? 0 : prev + 1));
    const prevCuisine = () => setCuisineSlide((prev) => (prev === 0 ? mockCuisines.length - 1 : prev - 1));


    return (
        <div className="w-full pb-10">
            <div className="container mx-auto px-4 mt-4">
                <Link to={`/${continent}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Back to {continent}
                </Link>
            </div>

            <section className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase rounded-full tracking-wider">
                                Destination
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">
                            {data.name}, {continent}
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            {data.desc}
                        </p>
                        <div className="flex items-center text-gray-500 font-medium">
                            <MapPin className="text-red-500 mr-2" size={20} />
                            Explore the beauty of {data.name}
                        </div>
                    </div>
                </div>
            </section>

            {hasImages && (
                <section className="bg-gray-900 py-12 text-white relative">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6 pl-4 border-l-4 border-yellow-500">
                            Hotspots
                        </h2>

                        <div className="relative w-full aspect-video md:aspect-[21/9] bg-black rounded-lg overflow-hidden group">
                            
                            <img 
                                src={images[currentSlide]} 
                                alt={`Slide ${currentSlide}`} 
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                            
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
                                <h5 className="text-xl md:text-2xl font-bold">Gallery Image {currentSlide + 1}</h5>
                                <p className="text-gray-300">Beautiful destination in {data.name}</p>
                            </div>

                            <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all">
                                <ChevronRight size={32} />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-6 pl-4 border-l-4 border-blue-500">
                    Local Cuisines
                </h2>
                
                <div className="relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    <div className="flex flex-col md:flex-row h-full md:h-80">
                        <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-200">
                             {hasImages ? (
                                 <img 
                                    src={mockCuisines[cuisineSlide].img || images[0]} 
                                    alt="Cuisine" 
                                    className="w-full h-full object-cover"
                                 />
                             ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                             )}
                        </div>

                        <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {mockCuisines[cuisineSlide].name}
                            </h3>
                            <p className="text-gray-600 text-lg">
                                {mockCuisines[cuisineSlide].desc}
                            </p>

                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button onClick={prevCuisine} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={nextCuisine} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 w-full">
                            <h6 className="font-semibold text-lg flex items-center mb-1">
                                <span className="text-yellow-500 font-bold mr-2">8C9N</span> 
                                Flight to {data.name}
                            </h6>
                            <div className="text-gray-500 flex items-center gap-2">
                                <Plane size={16} /> American Airlines (Placeholder)
                            </div>
                        </div>

                        <div className="text-center md:text-right w-full md:w-auto">
                            <div className="font-bold text-blue-600 text-xl mb-2">
                                IDR 50.100.000<span className="text-sm text-gray-400 font-normal">/pax</span>
                            </div>
                            <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-8 rounded-lg transition-colors shadow-sm">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
