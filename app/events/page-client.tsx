"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import {
  EventCardHeader,
  type EventDateInfo,
} from "@/components/EventCardHeader";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  MapPin,
  Users,
  Tag,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface EventItem {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  content: string;
  contentBn?: string;
  featuredImage?: string;
  featured_image?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  eventDate?: string;
  event_date?: string;
  eventLocation?: string;
  event_location?: string;
  expectedAttendees?: number;
  expected_attendees?: number;
  externalLink?: string;
  external_link?: string;
  status?: string;
  isFeatured: boolean;
  is_featured?: boolean;
  createdAt: string;
  created_at?: string;
}

// ─── Normalizers (API serves snake_case + camelCase aliases) ──────────────
function pickStr(...vals: (string | undefined | null)[]): string | undefined {
  for (const v of vals) {
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  return undefined;
}

const getImage = (e: EventItem) => pickStr(e.featuredImage, e.featured_image);
const getCategory = (e: EventItem) => pickStr(e.category);
const getDateRaw = (e: EventItem) => pickStr(e.eventDate, e.event_date);
const getLocation = (e: EventItem) =>
  pickStr(e.eventLocation, e.event_location);
const getLink = (e: EventItem) => pickStr(e.externalLink, e.external_link);
const getAttendees = (e: EventItem) =>
  typeof e.expectedAttendees === "number" ?
    e.expectedAttendees
  : typeof e.expected_attendees === "number" ? e.expected_attendees
  : undefined;
const isFeatured = (e: EventItem) => e.isFeatured || e.is_featured === true;

function formatEventDate(dateStr: string): EventDateInfo {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-US", { month: "long" }),
    year: d.getFullYear(),
  };
}

type StatusTone = "upcoming" | "past" | "completed";

function getStatus(
  event: EventItem,
  upcoming: boolean,
): { label: string; tone: StatusTone } {
  const s = event.status?.toLowerCase();
  if (s === "completed") return { label: "Completed", tone: "completed" };
  if (s === "ongoing") return { label: "Happening Now", tone: "upcoming" };
  if (s === "upcoming") return { label: "Upcoming", tone: "upcoming" };
  return upcoming ?
      { label: "Upcoming", tone: "upcoming" }
    : { label: "Past Event", tone: "past" };
}

export default function EventsPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          "/api/content?type=event&published=true&limit=50",
        );
        const data = await res.json();
        setItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const now = new Date();
  const upcomingEvents = items.filter((e) => {
    const raw = getDateRaw(e);
    return raw ? new Date(raw) > now : e.status?.toLowerCase() === "upcoming";
  });
  const pastEvents = items.filter((e) => !upcomingEvents.includes(e));
  const featuredPastEvent = pastEvents.find((e) => isFeatured(e));
  const restPastEvents = pastEvents.filter((e) => e !== featuredPastEvent);
  const featuredUpcomingEvent = upcomingEvents.find((e) => isFeatured(e));

  const getTitle = (item: EventItem) =>
    language === "bn" && item.titleBn ? item.titleBn : item.title;
  const getDescription = (item: EventItem) =>
    language === "bn" && item.descriptionBn ?
      item.descriptionBn
    : item.description;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "events") as string}
        subtitle={t(language, "upcomingEvents") as string}
        eyebrow={language === "bn" ? "ক্যালেন্ডার" : "Calendar"}
        breadcrumbs={[{ label: "Media & Events" }, { label: t(language, "events") as string }]}
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </div>
      : <>
          {/* ── Upcoming Events ───────────────────────────────────────── */}
          <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                eyebrow={language === "bn" ? "আসন্ন" : "Upcoming"}
                title={t(language, "upcomingEventsTitle") as string}
              />

              {upcomingEvents.length === 0 ?
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 dark:text-gray-500">
                    {t(language, "evNoUpcoming") as string}
                  </p>
                </div>
              : <div className="space-y-8">
                  {upcomingEvents.map((event) => {
                    const rawDate = getDateRaw(event);
                    const dateInfo = rawDate ? formatEventDate(rawDate) : null;
                    const status = getStatus(event, true);
                    const link = getLink(event);
                    const location = getLocation(event);
                    const attendees = getAttendees(event);
                    return (
                      <article
                        key={event.id}
                        className="institution-card group overflow-hidden"
                      >
                        <EventCardHeader
                          image={getImage(event)}
                          title={getTitle(event)}
                          category={getCategory(event)}
                          statusLabel={status.label}
                          statusTone={status.tone}
                          dateInfo={dateInfo}
                          variant="banner"
                          showDatePill={false}
                          showFallbackMeta={false}
                        />
                        <div className="md:flex">
                          <div className="bg-[#0a2a4a] dark:bg-[#0e7c6b]/20 text-white p-8 md:w-48 flex flex-col items-center justify-center text-center shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-[#b98a1f]/60">
                            {dateInfo ?
                              <>
                                <div className="text-4xl font-bold">
                                  {dateInfo.day}
                                </div>
                                <div className="text-xl">{dateInfo.month}</div>
                                <div className="text-sm opacity-90">
                                  {dateInfo.year}
                                </div>
                              </>
                            : <Calendar className="w-10 h-10 opacity-70" />}
                          </div>
                          <div className="p-8 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                                <CalendarDays className="w-3.5 h-3.5" />
                                {status.label}
                              </span>
                              {getCategory(event) && (
                                <span className="rounded-full bg-[#f4ead0] dark:bg-[#b98a1f]/20 px-3 py-1 text-xs font-semibold text-[#7a5c14] dark:text-[#f4ead0]">
                                  {getCategory(event)}
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                              {getTitle(event)}
                            </h3>
                            <div className="space-y-2 mb-4">
                              {location && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                                  <span>{location}</span>
                                </div>
                              )}
                              {attendees !== undefined && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                  <Users className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                                  <span>
                                    {attendees}+ {t(language, "evExpected") as string}
                                  </span>
                                </div>
                              )}
                            </div>
                            {event.tags && event.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {event.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2 py-0.5 rounded-full"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              {getDescription(event)}
                            </p>
                            {link ?
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                              >
                                {t(language, "evRegisterLearn") as string}{" "}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            : <Link
                                href="/get-involved"
                                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                              >
                                {t(language, "evRegister") as string}{" "}
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            }
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              }
            </div>
          </section>

          {/* ── Featured Upcoming CTA ─────────────────────────────────── */}
          {featuredUpcomingEvent && (
            <section className="section-navy py-20 md:py-24 text-white relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">
                    {getTitle(featuredUpcomingEvent)}
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    {getDescription(featuredUpcomingEvent)}
                  </p>
                  <div className="flex gap-4 justify-center">
                    {getLink(featuredUpcomingEvent) ?
                      <a
                        href={getLink(featuredUpcomingEvent)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        {t(language, "evRegisterNow") as string}
                      </a>
                    : <Link
                        href="/get-involved"
                        className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        {t(language, "learnMore")}
                      </Link>
                    }
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Past Events Archive ───────────────────────────────────── */}
          {pastEvents.length > 0 && (
            <section className="section-soft py-20 md:py-24">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow={language === "bn" ? "আর্কাইভ" : "Archive"}
                  title={t(language, "evPastArchive") as string}
                  description={
                    language === "bn" ?
                      "অতীত সংলাপ, সামিট ও কর্মশালার গ্যালারি — প্রতিটি আয়োজনের প্রতিবেদন দেখুন।"
                    : "A gallery of past dialogues, summits and workshops — browse reports from each gathering."
                  }
                />

                {/* Featured Past Event */}
                {featuredPastEvent && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <article className="institution-card group overflow-hidden">
                      <EventCardHeader
                        image={getImage(featuredPastEvent)}
                        title={getTitle(featuredPastEvent)}
                        category={getCategory(featuredPastEvent)}
                        statusLabel={
                          getStatus(featuredPastEvent, false).label
                        }
                        statusTone={getStatus(featuredPastEvent, false).tone}
                        dateInfo={
                          getDateRaw(featuredPastEvent) ?
                            formatEventDate(getDateRaw(featuredPastEvent)!)
                          : null
                        }
                        variant="banner"
                      />
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                          {getTitle(featuredPastEvent)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {getDescription(featuredPastEvent)}
                        </p>
                        {featuredPastEvent.tags &&
                          featuredPastEvent.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                              {featuredPastEvent.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        {getLink(featuredPastEvent) ?
                          <a
                            href={getLink(featuredPastEvent)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-bold hover:underline"
                          >
                            {t(language, "evReadNews") as string}{" "}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        : <Link
                            href="/news-publications"
                            className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-bold hover:underline"
                          >
                            {t(language, "learnMore")}{" "}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        }
                      </div>
                    </article>
                  </div>
                )}

                {/* Rest of past events grid */}
                {restPastEvents.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {restPastEvents.map((event) => {
                      const rawDate = getDateRaw(event);
                      const dateInfo =
                        rawDate ? formatEventDate(rawDate) : null;
                      const status = getStatus(event, false);
                      const link = getLink(event);
                      const location = getLocation(event);
                      return (
                        <article
                          key={event.id}
                          className="institution-card group overflow-hidden flex flex-col h-full"
                        >
                          <EventCardHeader
                            image={getImage(event)}
                            title={getTitle(event)}
                            category={getCategory(event)}
                            statusLabel={status.label}
                            statusTone={status.tone}
                            dateInfo={dateInfo}
                            variant="card"
                          />
                          <div className="p-6 flex flex-col flex-1">
                            {(dateInfo || location) && (
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-gray-500 dark:text-gray-400 mb-3">
                                {dateInfo && (
                                  <span className="inline-flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-300">
                                    <CalendarDays className="w-4 h-4" />
                                    {dateInfo.month} {dateInfo.day},{" "}
                                    {dateInfo.year}
                                  </span>
                                )}
                                {location && (
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="truncate max-w-[180px]">
                                      {location}
                                    </span>
                                  </span>
                                )}
                              </div>
                            )}
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                              {getTitle(event)}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-[15px] leading-relaxed line-clamp-3 flex-1">
                              {getDescription(event)}
                            </p>
                            {event.tags && event.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {event.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2 py-0.5 rounded-full"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                              {link ?
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-300 text-sm font-bold hover:underline"
                                >
                                  {t(language, "evReadReport") as string}{" "}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              : <Link
                                  href="/news-publications"
                                  className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-300 text-sm font-bold hover:underline"
                                >
                                  {t(language, "learnMore")}{" "}
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              }
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Event Calendar placeholder ─────────────────────────── */}
          <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                eyebrow={language === "bn" ? "ক্যালেন্ডার" : "Calendar"}
                title="Event Calendar"
                description={language === "bn" ? "শীঘ্রই ইন্টার‌্যাক্টিভ ক্যালেন্ডার আসছে — উপরের আসন্ন ইভেন্টগুলো দেখুন।" : "A full interactive calendar is on its way — browse upcoming events above."}
              />
              <div className="section-soft rounded-2xl p-12 text-center border border-slate-200 dark:border-white/10">
                <Calendar className="w-16 h-16 text-[#0e7c6b] dark:text-teal-400 mx-auto mb-5" aria-hidden="true" />
                <p className="font-display text-xl text-[#0a2a4a] dark:text-white font-semibold" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {t(language, "evCalendarSoon") as string}
                </p>
              </div>
            </div>
          </section>
        </>
      }

      <CTASection
        titleEn="Never miss an SEJ event"
        titleBn="SEJ-এর কোনো ইভেন্ট মিস করবেন না"
        descEn="Register for dialogues, summits and workshops — or invite us to your campus."
        descBn="সংলাপ, সামিট ও কর্মশালায় নিবন্ধন করুন — অথবা আপনার ক্যাম্পাসে আমাদের আমন্ত্রণ জানান।"
        primaryHref="/get-involved"
        primaryEn="Register Interest"
        primaryBn="আগ্রহ নিবন্ধন করুন"
        secondaryHref="/contact"
        secondaryEn="Invite SEJ"
        secondaryBn="SEJ-কে আমন্ত্রণ জানান"
      />

      <Footer />
    </div>
  );
}
