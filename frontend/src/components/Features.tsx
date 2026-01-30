import React from 'react';
import { Truck, ShieldCheck, BookOpen, Clock } from 'lucide-react';

const features = [
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "Extensive Collection",
        description: "Browse through thousands of titles across diverse genres and categories."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast Delivery",
        description: "Get your favorite books delivered to your doorstep within 2-3 business days."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Secure Payment",
        description: "Shop with confidence using our encrypted and secure payment gateways."
    },
    {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: "24/7 Support",
        description: "Our customer support team is available round the clock to assist you."
    }
];

const Features: React.FC = () => {
    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We provide the best reading experience with top-notch services tailored for book lovers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
                            <div className="p-4 bg-blue-50 rounded-full mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
