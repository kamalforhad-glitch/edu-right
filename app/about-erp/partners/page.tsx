"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Handshake } from "lucide-react";
import Image from "next/image";

export default function Partners() {
  const partners = {
    government: [
      "Directorate of Primary Education (DPE)",
      "Ministry of Education",
      "Bangladesh Bureau of Educational Information and Statistics (BANBEIS)",
    ],
    international: [
      "UNESCO Bangladesh",
      "UNICEF Bangladesh",
      "Save the Children",
      "ActionAid Bangladesh",
    ],
    academic: [
      "University of Dhaka - Institute of Education and Research",
      "BRAC University - Institute of Educational Development",
      "Independent University Bangladesh",
    ],
    civilSociety: [
      "Campaign for Popular Education (CAMPE)",
      "Bangladesh Youth Leadership Center (BYLC)",
      "Teach for Bangladesh",
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Partners & Networks"
        subtitle="Collaborating for education rights and reform"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Handshake className="w-16 h-16 mx-auto mb-6 text-teal-600 dark:text-teal-400" />
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              ERP works with a diverse network of partners including government
              agencies, international organizations, academic institutions, and
              civil society groups to advance education rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Government Partners */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Government Agencies
              </h3>
              <ul className="space-y-3">
                {partners.government.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* International Partners */}
            <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                International Organizations
              </h3>
              <ul className="space-y-3">
                {partners.international.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-teal-600 dark:text-teal-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Partners */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Academic Institutions
              </h3>
              <ul className="space-y-3">
                {partners.academic.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* Civil Society */}
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Civil Society Organizations
              </h3>
              <ul className="space-y-3">
                {partners.civilSociety.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partner Logos Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Featured Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-24">
                  <Image
                    src="/erp/webmier.jpg"
                    alt="Partner Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-36">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Partner Logo
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-36">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Partner Logo
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-36">
                <span className="text-gray-400 dark:text-gray-600 text-sm">
                  Partner Logo
                </span>
              </div>
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="mt-16 text-center bg-linear-to-r from-teal-600 to-blue-600 p-12 rounded-2xl text-white">
            <h3 className="text-3xl font-bold mb-4">Become a Partner</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in advancing education rights and reform in Bangladesh
            </p>
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Contact Us for Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
