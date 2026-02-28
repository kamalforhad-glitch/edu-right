"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Target, CheckCircle2, Lightbulb } from "lucide-react";

export default function Objectives() {
  const mainObjectives = [
    {
      id: "a",
      title: "Intellectual and Advocacy Platform",
      description:
        "To act as an intellectual and advocacy platform for education sector reform in Bangladesh, in alignment with Islamic traditions and values, while maintaining a neutral and inclusive public approach.",
    },
    {
      id: "b",
      title: "Right to Education",
      description:
        "To promote the right to education and equitable access to quality learning for all citizens of Bangladesh.",
    },
    {
      id: "c",
      title: "Research and Advocacy",
      description:
        "To initiate, support, and coordinate educational research, policy dialogue, and reform advocacy based on evidence and social justice principles.",
    },
  ];

  const ancillaryObjectives = [
    {
      id: "d",
      title: "Public Events and Forums",
      description:
        "To organize public events, seminars, conferences, symposiums, and roundtables on education policy, curriculum development, and related issues.",
    },
    {
      id: "e",
      title: "Knowledge Development",
      description:
        "To develop training modules, publish reports and research papers, and facilitate knowledge-sharing initiatives in collaboration with stakeholders.",
    },
    {
      id: "f",
      title: "Advisory Committees",
      description:
        "To establish advisory committees comprising academics, educators, policymakers, and civil society members to guide specific thematic areas.",
    },
    {
      id: "g",
      title: "Global Engagement",
      description:
        "To engage with local and international education platforms and networks to foster dialogue and capacity building.",
    },
    {
      id: "h",
      title: "Resource Mobilization",
      description:
        "To mobilize voluntary contributions, grants, and other lawful resources for fulfilling the ERP's objectives.",
    },
    {
      id: "i",
      title: "Specialized Programs",
      description:
        "To initiate and manage programs related to student mentorship, early childhood education, madrasah reform, climate education, and technological integration in education.",
    },
    {
      id: "j",
      title: "Compliance and Accountability",
      description:
        "To maintain transparency, accountability, and compliance with applicable legal, regulatory, and ethical standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Our Objectives"
        subtitle="Strategic goals and operational priorities guiding our work"
      />

      {/* Main Objectives */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Main Objectives
              </h2>
            </div>

            <div className="space-y-8">
              {mainObjectives.map((objective) => (
                <div
                  key={objective.id}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold shrink-0">
                      {objective.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {objective.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ancillary Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <CheckCircle2 className="w-12 h-12 text-teal-600 dark:text-teal-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Ancillary Objectives
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ancillaryObjectives.map((objective) => (
                <div
                  key={objective.id}
                  className="bg-linear-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-8 rounded-xl border-l-4 border-teal-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white font-bold shrink-0 text-sm">
                      {objective.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Purpose</h2>
          <p className="text-xl leading-relaxed">
            Through these comprehensive objectives, ERP commits to being a
            catalyst for meaningful, evidence-based, and inclusive education
            reform in Bangladesh. We work collaboratively with all stakeholders
            to ensure that quality education becomes a reality for every
            citizen, aligned with both national values and global aspirations.
          </p>
        </div>
      </section>
    </div>
  );
}
