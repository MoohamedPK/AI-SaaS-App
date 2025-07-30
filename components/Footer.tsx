"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Github,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Animate each section sequentially
        sectionRefs.current.forEach((section, i) => {
            if (section) {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
                },
                delay: i * 0.15
            });
            }
        });

        // Animate social icons on hover
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gsap.utils.toArray(".social-icon").forEach((icon: any) => {
            icon.addEventListener("mouseenter", () => {
            gsap.to(icon, {
                y: -5,
                scale: 1.1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            });
            icon.addEventListener("mouseleave", () => {
            gsap.to(icon, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            });
        });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const links = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" }
    ];

    const socialLinks = [
        { icon: <Facebook size={20} />, href: "#" },
        { icon: <Twitter size={20} />, href: "#" },
        { icon: <Instagram size={20} />, href: "#" },
        { icon: <Linkedin size={20} />, href: "#" },
        { icon: <Github size={20} />, href: "#" }
    ];

    const contactInfo = [
        { icon: <Mail size={18} />, text: "support@companionapp.com" },
        { icon: <Phone size={18} />, text: "+1 (555) 123-4567" },
        { icon: <MapPin size={18} />, text: "San Francisco, CA" }
    ];

    return (
        <footer 
        ref={footerRef}
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8"
        >
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo and description */}
            <div 
                ref={el => { sectionRefs.current[0] = el; }}
                className="space-y-4"
            >
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                CompanionAI
                </h2>
                <p className="text-gray-400">
                Revolutionizing learning with AI-powered companions for personalized education experiences.
                </p>
                <div className="flex space-x-4 mt-4">
                {socialLinks.map((social, i) => (
                    <Link
                    key={i}
                    href={social.href}
                    className="social-icon text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label={social.icon.type.name}
                    >
                    {social.icon}
                    </Link>
                ))}
                </div>
            </div>

            {/* Quick links */}
            <div 
                ref={el => { sectionRefs.current[1] = el; }}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                {links.map((link, i) => (
                    <li key={i}>
                    <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Contact info */}
            <div 
                ref={el => { sectionRefs.current[2] = el; }}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <ul className="space-y-3">
                {contactInfo.map((info, i) => (
                    <li key={i} className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-0.5">{info.icon}</span>
                    <span className="text-gray-400">{info.text}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* Newsletter */}
            <div 
                ref={el => { sectionRefs.current[3] = el; }}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold">Newsletter</h3>
                <p className="text-gray-400">
                Subscribe to get updates on new features and releases.
                </p>
                <form className="mt-4 space-y-3">
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                >
                    Subscribe
                </button>
                </form>
            </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>
                &copy; {new Date().getFullYear()} CompanionAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors duration-300">
                Cookies
                </Link>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;