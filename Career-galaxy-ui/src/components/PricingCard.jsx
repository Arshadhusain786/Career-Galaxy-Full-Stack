import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const PricingCard = ({ plan, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`relative p-8 bg-white rounded-2xl border flex flex-col transition-shadow duration-300 ${
                plan.popular 
                    ? 'border-purple-500 shadow-xl shadow-purple-500/20 scale-105 z-10' 
                    : 'border-gray-200 shadow-sm hover:shadow-lg'
            }`}
        >
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-md">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.formattedPrice}</span>
                <span className="text-gray-500 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {feat}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 hover:-translate-y-0.5' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:-translate-y-0.5'
            }`}>
                Choose {plan.name}
            </button>
        </motion.div>
    );
};

export default PricingCard;
