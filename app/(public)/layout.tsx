import React, { Suspense } from "react";
import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import NavbarFallback from "@/components/NavbarFallback";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPublishedProjectCount } from "@/lib/actions/project.actions";
import { getSiteSettings } from "@/lib/actions/settings.actions";

async function NavWithSettings() {
  await connection();
  const [projectCount, settings] = await Promise.all([
    getPublishedProjectCount(),
    getSiteSettings(),
  ]);

  return (
    <Navbar
      showProjects={projectCount > 0}
      motto={settings.school.motto}
    />
  );
}

function NavFallback() {
  return <NavbarFallback />;
}

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<NavFallback />}>
        <NavWithSettings />
      </Suspense>
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default layout;
