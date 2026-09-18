"use client";

import { Navbar } from "@/components/Navbar";
import { ParallaxSection } from "@/components/ParallaxSection";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";
import {
  Users,
  Handshake,
  TrendingUp,
  Megaphone,
  Network,
  Users as UsersIcon,
  Presentation,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold">
                  {t(language, "erp")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {t(language, "heroTitle")}
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t(language, "heroSubtitle")}
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
                {t(language, "heroDescription")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl">
                  {t(language, "exploreResearch")}
                </button>
                <button className="border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  {t(language, "joinERP")}
                </button>
              </div>
            </div>

            {/* Right Visual - temporary education image */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/new/04.jpg"
                    alt="Youth participants engaged in educational justice and learning"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-64 h-64 border-4 border-teal-200 dark:border-teal-800 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z"
              fill="currentColor"
              className="text-gray-50 dark:text-gray-800"
            />
          </svg>
        </div>
      </section>

      {/* Parallax Scrolling Section */}
      <ParallaxSection
        imageSrc="/new/02.jpg"
        height="70vh"
        overlayOpacity={0.4}
      />

      {/* What is ERP Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {t(language, "aboutTitle")}
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-12"></div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-start gap-4 mb-8">
              <div className="text-teal-500 text-5xl font-bold">E</div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-2">
                {t(language, "aboutDescription")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t(language, "people")}
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <Handshake className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t(language, "policy")}
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t(language, "progress")}
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors inline-flex items-center gap-2">
              MORE ABOUT ERP
            </button>
          </div>
        </div>
      </section>

      {/* The ERP Stories Section */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 uppercase tracking-wide text-white">
            {t(language, "impactStories")}
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Real stories of change, impact, and transformation in education
            through our initiatives
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-03 (2).jpg"
                alt="Community Engagement"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Community Engagement
                  </h3>
                  <p className="text-sm text-gray-300">
                    Bringing education to grassroots communities
                  </p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-03 (3).jpg"
                alt="Youth Leadership"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Youth Leadership</h3>
                  <p className="text-sm text-gray-300">
                    Empowering the next generation of education advocates
                  </p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-01 (2).jpg"
                alt="Policy Dialogue"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Policy Dialogue</h3>
                  <p className="text-sm text-gray-300">
                    Shaping education policy through constructive dialogue
                  </p>
                </div>
              </div>
            </div>

            {/* Story 4 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-02 (2).jpg"
                alt="Teacher Training"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Teacher Training</h3>
                  <p className="text-sm text-gray-300">
                    Building capacity for quality education delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Story 5 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-03 (4).jpg"
                alt="Student Voices"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Student Voices</h3>
                  <p className="text-sm text-gray-300">
                    Amplifying student perspectives in education reform
                  </p>
                </div>
              </div>
            </div>

            {/* Story 6 */}
            <div className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80">
              <Image
                src="/erp/photo_2025-10-23_21-12-04 (2).jpg"
                alt="Research & Innovation"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Research & Innovation
                  </h3>
                  <p className="text-sm text-gray-300">
                    Evidence-based approaches to education challenges
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Stories
            </button>
          </div>
        </div>
      </section>

      {/* Key Initiatives Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {t(language, "keyInitiativesTitle")}
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            {t(language, "keyInitiativesDescription")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Megaphone className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "policyAdvocacy")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(language, "policyAdvocacyDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Network className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "policyNetworksTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(language, "policyNetworksDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Presentation className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "annualConferenceTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The ERP Future of State Conference brings together
                  professionals and students.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <UsersIcon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  ERP Fellowship
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Bringing talented minds together on a common platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Happening Section */}
      <section className="py-20 bg-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wide">
            What&apos;s Happening at ERP?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Latest News</h3>
              <p className="text-white/90">
                Stay updated with our recent activities
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
              <p className="text-white/90">Join us in our conferences</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Get Involved</h3>
              <p className="text-white/90">Become a part of our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* ERP in the Media Section - Redesigned */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header with Icon */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-600 dark:text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3 uppercase tracking-wider">
              Media Coverage
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              ERP in the Media
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our work is making headlines. See how leading news outlets are
              covering our advocacy for education reform.
            </p>
          </div>

          {/* Stats Banner */}

          {/* Featured Story - Large Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-teal-600 rounded-full"></span>
              Featured Coverage
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left - Content */}
                <div className="p-10 bg-white dark:bg-gray-800">
                  <div className="inline-block mb-6">
                    <span className="bg-teal-100 dark:bg-teal-900/30 px-4 py-2 text-sm font-bold rounded-full text-teal-700 dark:text-teal-300">
                      Featured Article
                    </span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                    Inclusion of July Uprising in Textbook Demanded
                  </h4>
                  <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
                    EDUCATION RIGHTS PARLIAMENT organized a landmark roundtable
                    discussion with student leaders, educationists, and families
                    of July Uprising victims at the National Academy for
                    Educational Management. The event called for crucial
                    curriculum reforms and the inclusion of July Uprising
                    heroism in textbooks.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="bg-teal-100 dark:bg-teal-900/30 px-3 py-1 rounded-full text-sm text-teal-700 dark:text-teal-300">
                      Education Reform
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm text-blue-700 dark:text-blue-300">
                      Policy Advocacy
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-sm text-purple-700 dark:text-purple-300">
                      National Impact
                    </span>
                  </div>
                  <a
                    href="https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Read Full Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>

                {/* Right - Image */}
                <div className="relative h-full min-h-[400px] lg:min-h-0">
                  <Image
                    src="/erp/photo_2025-10-23_21-12-03 (2).jpg"
                    alt="Roundtable Discussion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Articles Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
              Recent Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  outlet: "New Age",
                  title: "Inclusion of July Uprising in Textbook Demanded",
                  url: "https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded",
                  color: "from-blue-500 to-blue-600",
                  textColor: "text-blue-600 dark:text-blue-400",
                },
                {
                  outlet: "Daily Campus",
                  title:
                    "পাঠ্যপুস্তকে জুলাই গণঅভ্যুত্থানের বীরত্বগাঁথার অন্তর্ভুক্তি নিয়ে শিক্ষা অধিকার সংসদের গোলটেবিল আলোচনা",
                  url: "https://share.google/troTP5bAyOJQzUj0L",
                  color: "from-purple-500 to-purple-600",
                  textColor: "text-purple-600 dark:text-purple-400",
                },
                {
                  outlet: "Dhaka Post",
                  title:
                    "পাঠ্যবই থেকে শেখ মুজিব ও শেখ হাসিনার বিষয়বস্তু অপসারণের দাবি",
                  url: "https://www.dhakapost.com/education/322995",
                  color: "from-teal-500 to-teal-600",
                  textColor: "text-teal-600 dark:text-teal-400",
                },
              ].map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
                >
                  <div className={`h-2 bg-linear-to-r ${article.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-2 h-2 rounded-full bg-linear-to-r ${article.color}`}
                      ></div>
                      <span
                        className={`font-bold ${article.textColor} text-sm uppercase tracking-wide`}
                      >
                        {article.outlet}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 line-clamp-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      <span>Read Article</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Media Partners Logos */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Featured In
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "New Age", color: "bg-blue-500" },
                { name: "Dhaka Post", color: "bg-red-500" },
                { name: "Daily Campus", color: "bg-purple-500" },
                { name: "Janakantha", color: "bg-orange-500" },
                { name: "RTV Online", color: "bg-teal-500" },
              ].map((outlet, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group cursor-pointer border-2 border-gray-100 dark:border-gray-700 hover:border-teal-500"
                >
                  <div
                    className={`w-8 h-1 ${outlet.color} mx-auto mb-3 rounded-full group-hover:w-full transition-all`}
                  ></div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {outlet.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="/news-publications"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-xl"
            >
              View All Media Coverage
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Our Impact & Moments Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-wide">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Moments That Matter
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Through dialogue, advocacy, and collaboration, we&apos;re building
              a stronger education system for Bangladesh. Here are the stories
              behind our work.
            </p>
          </div>

          {/* Featured Highlight Banner */}
          <div className="mb-12 relative group overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="/erp/EducatorLeaderShipSummit2025Cover.jpg"
                alt="ERP Leadership Summit"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-3xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Educator Leadership Summit
                  </h3>
                  <p className="text-xl text-gray-800 mb-6">
                    Bringing together education leaders, policymakers, and
                    advocates to shape the future of learning in Bangladesh
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-teal-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Leadership Development
                    </span>
                    <span className="bg-blue-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Policy Dialogue
                    </span>
                    <span className="bg-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Community Engagement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats */}

          {/* Photo Gallery with Captions */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Capturing Our Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  img: "photo_2025-10-23_21-12-01 (2).jpg",
                  caption: "Community Workshops",
                  folder: "erp",
                },
                {
                  img: "photo_2025-10-23_21-12-02 (2).jpg",
                  caption: "Expert Panels",
                  folder: "erp",
                },
                {
                  img: "01.jpg",
                  caption: "Panel Discussions",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-03 (4).jpg",
                  caption: "Stakeholder Meetings",
                  folder: "erp",
                },
                {
                  img: "03.jpg",
                  caption: "Education Forums",
                  folder: "new",
                },
                {
                  img: "04.jpg",
                  caption: "Policy Dialogues",
                  folder: "new",
                },
                {
                  img: "05.jpg",
                  caption: "Youth Engagement",
                  folder: "new",
                },
                {
                  img: "06.jpg",
                  caption: "Community Outreach",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-03.jpg",
                  caption: "Policy Forums",
                  folder: "erp",
                },
                {
                  img: "07.jpg",
                  caption: "Advocacy Campaigns",
                  folder: "new",
                },
                {
                  img: "08.jpg",
                  caption: "Collaborative Dialogues",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-05 (2).jpg",
                  caption: "Research Presentations",
                  folder: "erp",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <Image
                    src={`/${item.folder}/${item.img}`}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-xl inline-flex items-center gap-2">
              View All Events & Activities
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
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
            <div>
              <h3 className="font-bold text-lg mb-4">
                EDUCATION RIGHTS PARLIAMENT
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Reach us at educationrightsparliament@gmail.com
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Policy Networks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Important Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Join Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>Copyright © 2025 EDUCATION RIGHTS PARLIAMENT (ERP)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
