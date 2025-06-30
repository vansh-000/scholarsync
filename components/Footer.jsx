import React from 'react'
import {
    GraduationCap,
    Github,
    Twitter,
    Linkedin,
    Mail,
    Settings
} from 'lucide-react';



export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Scholar Sync</h3>
                                <p className="text-gray-400 text-sm">Academic Platform</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering researchers worldwide with intelligent project recommendations and
                            academic collaboration opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    How it Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Success Stories
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Connect</h4>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="h-4 w-4" />
                                <span>contact@scholarsync.com</span>
                            </a>
                            <div className="flex space-x-4 pt-2">
                                <a
                                    href="#"
                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Twitter className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">© 2025 Scholar Sync. All rights reserved.</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">
                                Terms
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
