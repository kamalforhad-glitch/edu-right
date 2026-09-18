import { Facebook, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo and Join the Conversation */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image
                src="/ERP_logo.png"
                alt="Society for Educational Justice Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">
            Join the Conversation
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/profile.php?id=61566573296753"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-teal-500 rounded-full flex items-center justify-center transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/education-rights-parliament/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-teal-500 rounded-full flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@user-zy6nt8fv6e"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-teal-500 rounded-full flex items-center justify-center transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-800 pt-12">
          {/* Organization Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/ERP_logo.png"
                  alt="Society for Educational Justice Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">SOCIETY FOR EDUCATIONAL JUSTICE</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Reach us at educationrightsparliament@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/about-erp"
                  className="hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/research-policy"
                  className="hover:text-teal-400 transition-colors"
                >
                  Research & Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-bold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/get-involved"
                  className="hover:text-teal-400 transition-colors"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-teal-400 transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>Copyright © 2025 SOCIETY FOR EDUCATIONAL JUSTICE (SEJ)</p>
        </div>
      </div>
    </footer>
  );
}
