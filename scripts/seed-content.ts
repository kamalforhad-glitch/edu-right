/**
 * Seed script: creates all content items in the DB via the API.
 * Run with:  npx tsx scripts/seed-content.ts
 *
 * Make sure the dev server is already running on http://localhost:3001
 */

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

// ── helpers ─────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.DEFAULT_ADMIN_EMAIL || "admin@sejbd.org",
      password: process.env.DEFAULT_ADMIN_PASSWORD as string,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Login failed: ${err}`);
  }
  const data = await res.json();
  if (!data.token) throw new Error("No token returned");
  return data.token;
}

async function createContent(
  token: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ✗ Failed to create "${payload.title}": ${err}`);
  } else {
    console.log(`  ✓ Created [${payload.type}] "${payload.title}"`);
  }
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// ── content ─────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔐 Logging in…");
  const token = await login();
  console.log("✅ Logged in!\n");

  // ── EVENTS ──────────────────────────────────────────────────────────────
  console.log("📅 Seeding events…");

  const events = [
    {
      title: "Roundtable on July Uprising & Textbook Curriculum Reform",
      description:
        "ERP organized a landmark roundtable discussion with student leaders, educationists, and families of July Uprising victims to advocate for the inclusion of July Uprising heroism in textbooks and removal of politically motivated educational content. The event was covered by 9+ major news outlets.",
      content:
        "The roundtable brought together over 50 participants including student leaders, prominent educationists, families of July Uprising victims, and policy advocates. Key demands included inclusion of July Uprising content across all educational levels, removal of politically motivated content from past 15 years, featuring martyrs like Abu Saeed, establishing expert committees for curriculum review, and creating a modern education policy framework.",
      event_date: "2025-11-16",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 50,
      tags: ["Policy Dialogue", "Curriculum Reform", "Media Coverage"],
      category: "Past Event",
      featured_image:
        "https://outspoken.newagebd.com/files/img/202511/c7de259addec9129a81301647f56448a.jpg",
      images: [
        "/erp/photo_2025-10-23_21-12-02 (2).jpg",
        "/erp/photo_2025-10-23_21-12-03 (4).jpg",
        "/erp/photo_2025-10-23_21-12-04 (2).jpg",
        "/erp/photo_2025-10-23_21-12-05 (2).jpg",
      ],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Community Dialogue on Education Reform",
      description:
        "Community stakeholders, parents, teachers, and local leaders gathered to discuss pressing education reform needs.",
      content:
        "A wide-ranging community dialogue exploring grassroots perspectives on quality, equity, and access in education.",
      event_date: "2025-12-10",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 120,
      tags: ["Community", "Education Reform"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-05.jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Youth Leadership Summit",
      description:
        "Young education advocates came together to develop leadership skills and plan grassroots action for education rights.",
      content:
        "The summit equipped youth leaders with tools for advocacy, community organising, and policy engagement. Participants developed action plans for their local communities.",
      event_date: "2025-11-20",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 200,
      tags: ["Youth", "Leadership", "Advocacy"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-04.jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Policy Advocacy Workshop",
      description:
        "An intensive workshop training civil society organisations on effective policy advocacy strategies.",
      content:
        "Participants learned how to engage with policymakers, draft policy briefs, and build coalitions for education reform. Case studies from successful advocacy campaigns were presented.",
      event_date: "2025-10-18",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 80,
      tags: ["Policy", "Workshop", "Civil Society"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-04 (2).jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "National Education Forum",
      description:
        "A national gathering of education sector leaders to set priorities and shape policy direction for the coming year.",
      content:
        "The forum convened representatives from government, civil society, academia, and the private sector. Key themes included digital learning, teacher professional development, and equitable financing.",
      event_date: "2025-09-12",
      event_location: "Dhaka International Convention City",
      expected_attendees: 350,
      tags: ["National", "Forum", "Policy"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-03.jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Research Presentation Series",
      description:
        "Researchers presented the latest findings on education equity, quality, and financing in Bangladesh.",
      content:
        "Six research teams presented peer-reviewed findings covering gender parity, budget allocation efficiency, learning outcomes in rural areas, and digital education readiness.",
      event_date: "2025-08-22",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 90,
      tags: ["Research", "Presentation", "Evidence"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-02 (3).jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Stakeholder Consultation Meeting",
      description:
        "ERP convened key stakeholders for a structured consultation on upcoming education policy revisions.",
      content:
        "The consultation gathered feedback from teachers, school administrators, parents, and student representatives. Recommendations were compiled into a formal submission to the Ministry of Education.",
      event_date: "2025-07-08",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 60,
      tags: ["Consultation", "Stakeholders", "Policy"],
      category: "Past Event",
      featured_image: "/erp/photo_2025-10-23_21-12-01 (2).jpg",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Right Assembly 2026",
      description:
        "Our flagship annual event convening education leaders, policymakers, researchers, and advocates to shape the future of education in Bangladesh.",
      content:
        "The Education Right Assembly 2026 will bring together over 500 participants from government, civil society, academia, media, and the private sector. The two-day event will feature keynote addresses, panel discussions, policy debates, and the release of the Annual Education Rights Report.",
      event_date: "2026-03-15",
      event_location: "Dhaka International Convention City, Bashundhara",
      expected_attendees: 500,
      tags: ["Assembly", "Annual", "Flagship"],
      category: "Upcoming Event",
      is_featured: true,
      is_published: true,
    },
    {
      title: "Budget Justice in Education – Civil Society Forum",
      description:
        "A multi-stakeholder forum demanding fair and transparent allocation of the national education budget.",
      content:
        "Civil society organisations, journalists, and researchers will review the 2026-27 education budget proposals and present recommendations to Ministry officials.",
      event_date: "2026-05-20",
      event_location: "Dhaka, Bangladesh",
      expected_attendees: 150,
      tags: ["Budget", "Civil Society", "Advocacy"],
      category: "Upcoming Event",
      is_featured: false,
      is_published: true,
    },
    {
      title: "National Youth Parliament on Education Rights",
      description:
        "A mock parliament where young leaders debate and legislate on key education rights issues.",
      content:
        "100 youth delegates aged 16-25 will simulate parliamentary proceedings to develop their understanding of policy making and to voice young people's education priorities.",
      event_date: "2026-06-10",
      event_location: "National Assembly Hall, Dhaka",
      expected_attendees: 100,
      tags: ["Youth Parliament", "Education Rights", "Leadership"],
      category: "Upcoming Event",
      is_featured: false,
      is_published: true,
    },
  ];

  for (const e of events) {
    await createContent(token, {
      type: "event",
      slug: slug(e.title + "-" + Date.now()),
      ...e,
    });
  }

  // ── NEWS ────────────────────────────────────────────────────────────────
  console.log("\n📰 Seeding news…");

  const newsItems = [
    {
      title: "Inclusion of July Uprising in Textbook Demanded",
      description:
        "EDUCATION RIGHTS PARLIAMENT organized a landmark roundtable discussion with student leaders, educationists, and families of July Uprising victims to advocate for curriculum reform and the inclusion of July Uprising heroism in textbooks.",
      content: `ERP's landmark roundtable in November 2025 brought together student leaders, educationists, and families of July Uprising victims.\n\nKey demands presented at the event:\n• Include age-appropriate July Uprising content across all educational levels\n• Remove all politically motivated and substandard textbook content from past 15 years\n• Feature July Uprising martyrs (including Abu Saeed) and their heroism\n• Establish expert committees for curriculum review and textbook evaluation\n• Create a modern, updated education policy and curriculum framework\n\nThe event was covered by 9+ major national news outlets and generated over 100 media impressions. Four keynote speakers addressed the audience on the importance of accurate historical representation in education.`,
      featured_image:
        "https://outspoken.newagebd.com/files/img/202511/c7de259addec9129a81301647f56448a.jpg",
      images: [
        "/erp/photo_2025-10-23_21-12-02 (2).jpg",
        "/erp/photo_2025-10-23_21-12-03 (4).jpg",
        "/erp/photo_2025-10-23_21-12-04 (2).jpg",
        "/erp/photo_2025-10-23_21-12-05 (2).jpg",
      ],
      tags: ["Curriculum Reform", "Policy Advocacy", "Education Rights"],
      category: "In the News",
      source: "New Age BD",
      external_link:
        "https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded",
      publish_date: "2025-11-16",
      is_featured: true,
      is_published: true,
    },
    {
      title: "Inclusion of July Uprising in textbook demanded",
      description:
        "New Age covers how EDUCATION RIGHTS PARLIAMENT demanded the inclusion of July Uprising content in national textbooks.",
      content:
        "New Age Bangladesh covered ERP's November 2025 roundtable calling for curriculum reform. Student leaders and educationists voiced the need for accurate historical representation.",
      tags: ["Curriculum Reform", "New Age"],
      category: "Media Coverage",
      source: "New Age",
      external_link:
        "https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "নতুন বইয়ে শেখ মুজিব ও শেখ হাসিনার বিষয়বস্তু বাদ দেওয়ার দাবি",
      description:
        "Daily Janakantha reports on ERP's demand to remove politically motivated content from new textbooks.",
      content:
        "Daily Janakantha covered the ERP roundtable in which student leaders and activists demanded the removal of politically biased content from upcoming textbooks.",
      tags: ["Curriculum Reform", "Janakantha"],
      category: "Media Coverage",
      source: "Daily Janakantha",
      external_link: "https://www.dailyjanakantha.com/education/news/744627",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "পাঠ্যবই থেকে শেখ মুজিব ও শেখ হাসিনার বিষয়বস্তু অপসারণের দাবি",
      description: "Dhaka Post covers ERP's call for textbook content reform.",
      content:
        "Dhaka Post reported on Education Rights Parliament's roundtable urging the government to overhaul textbook content and include accurate accounts of the July Uprising.",
      tags: ["Curriculum Reform", "Dhaka Post"],
      category: "Media Coverage",
      source: "Dhaka Post",
      external_link: "https://www.dhakapost.com/education/322995",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "শিক্ষা অধিকার সংসদের গোলটেবিল আলোচনা",
      description:
        "Daily Inquilab covers Education Rights Parliament's roundtable discussion on education reform.",
      content:
        "Daily Inquilab reported that ERP held a roundtable bringing together diverse stakeholders to discuss the pressing need for education curriculum reform in Bangladesh.",
      tags: ["Roundtable", "Inquilab"],
      category: "Media Coverage",
      source: "Daily Inquilab",
      external_link: "https://dailyinqilab.com/national/news/704013",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "জুলাই গণঅভ্যুত্থানের অন্তর্ভুক্তি নিয়ে গোলটেবিল আলোচনা",
      description:
        "Somoy News covers the roundtable on including the July Uprising in national curriculum.",
      content:
        "Somoy News broadcast coverage of the ERP roundtable where participants demanded the government include the July Uprising in school curricula as a matter of historical justice.",
      tags: ["July Uprising", "Somoy News"],
      category: "Media Coverage",
      source: "Somoy News",
      external_link: "https://www.somoynews.tv/news/2025-11-16/QBL60DW3",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "শিক্ষা অধিকার সংসদের সংবাদ সম্মেলন",
      description:
        "JagoNews24 reports on Education Rights Parliament's press conference.",
      content:
        "JagoNews24 covered ERP's press conference and roundtable outcomes, highlighting the key demands for curriculum reform and the voices of student activists and families of July Uprising victims.",
      tags: ["Press Conference", "JagoNews24"],
      category: "Media Coverage",
      source: "JagoNews24",
      external_link: "https://www.jagonews24.com/m/education/news/982117",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "পাঠ্যবই সংস্কারে নতুন উদ্যোগ",
      description:
        "Ekhon TV covers Education Rights Parliament's new initiative on textbook reform.",
      content:
        "Ekhon TV reported on the new initiative led by ERP to reform textbook content in Bangladesh, including demands for removing politically-motivated material and including accurate historical accounts of the July Uprising.",
      tags: ["Textbook Reform", "Ekhon TV"],
      category: "Media Coverage",
      source: "Ekhon TV",
      external_link: "https://ekhon.tv/national/67387b0bdc342acf659c1e62",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "শিক্ষা অধিকার সংসদের গোলটেবিল আলোচনা",
      description:
        "RTV Online covers Education Rights Parliament's roundtable on education reform.",
      content:
        "RTV Online covered the ERP-organised roundtable where participants called for sweeping changes to the national curriculum, emphasising the need to include the July Uprising in school textbooks.",
      tags: ["Roundtable", "RTV Online"],
      category: "Media Coverage",
      source: "RTV Online",
      external_link: "https://rtvonline.com/bangladesh/300122",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
    {
      title: "বাচ্চারা জীবন দেয় আর মুর্ববিরা পদ ভাগাভাগি করেন",
      description:
        "Ittefaq covers the strong statements made at the ERP roundtable about sacrifice and political accountability.",
      content:
        "Daily Ittefaq reported on the powerful statements made during the ERP roundtable, where participants criticised politicians who exploit youths' sacrifices for personal gain and demanded genuine curriculum reform.",
      tags: ["Advocacy", "Ittefaq"],
      category: "Media Coverage",
      source: "Ittefaq",
      external_link: "https://www.ittefaq.com.bd/707322",
      publish_date: "2025-11-16",
      is_featured: false,
      is_published: true,
    },
  ];

  for (const n of newsItems) {
    await createContent(token, {
      type: "news",
      slug: slug(n.title + "-" + Date.now()),
      ...n,
    });
  }

  // ── GALLERY ─────────────────────────────────────────────────────────────
  console.log("\n🖼  Seeding gallery…");

  const galleryItems = [
    {
      title: "Educator Leadership Summit 2025",
      description:
        "Photos from the Educator Leadership Summit 2025 organised by Education Rights Parliament.",
      content:
        "The Educator Leadership Summit 2025 brought together hundreds of educators, youth leaders, and advocates to collaborate on education reform strategies.",
      category: "events",
      images: [
        "/erp/EducatorLeaderShipSummit2025.jpg",
        "/erp/EducatorLeaderShipSummit2025Cover.jpg",
        "/erp/photo_2025-10-23_21-12-01 (2).jpg",
        "/erp/photo_2025-10-23_21-12-02 (2).jpg",
        "/erp/photo_2025-10-23_21-12-02 (3).jpg",
        "/erp/photo_2025-10-23_21-12-03 (2).jpg",
        "/erp/photo_2025-10-23_21-12-03 (3).jpg",
        "/erp/photo_2025-10-23_21-12-03 (4).jpg",
        "/erp/photo_2025-10-23_21-12-03.jpg",
        "/erp/photo_2025-10-23_21-12-04 (2).jpg",
        "/erp/photo_2025-10-23_21-12-04.jpg",
        "/erp/photo_2025-10-23_21-12-05 (2).jpg",
        "/erp/photo_2025-10-23_21-12-05.jpg",
        "/erp/webmier.jpg",
      ],
      featured_image: "/erp/EducatorLeaderShipSummit2025Cover.jpg",
      tags: ["Summit", "Educators", "Leadership"],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Activities & Programs",
      description:
        "A collection of photos from various ERP activities and community programs.",
      content:
        "These photos capture the diverse range of activities and programs run by Education Rights Parliament across Bangladesh.",
      category: "activities",
      images: [
        "/new/01.jpg",
        "/new/02.jpg",
        "/new/03.jpg",
        "/new/04.jpg",
        "/new/05.jpg",
        "/new/06.jpg",
        "/new/07.jpg",
        "/new/08.jpg",
      ],
      featured_image: "/new/01.jpg",
      tags: ["Activities", "Programs", "Community"],
      is_featured: false,
      is_published: true,
    },
  ];

  for (const g of galleryItems) {
    await createContent(token, {
      type: "gallery",
      slug: slug(g.title + "-" + Date.now()),
      ...g,
    });
  }

  // ── RESEARCH ────────────────────────────────────────────────────────────
  console.log("\n🔬 Seeding research…");

  const researchItems = [
    {
      title: "Education Budget Equity: Where Does Bangladesh Stand?",
      description:
        "A critical analysis of Bangladesh's education budget allocation and its impact on marginalised communities.",
      content:
        "This policy brief examines how the national education budget is distributed across regions, income levels, and gender groups. Findings reveal significant disparities that undermine equitable access to quality education. Recommendations include ring-fencing funds for disadvantaged districts and introducing gender-responsive budgeting in education.",
      category: "Policy Brief",
      tags: ["Budget", "Equity", "Governance"],
      external_link: "#",
      is_featured: true,
      is_published: true,
    },
    {
      title: "Out-of-School Children in Bangladesh: A Situational Analysis",
      description:
        "Evidence-based analysis of the factors driving school dropout and strategies for re-enrolment.",
      content:
        "Drawing on household survey data and school-level records, this paper identifies the main drivers of school dropout: poverty, child labour, early marriage, and geographic barriers. It presents a multi-layered intervention framework for bringing out-of-school children back into learning.",
      category: "Research Paper",
      tags: ["Access", "Dropout", "Equity"],
      external_link: "#",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Teacher Professional Development: Gaps and Opportunities",
      description:
        "A review of pre-service and in-service teacher training programmes in Bangladesh.",
      content:
        "The paper finds that teacher training programmes suffer from inadequate duration, poor alignment with classroom realities, and limited focus on inclusive pedagogy. Policy recommendations centre on reforming pre-service curricula, strengthening mentorship systems, and increasing training budgets.",
      category: "Policy Brief",
      tags: ["Teachers", "Quality", "Training"],
      external_link: "#",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Digital Learning Readiness in Rural Bangladesh",
      description:
        "An assessment of the infrastructure, skills, and policy conditions needed for digital education in rural areas.",
      content:
        "The study reveals that while device penetration has improved, stable internet connectivity and digital literacy among teachers remain critical bottlenecks. Recommendations include focusing on low-bandwidth content delivery, community digital hubs, and teacher digital skilling programmes.",
      category: "Research Paper",
      tags: ["Digital", "Rural", "ICT"],
      external_link: "#",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Climate Change & Education Disruption in Bangladesh",
      description:
        "How climate disasters are impacting school attendance, learning continuity, and educational infrastructure.",
      content:
        "Based on data from flood-affected districts, this brief analyses the frequency and severity of school closures due to climate events. It calls for climate-resilient school infrastructure standards, disaster-preparedness curricula, and multi-hazard early warning integration in the education system.",
      category: "Policy Brief",
      tags: ["Climate", "Resilience", "Emergencies"],
      external_link: "#",
      is_featured: false,
      is_published: true,
    },
    {
      title:
        "Gender Parity in Secondary Education: Progress and Persistent Gaps",
      description:
        "A longitudinal study tracking gender parity trends in secondary schooling over the past decade.",
      content:
        "Despite impressive enrolment gains, the study identifies persistent quality and completion gaps that disadvantage girls. Adolescent girls face higher dropout rates linked to safety, sanitation, distance, and social norms. The paper proposes targeted conditional support programmes and school-level safety audits.",
      category: "Research Paper",
      tags: ["Gender", "Secondary Education", "Parity"],
      external_link: "#",
      is_featured: false,
      is_published: true,
    },
  ];

  for (const r of researchItems) {
    await createContent(token, {
      type: "research",
      slug: slug(r.title + "-" + Date.now()),
      ...r,
    });
  }

  // ── ADVOCACY ────────────────────────────────────────────────────────────
  console.log("\n📣 Seeding advocacy…");

  const advocacyItems = [
    {
      title: "Budget Justice in Education",
      description: "Advocating for fair education funding",
      content:
        "Education Rights Parliament's Budget Justice campaign demands that the government allocate at least 20% of the national budget and 6% of GDP to education. We mobilise civil society, educators, students, and community leaders to hold the government accountable to its education financing commitments.",
      category: "Campaign",
      tags: ["Budget", "Justice", "Advocacy"],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Every Child Learns",
      description: "Universal access to quality education",
      content:
        "The Every Child Learns campaign works to eliminate all barriers—financial, geographic, social, and physical—that prevent children from enrolling and completing school. We focus particularly on the most marginalised: children with disabilities, ethnic minorities, and those in climate-vulnerable regions.",
      category: "Campaign",
      tags: ["Access", "Inclusion", "Quality"],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Session 1: Education Budget 2025 – Initial Review",
      description:
        "Key outcomes and policy recommendations from the first parliamentary dialogue on education financing.",
      content:
        "The inaugural session examined the 2025 education budget allocations, identifying underfunding for primary education, disproportionate spending on higher education, and lack of transparency in provincial distribution. Recommendations were submitted to the Ministry of Finance.",
      category: "Parliament Session",
      tags: ["Parliament", "Budget", "Policy"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Session 2: Education Budget 2025 – Civil Society Response",
      description:
        "Civil society organisations present their assessment and alternative budget proposals.",
      content:
        "Civil society representatives presented counter-proposals to the government's 2025 education budget, advocating for greater investment in teacher salaries, school infrastructure, and learning materials in underserved districts. The session generated significant media attention.",
      category: "Parliament Session",
      tags: ["Parliament", "Civil Society", "Budget"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Session 3: Education Budget 2025 – Parliamentary Dialogue",
      description:
        "Final session: parliamentary dialogue and consensus recommendations on education financing.",
      content:
        "The third session resulted in a consensus statement signed by all participating organisations, calling on the government to increase the education budget by 2% of GDP over five years and to establish an independent education finance monitoring body.",
      category: "Parliament Session",
      tags: ["Parliament", "Consensus", "Reform"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Policy Update: New National Curriculum Framework",
      description:
        "Latest developments in the national curriculum review and what it means for learners and educators.",
      content:
        "The government has launched a comprehensive review of the national curriculum framework. ERP is engaging actively to ensure that the new framework prioritises critical thinking, inclusivity, and accurate historical content. We are monitoring the consultation process and submitting formal recommendations.",
      category: "Policy Watch",
      tags: ["Policy", "Curriculum", "National"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Policy Update: Teacher Recruitment Reform",
      description:
        "Government announces reforms to the national teacher recruitment and assessment process.",
      content:
        "The government has proposed significant changes to teacher recruitment, including a new competency-based assessment and higher minimum qualification standards. ERP welcomes the reform direction but calls for accompanying investment in training infrastructure and salary increases.",
      category: "Policy Watch",
      tags: ["Policy", "Teachers", "Reform"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Policy Update: Digital Education Strategy",
      description:
        "National digital education strategy released – ERP's analysis and recommendations.",
      content:
        "The Ministry of Education released its five-year digital education strategy. While the strategy includes important goals around connectivity and device access, ERP notes gaps in teacher training, content localisation, and provisions for students with disabilities. Our full analysis has been submitted.",
      category: "Policy Watch",
      tags: ["Policy", "Digital", "Technology"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Policy Update: Budget Allocation Transparency",
      description:
        "Calls for open data and transparency in education budget tracking across all levels.",
      content:
        "Following advocacy by ERP and partner organisations, the government has agreed to publish quarterly education spending reports. ERP will monitor compliance and publish independent analysis to hold all stakeholders accountable.",
      category: "Policy Watch",
      tags: ["Policy", "Budget", "Transparency"],
      is_featured: false,
      is_published: true,
    },
  ];

  for (const a of advocacyItems) {
    await createContent(token, {
      type: "advocacy",
      slug: slug(a.title + "-" + Date.now()),
      ...a,
    });
  }

  // ── PARLIAMENT ──────────────────────────────────────────────────────────
  console.log("\n🏛  Seeding parliament…");

  const parliamentItems = [
    {
      title: "ERP People's Parliament – Inaugural Session",
      description:
        "The first session of the ERP civic parliament, bringing together citizens to discuss education rights and policy priorities.",
      content:
        "The inaugural People's Parliament session opened with addresses from education rights advocates, student leaders, and community representatives. Participants debated four key education policy motions and passed three resolutions calling for increased education investment, curriculum reform, and teacher welfare improvements.",
      category: "Session",
      tags: ["Parliament", "Inaugural", "Policy"],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Hearing on Inclusive Education for Persons with Disabilities",
      description:
        "A parliamentary hearing examining barriers to education for students with disabilities in Bangladesh.",
      content:
        "The hearing brought together disability rights advocates, parents, students with disabilities, and education officials. Witnesses documented systemic barriers including physical inaccessibility, lack of trained teachers, unavailability of assistive technologies, and discriminatory attitudes. A set of legislative recommendations was forwarded to the Ministry of Education.",
      category: "Hearing",
      tags: ["Inclusion", "Disability", "Rights"],
      is_featured: true,
      is_published: true,
    },
    {
      title: "Policy Debate: Early Childhood Education in Bangladesh",
      description:
        "A structured parliamentary debate on expanding access to early childhood education and care.",
      content:
        "Delegates debated the current state of early childhood education, with speakers highlighting the inadequacy of pre-primary provision, particularly in rural and peri-urban areas. The session resulted in a call for mandatory one-year pre-primary education and increased government investment in ECD infrastructure.",
      category: "Debate",
      tags: ["Early Childhood", "ECD", "Policy"],
      is_featured: false,
      is_published: true,
    },
    {
      title: "Public Hearing: Education Financing in Bangladesh",
      description:
        "Citizens present evidence on the adequacy and equity of education financing at the national and sub-national levels.",
      content:
        "Community members from 14 districts presented testimonies on underfunded schools, crumbling infrastructure, and shortage of qualified teachers. The hearing produced a Citizens' Education Finance Charter that was formally presented to parliamentary standing committee members.",
      category: "Hearing",
      tags: ["Financing", "Citizens", "Public Hearing"],
      is_featured: false,
      is_published: true,
    },
  ];

  for (const p of parliamentItems) {
    await createContent(token, {
      type: "parliament",
      slug: slug(p.title + "-" + Date.now()),
      ...p,
    });
  }

  // ── PROJECTS ────────────────────────────────────────────────────────────
  console.log("\n🚀 Seeding projects…");

  const projectItems = [
    {
      title: "Education Rights Monitoring Network",
      description:
        "A nationwide citizen-led monitoring system tracking government compliance with education rights obligations.",
      content:
        "The Education Rights Monitoring Network trains grassroots monitors in 30 districts to collect data on school enrolment, infrastructure, teacher attendance, and learning materials availability. Monthly reports are submitted to the Ministry of Education and published publicly to drive accountability.",
      category: "Monitoring",
      tags: ["Monitoring", "Accountability", "Nationwide"],
      status: "ongoing",
      is_featured: true,
      is_published: true,
    },
    {
      title: "Civic Parliament for Education Reform",
      description:
        "A structured civic engagement platform that gives citizens a direct voice in education policy making.",
      content:
        "The Civic Parliament holds quarterly sessions where citizen delegates debate education policy, conduct hearings, and develop policy recommendations. Recommendations are formally presented to government officials and tracked for implementation. The initiative has engaged over 2,000 citizens to date.",
      category: "Civic Engagement",
      tags: ["Parliament", "Policy", "Civic"],
      status: "ongoing",
      is_featured: true,
      is_published: true,
    },
    {
      title: "Budget Justice Campaign",
      description:
        "A sustained advocacy campaign driving demand for equitable and transparent education budget allocation.",
      content:
        "The Budget Justice Campaign mobilises civil society and community organisations to demand that education receive at least 20% of the national budget. The campaign conducts budget literacy workshops, media engagement, and direct advocacy with Members of Parliament.",
      category: "Advocacy",
      tags: ["Budget", "Advocacy", "Campaign"],
      status: "ongoing",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Every Child Learns – Inclusion Initiative",
      description:
        "A targeted programme to bring marginalised children into quality education in 10 underserved districts.",
      content:
        "Working with local schools, families, and community leaders, the Every Child Learns initiative supports enrolment drives, provides conditional support packages for vulnerable families, trains teachers in inclusive pedagogy, and advocates for infrastructure improvements in participating schools.",
      category: "Programme",
      tags: ["Inclusion", "Access", "Community"],
      status: "ongoing",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Youth Advocacy Training Programme",
      description:
        "Equipping the next generation of education rights advocates with skills, knowledge, and networks.",
      content:
        "The Youth Advocacy Training Programme delivers intensive three-day training to young people aged 18-30 in seven divisions. Training covers education rights law, community organising, policy analysis, public speaking, and digital advocacy. Graduates form a national network of youth education advocates.",
      category: "Capacity Building",
      tags: ["Youth", "Training", "Advocacy"],
      status: "upcoming",
      is_featured: false,
      is_published: true,
    },
    {
      title: "Education Rights Index",
      description:
        "An annual data-driven index measuring the state of education rights across Bangladesh's divisions.",
      content:
        "The Education Rights Index compiles data from government sources, household surveys, and community monitoring to produce a composite score for each division. The index covers access, quality, equity, financing, and governance. Results are published annually with policy recommendations.",
      category: "Research",
      tags: ["Data", "Index", "Evidence"],
      status: "completed",
      is_featured: false,
      is_published: true,
    },
  ];

  for (const p of projectItems) {
    await createContent(token, {
      type: "project",
      slug: slug(p.title + "-" + Date.now()),
      ...p,
    });
  }

  console.log("\n🎉 Seeding complete!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
