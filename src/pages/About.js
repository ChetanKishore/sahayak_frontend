
import React from 'react'
import HeroSection from '../components/About/HeroSection'
import StartFundRaising from '../components/About/StartFundRaising'
import MedicalCategories from '../components/About/MedicalCategories'
import Review from '../components/About/Review'
import Follow from '../components/About/Follow'
import { motion } from 'framer-motion'

const About = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            <HeroSection />
            <StartFundRaising />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="section-padding text-center"
            >
                <button className='btn-primary text-2xl px-16 py-6 mx-auto block transform hover:scale-105 transition-all duration-300 shadow-2xl'>
                    Start A Fundraiser For Free Now
                    <div className="w-6 h-6 ml-3 inline-flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </button>
            </motion.div>

            <MedicalCategories/>
            <Review/>
            <Follow/>
        </div>
    )
}

export default About
