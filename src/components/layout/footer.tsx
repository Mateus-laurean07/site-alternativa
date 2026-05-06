import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
} from "lucide-react";

const footerLinks = {
    produtos: [
        { title: "Linha Multicocho", href: "/produtos/multicocho" },
        { title: "Linha Protecocho", href: "/produtos/protecocho" },
        { title: "Linha Hidramax", href: "/produtos/hidramax" },
        { title: "Linha Nutrisilo", href: "/produtos/nutrisilo" },
        { title: "Linha Suínos", href: "/produtos/suinos" },
    ],
    institucional: [
        { title: "Quem Somos", href: "/quem-somos" },
        { title: "Representantes", href: "/representantes" },
        { title: "Blog", href: "/blog" },
        { title: "Suporte", href: "/suporte" },
        { title: "Contato", href: "/contato" },
    ],
    ferramentas: [
        { title: "Calculadora", href: "/calculadora" },
        { title: "Manual de Instalação", href: "/suporte" },
        { title: "Catálogo Digital", href: "/suporte" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/alternativaplasticos", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/alternativaplasticos", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/@alternativaplasticos", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="relative bg-brand-charcoal text-white/90 overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-brand-orange to-brand-green" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="relative w-48 h-12 mb-6">
                            <Image
                                src="/logo-white.png"
                                alt="Alternativa Plásticos"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                            Soluções em plástico rotomoldado para pecuária e suinocultura.
                            Alta durabilidade, zero manutenção.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-2 rounded-full bg-white/10 hover:bg-brand-green transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Produtos
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.produtos.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-brand-orange transition-colors duration-300"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Institutional */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Institucional
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.institucional.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-brand-orange transition-colors duration-300"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Contato
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                                <span className="text-sm text-white/60">
                                    Santa Rosa, RS - Brasil
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                                <span className="text-sm text-white/60">(55) 3511-1234</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                                <span className="text-sm text-white/60">
                                    contato@alternativaplasticos.com.br
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Alternativa Plásticos. Todos os direitos
                        reservados.
                    </p>
                    <p className="text-xs text-white/40">
                        Desenvolvido por{" "}
                        <a
                            href="https://naveo.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange hover:text-brand-orange-hover transition-colors"
                        >
                            Naveo
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
