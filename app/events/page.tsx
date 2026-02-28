"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { Calendar, MapPin, Users, Tag, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";

interface EventItem {
  _id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  content: string;
  contentBn?: string;
  featuredImage?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  eventDate?: string;
  eventLocation?: string;
  expectedAttendees?: number;
  externalLink?: string;
  isFeatured: boolean;
  createdAt: string;
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
  const upcomingEvents = items.filter(
    (e) => e.eventDate && new Date(e.eventDate) > now,
  );
  const pastEvents = items.filter(
    (e) => !e.eventDate || new Date(e.eventDate) <= now,
  );
  const featuredPastEvent = pastEvents.find((e) => e.isFeatured);
  const restPastEvents = pastEvents.filter(
    (e) => !e.isFeatured || e !== featuredPastEvent,
  );
  const featuredUpcomingEvent = upcomingEvents.find((e) => e.isFeatured);

  const getTitle = (item: EventItem) =>
    language === "bn" && item.titleBn ? item.titleBn : item.title;
  const getDescription = (item: EventItem) =>
    language === "bn" && item.descriptionBn ?
      item.descriptionBn
    : item.description;

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString("en-US", { month: "long" }),
      year: d.getFullYear(),
    };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "events") as string}
        subtitle={t(language, "upcomingEvents") as string}
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </div>
      : <>
          {/* ── Upcoming Events ───────────────────────────────────────── */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                {t(language, "upcomingEventsTitle")}
              </h2>

              {upcomingEvents.length === 0 ?
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 dark:text-gray-500">
                    No upcoming events at this time. Check back soon!
                  </p>
                </div>
              : <div className="space-y-8">
                  {upcomingEvents.map((event) => {
                    const dateInfo =
                      event.eventDate ? formatEventDate(event.eventDate) : null;
                    return (
                      <div
                        key={event._id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="md:flex">
                          <div className="bg-teal-600 dark:bg-teal-700 text-white p-8 md:w-48 flex flex-col items-center justify-center text-center shrink-0">
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
                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                              {getTitle(event)}
                            </h3>
                            <div className="space-y-2 mb-4">
                              {event.eventLocation && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                  <span>{event.eventLocation}</span>
                                </div>
                              )}
                              {event.expectedAttendees && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                  <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                  <span>
                                    {event.expectedAttendees}+ Expected
                                    Attendees
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
                            {event.externalLink ?
                              <a
                                href={event.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                              >
                                Register / Learn More{" "}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            : <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">
                                {t(language, "register")}
                              </button>
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          </section>

          {/* ── Featured Upcoming CTA ─────────────────────────────────── */}
          {featuredUpcomingEvent && (
            <section className="py-16 bg-linear-to-br from-teal-600 to-blue-600 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">
                    {getTitle(featuredUpcomingEvent)}
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    {getDescription(featuredUpcomingEvent)}
                  </p>
                  <div className="flex gap-4 justify-center">
                    {featuredUpcomingEvent.externalLink ?
                      <a
                        href={featuredUpcomingEvent.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        Register Now
                      </a>
                    : <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                        {t(language, "learnMore")}
                      </button>
                    }
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Past Events Archive ───────────────────────────────────── */}
          {pastEvents.length > 0 && (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Past Events Archive
                </h2>

                {/* Featured Past Event */}
                {featuredPastEvent && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border-l-4 border-blue-600">
                      <div className="md:flex">
                        {featuredPastEvent.eventDate && (
                          <div className="bg-blue-600 dark:bg-blue-700 text-white p-8 md:w-56 flex flex-col items-center justify-center text-center shrink-0">
                            <div className="text-2xl font-bold">
                              {
                                formatEventDate(featuredPastEvent.eventDate)
                                  .month
                              }
                            </div>
                            <div className="text-4xl font-bold">
                              {formatEventDate(featuredPastEvent.eventDate).day}
                            </div>
                            <div className="text-sm opacity-90">
                              {
                                formatEventDate(featuredPastEvent.eventDate)
                                  .year
                              }
                            </div>
                          </div>
                        )}
                        <div className="p-8 flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                            {getTitle(featuredPastEvent)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {getDescription(featuredPastEvent)}
                          </p>
                          {featuredPastEvent.tags &&
                            featuredPastEvent.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
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
                          {featuredPastEvent.externalLink && (
                            <a
                              href={featuredPastEvent.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            >
                              Read in News{" "}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rest of past events grid */}
                {restPastEvents.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restPastEvents.map((event) => (
                      <div
                        key={event._id}
                        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                      >
                        {event.featuredImage ?
                          <div className="relative h-48">
                            <Image
                              src={event.featuredImage}
                              alt={getTitle(event)}
                              fill
                              className="object-cover"
                            />
                          </div>
                        : <div className="h-48 bg-linear-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                            <Calendar className="w-16 h-16 text-white opacity-40" />
                          </div>
                        }
                        <div className="p-6">
                          {event.eventDate && (
                            <div className="text-sm text-teal-600 dark:text-teal-400 mb-2">
                              {formatEventDate(event.eventDate).month}{" "}
                              {formatEventDate(event.eventDate).year}
                            </div>
                          )}
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                            {getTitle(event)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                            {getDescription(event)}
                          </p>
                          {event.externalLink && (
                            <a
                              href={event.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-semibold hover:underline"
                            >
                              Read Report{" "}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Event Calendar placeholder ─────────────────────────── */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Event Calendar
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
                <Calendar className="w-24 h-24 text-teal-500 mx-auto mb-6" />
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive calendar view will be integrated here
                </p>
              </div>
            </div>
          </section>
        </>
      }

      <Footer />
    </div>
  );
}
