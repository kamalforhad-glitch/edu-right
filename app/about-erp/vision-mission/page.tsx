"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Target, Eye, Lightbulb, Shield, Users2 } from "lucide-react";

export default function VisionMission() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Vision, Mission & Values"
        subtitle="Our guiding principles and strategic direction"
      />

      {/* Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Eye className="w-16 h-16 text-teal-600 dark:text-teal-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Vision
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
              <p className="text-2xl text-gray-800 dark:text-gray-200 leading-relaxed">
                To facilitate the right to equitable, inclusive and quality
                education for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Target className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Mission
              </h2>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              To facilitate the right to equitable, inclusive and quality
              education for all.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Advocating for educational reforms to ensure quality education for all",
                "Creating knowledge products to raise awareness about barrier-free quality education",
                "Initiating grass-root activism to eliminate all forms of discrimination in education through youth participation and leadership",
                "Collaborating with the stakeholders to address the challenges and issues in the education sector",
                "Promoting cultural diversity and integrity (common set of cultural Values) through education",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Equity",
                description:
                  "Ensuring fair access to education for all, regardless of background or circumstances.",
                color: "teal",
              },
              {
                icon: Users2,
                title: "Inclusiveness",
                description:
                  "Embracing diversity and ensuring all voices are heard in the education reform process.",
                color: "blue",
              },
              {
                icon: Target,
                title: "Quality",
                description:
                  "Striving for excellence in educational standards and practices.",
                color: "purple",
              },
              {
                icon: Lightbulb,
                title: "Collaboration",
                description:
                  "Working together with various stakeholders to achieve common goals.",
                color: "green",
              },
              {
                icon: Eye,
                title: "Transparency",
                description:
                  "Maintaining openness and accountability in all our initiatives.",
                color: "orange",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <value.icon
                  className={`w-12 h-12 mb-4 text-${value.color}-600 dark:text-${value.color}-400`}
                />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Strategic Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Policy Research and Reform",
                description:
                  "Generate rigorous policy research to inform national and local education reforms, focusing on access, equity, and governance.",
              },
              {
                title: "Public Dialogue and Participation",
                description:
                  "Create platforms for multi-stakeholder dialogue — involving educators, students, policymakers, and communities — to strengthen participatory policy processes.",
              },
              {
                title: "Advocacy and Accountability",
                description:
                  "Promote education as a human right through campaigns, policy briefs, and civic monitoring mechanisms.",
              },
              {
                title: "Knowledge and Innovation Hub",
                description:
                  "Serve as a hub for innovative ideas, data, and practices that shape the future of education systems.",
              },
            ].map((goal, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 p-8 rounded-xl border-l-4 border-teal-600"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {goal.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
