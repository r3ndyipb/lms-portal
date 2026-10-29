import React from "react";
import StudentPortalShell from "@/components/StudentPortalShell";

export const metadata = {
  title: "Event & Workshop Teknologi — ANVIEO Academy LMS",
  description: "Webinar, workshop hands-on, dan sesi live coding bersama para praktisi industri.",
};

export default function EventsPage() {
  return <StudentPortalShell initialNav="event" />;
}
