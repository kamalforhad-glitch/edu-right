"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Building2, Users, Shield, Network } from "lucide-react";

export default function Governance() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Governance Structure"
        subtitle="How ERP is organized to serve education rights"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              ERP maintains a transparent and participatory governance structure
              that ensures diverse representation and accountability in
              education advocacy.
            </p>
          </div>

          {/* Organizational Flow */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Organizational Structure
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: "Parliament Council",
                  description:
                    "Core deliberative body composed of education experts, civil society leaders, youth representatives, and policymakers.",
                },
                {
                  icon: Building2,
                  title: "Secretariat",
                  description:
                    "Coordinates research, advocacy, and communication activities. Manages day-to-day operations and strategic implementation.",
                },
                {
                  icon: Shield,
                  title: "Advisory Board",
                  description:
                    "Comprising national and international scholars and education policy specialists who provide strategic guidance.",
                },
                {
                  icon: Network,
                  title: "Thematic Committees",
                  description:
                    "Focused working groups on rights, policy, innovation, and inclusion. Drive specialized initiatives.",
                },
              ].map((level, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-teal-600">
                    <div className="flex items-start gap-4">
                      <level.icon className="w-12 h-12 text-teal-600 dark:text-teal-400 shrink-0" />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {level.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className="w-0.5 h-6 bg-teal-300 dark:bg-teal-700 mx-auto"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Functions */}
          <div className="bg-gray-50 dark:bg-gray-800 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Core Functions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Policy Research",
                  items: [
                    "Conduct studies and surveys",
                    "Policy evaluations",
                    "Evidence-based reports",
                  ],
                },
                {
                  title: "Public Hearings and Forums",
                  items: [
                    "Annual Education Right Assembly",
                    "Stakeholder dialogue sessions",
                    "Community consultations",
                  ],
                },
                {
                  title: "Advocacy Campaigns",
                  items: [
                    "Right to Education Act promotion",
                    "Budget accountability",
                    "Quality education initiatives",
                  ],
                },
                {
                  title: "Knowledge Dissemination",
                  items: [
                    "Policy briefs and journals",
                    "Data dashboards",
                    "Educational resources",
                  ],
                },
              ].map((func, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {func.title}
                  </h3>
                  <ul className="space-y-2">
                    {func.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-teal-600 dark:text-teal-400">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
