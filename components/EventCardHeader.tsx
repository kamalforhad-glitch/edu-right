import Image from "next/image";
import { Calendar } from "lucide-react";

export interface EventDateInfo {
  day: number;
  month: string;
  year: number;
}

interface EventCardHeaderProps {
  image?: string;
  title: string;
  category?: string;
  /** e.g. "Upcoming", "Past Event", "Completed" */
  statusLabel?: string;
  /** teal (upcoming) | slate (past) | gold (completed) */
  statusTone?: "upcoming" | "past" | "completed";
  dateInfo?: EventDateInfo | null;
  /** banner (wide cards) or card (archive grid) */
  variant?: "banner" | "card";
  /** hide the date pill when the date is shown elsewhere (e.g. date sidebar) */
  showDatePill?: boolean;
  /** hide the fallback date medallion when the card already shows the date */
  showFallbackMeta?: boolean;
}

const statusStyles: Record<string, string> = {
  upcoming: "bg-teal-600 text-white",
  past: "bg-slate-800/90 text-white",
  completed: "bg-[#b98a1f] text-white",
};

/**
 * Visual top section for event cards.
 * Shows the CMS featured image when available; otherwise renders an
 * intentional SEJ-branded fallback (navy/teal gradient, gold accents,
 * date medallion, category badge) — never a blank placeholder.
 */
export function EventCardHeader({
  image,
  title,
  category,
  statusLabel,
  statusTone = "upcoming",
  dateInfo,
  variant = "card",
  showDatePill = true,
  showFallbackMeta = true,
}: EventCardHeaderProps) {
  const heightClass = variant === "banner" ? "h-56 md:h-72" : "h-52";
  const statusClass = statusStyles[statusTone] ?? statusStyles.upcoming;

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {image ? (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0a2a4a]/70 via-[#0a2a4a]/10 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#071e36] via-[#0a2a4a] to-[#0e7c6b]"
          aria-hidden="true"
        >
          {/* subtle dot texture */}
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          {/* soft gold glow */}
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#b98a1f]/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -left-10 -bottom-20 w-56 h-56 rounded-full bg-teal-400/20 blur-3xl"
            aria-hidden="true"
          />
          {/* watermark calendar */}
          <Calendar
            className="absolute -right-4 -bottom-6 w-40 h-40 text-white/[0.08]"
            aria-hidden="true"
          />
          {/* branded content */}
          {showFallbackMeta ? (
            <div className="absolute inset-0 flex items-center gap-4 p-5">
              <div className="flex flex-col items-center justify-center w-20 shrink-0 rounded-2xl bg-white/10 backdrop-blur border border-white/20 py-3">
                {dateInfo ? (
                  <>
                    <span className="text-3xl font-bold text-white leading-none">
                      {dateInfo.day}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f4ead0] mt-1">
                      {dateInfo.month.slice(0, 3)}
                    </span>
                    <span className="text-[11px] text-white/70">
                      {dateInfo.year}
                    </span>
                  </>
                ) : (
                  <Calendar className="w-9 h-9 text-[#f4ead0]" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-200">
                  SEJ Events
                </div>
                {category ? (
                  <div className="mt-1 inline-block max-w-full truncate rounded-full bg-[#b98a1f]/90 px-3 py-1 text-xs font-semibold text-white">
                    {category}
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-white/80">
                    Dialogue • Summit • Workshop
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-200">
                SEJ Events
              </span>
              {category && (
                <span className="max-w-[220px] truncate rounded-full bg-[#b98a1f]/90 px-3 py-0.5 text-xs font-semibold text-white">
                  {category}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* top badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {image && category && (
            <span className="rounded-full bg-[#0a2a4a]/85 backdrop-blur px-3 py-1 text-xs font-semibold text-[#f4ead0] border border-[#b98a1f]/50">
              {category}
            </span>
          )}
        </div>
        {statusLabel && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold shadow ${statusClass}`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {/* date pill over photos */}
      {image && showDatePill && dateInfo && (
        <span className="absolute bottom-3 left-3 rounded-xl bg-white/95 dark:bg-gray-900/90 backdrop-blur px-3.5 py-1.5 text-sm font-bold text-[#0a2a4a] dark:text-white shadow-lg">
          {dateInfo.day} {dateInfo.month} {dateInfo.year}
        </span>
      )}

      {/* gold keyline */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]"
        aria-hidden="true"
      />
    </div>
  );
}
