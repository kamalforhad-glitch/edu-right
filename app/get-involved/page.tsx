"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import {
  Users,
  Heart,
  HandHeart,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Get Involved"
        subtitle="Join the movement for education rights and policy reform"
      />

      {/* Get Involved Options */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Volunteer / Internship */}
            <div className="bg-linear-to-br from-teal-500 to-blue-600 p-8 rounded-lg text-white shadow-xl">
              <HandHeart className="w-16 h-16 mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Volunteer / Internship
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Contribute your skills and gain valuable experience in education
                advocacy, policy research, and community engagement.
              </p>
              <ul className="space-y-2 mb-6 opacity-90">
                <li>• Research Assistant</li>
                <li>• Event Coordinator</li>
                <li>• Communications Volunteer</li>
                <li>• Policy Analyst Intern</li>
              </ul>
              <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Apply to Volunteer
              </button>
            </div>

            {/* Donate / Partner */}
            <div className="bg-linear-to-br from-purple-500 to-pink-600 p-8 rounded-lg text-white shadow-xl">
              <Heart className="w-16 h-16 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Donate / Partner</h2>
              <p className="text-lg mb-6 opacity-90">
                Support our mission to ensure quality education for all. Your
                contribution makes a direct impact.
              </p>
              <ul className="space-y-2 mb-6 opacity-90">
                <li>• Support policy research</li>
                <li>• Sponsor youth advocacy programs</li>
                <li>• Fund community education projects</li>
                <li>• Become an institutional partner</li>
              </ul>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Make a Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Network */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <GraduationCap className="w-16 h-16 text-teal-600 dark:text-teal-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Youth Network
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join our network of young leaders advocating for education rights
              through student clubs, debates, and mentorship programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Student Clubs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start or join an ERP club at your school or university to drive
                local education advocacy.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Start a Club →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Student Debates
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Participate in national debates on education policy and youth
                representation in decision-making.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Join Debates →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Mentorship Programs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect with experienced education professionals and policy
                experts for guidance and career development.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Find a Mentor →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Dialogue Form */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Share Your Voice
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Have insights on education policy? Propose resolutions or share your
            experiences with education access and quality in your community.
          </p>

          <form className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                  Topic Area
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Select a topic</option>
                  <option>Access & Equity</option>
                  <option>Quality & Learning</option>
                  <option>Budget & Financing</option>
                  <option>Teacher Development</option>
                  <option>Digital Learning</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                  Your Insights or Proposal
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="Share your thoughts, experiences, or policy recommendations..."
                ></textarea>
              </div>

              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">
                Submit Contribution
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-16 bg-teal-600 dark:bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Ways to Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">📢</div>
              <h3 className="font-bold mb-2">Spread the Word</h3>
              <p className="text-sm opacity-90">
                Follow and share our social media content
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-3">✍️</div>
              <h3 className="font-bold mb-2">Write for Us</h3>
              <p className="text-sm opacity-90">
                Contribute articles and research
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Corporate Partnerships</h3>
              <p className="text-sm opacity-90">CSR initiatives in education</p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-3">🎓</div>
              <h3 className="font-bold mb-2">Academic Collaboration</h3>
              <p className="text-sm opacity-90">
                Research partnerships welcome
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
