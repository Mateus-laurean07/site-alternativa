"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

const productLines = [
    {
        title: "Linha Multicocho",
        href: "/produtos/multicocho",
        items: ["Multicocho 200", "Multicocho 250", "Multicocho Confinamento"],
    },
    {
        title: "Linha Protecocho",
        href: "/produtos/protecocho",
        items: ["Protecocho 200", "Protecocho 250", "Autoabastecimento", "Creep Feeding"],
    },
    {
        title: "Linha Hidramax",
        href: "/produtos/hidramax",
        items: ["Hidramax 1300"],
    },
    {
        title: "Linha Nutrisilo",
        href: "/produtos/nutrisilo",
        items: ["Nutrisilo"],
    },
    {
        title: "Linha Suínos",
        href: "/produtos/suinos",
        items: ["Piso Vazado", "Cocho Matriz", "Cocho Leitão", "Portões", "Bandejas"],
    },
];

const navLinks = [
    { title: "Quem Somos", href: "/quem-somos" },
    { title: "Produtos", href: "/produtos", hasDropdown: true },
    { title: "Representantes", href: "/representantes" },
    { title: "Calculadora", href: "/calculadora" },
    { title: "Blog", href: "/blog" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "backdrop-blur-3xl bg-white/95 border-b border-border/10 shadow-sm"
                    : "bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-40 md:w-48 h-10 md:h-12">
                            <Image
                                src="/logo.png"
                                alt="Alternativa Plásticos"
                                fill
                                className="object-contain"
                                style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.title}
                                className="relative group"
                                onMouseEnter={() => link.hasDropdown && setProductsOpen(true)}
                                onMouseLeave={() => link.hasDropdown && setProductsOpen(false)}
                            >
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 flex items-center gap-1 ${scrolled
                                            ? "text-brand-charcoal hover:text-brand-green"
                                            : "text-white/90 hover:text-white"
                                        }`}
                                >
                                    {link.title}
                                    {link.hasDropdown && (
                                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                                    )}
                                </Link>

                                {/* Products Mega Menu */}
                                {link.hasDropdown && (
                                    <AnimatePresence>
                                        {productsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/30 p-6 grid grid-cols-3 gap-4"
                                            >
                                                {productLines.map((line) => (
                                                    <div key={line.title}>
                                                        <Link
                                                            href={line.href}
                                                            className="text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
                                                        >
                                                            {line.title}
                                                        </Link>
                                                        <ul className="mt-2 space-y-1">
                                                            {line.items.map((item) => (
                                                                <li key={item}>
                                                                    <Link
                                                                        href={`${line.href}#${item.toLowerCase().replace(/ /g, '-')}`}
                                                                        className="text-xs text-muted-foreground hover:text-brand-charcoal transition-colors cursor-pointer"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Language Selector */}
                        <button className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold transition-colors rounded-lg ${scrolled
                                ? "text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-muted"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                            }`}>
                            <Globe className="w-4 h-4" />
                            PT
                        </button>

                        {/* CTA Button */}
                        <Link
                            href="/contato"
                            className="relative inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-green to-brand-green-dark rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/25"
                        >
                            <span className="relative z-10">Solicitar Orçamento</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orange-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "hover:bg-muted text-brand-charcoal" : "hover:bg-white/10 text-white"
                            }`}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:hidden overflow-hidden border-t border-border/40 bg-white/95 backdrop-blur-2xl"
                    >
                        <div className="px-4 py-6 space-y-3">
                            {navLinks.map((link) => (
                                <div key={link.title}>
                                    {!link.hasDropdown ? (
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 text-sm font-semibold text-brand-charcoal hover:text-brand-green hover:bg-muted rounded-lg transition-all"
                                        >
                                            {link.title}
                                        </Link>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="px-4 py-3 text-sm font-semibold text-brand-green bg-muted/50 rounded-lg">
                                                {link.title}
                                            </div>
                                            <div className="pl-8 space-y-2 pb-2">
                                                {productLines.map((line) => (
                                                    <div key={line.title} className="mb-3 border-l-2 border-brand-green/20 pl-4">
                                                        <Link
                                                            href={line.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className="block text-sm font-medium text-brand-charcoal mb-2"
                                                        >
                                                            {line.title}
                                                        </Link>
                                                        <ul className="space-y-2 pl-2">
                                                            {line.items.map((item) => (
                                                                <li key={item}>
                                                                    <Link
                                                                        href={`${line.href}#${item.toLowerCase().replace(/ /g, '-')}`}
                                                                        onClick={() => setMobileOpen(false)}
                                                                        className="block text-xs text-muted-foreground hover:text-brand-green transition-colors"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 border-t border-border/40">
                                <Link
                                    href="/contato"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-green to-brand-green-dark rounded-full"
                                >
                                    Solicitar Orçamento
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
