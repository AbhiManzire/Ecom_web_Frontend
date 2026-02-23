import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const CustomDropdown = ({ label, options, value, onChange, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className={`flex items-center gap-4 bg-white p-2 rounded-full border border-slate-dark/5 shadow-sm relative ${className}`} ref={dropdownRef}>
            {label && <span className="text-[10px] font-black text-slate-dark/30 uppercase tracking-widest pl-4">{label}:</span>}

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between gap-4 bg-slate-dark text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all min-w-[200px]"
                >
                    <span>{selectedOption.label}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaChevronDown className="text-[10px]" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full bg-[#30364F] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] border-t border-white/5"
                            style={{ minWidth: '100%' }}
                        >
                            <div className="flex flex-col">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-8 py-5 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${value === option.value
                                            ? 'bg-[#2563EB] text-white'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CustomDropdown;
