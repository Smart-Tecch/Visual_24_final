import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NavbarFallback from "@/components/NavbarFallback";
import Footer from "@/components/Footer";
import { getPublishedProjectCount } from "@/lib/actions/project.actions";
import { getSiteSettings } from "@/lib/actions/settings.actions";

async function NavWithSettings() {
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

import WhatsAppButton from "@/components/WhatsAppButton";

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
      <Suspense
        fallback={
          <footer className="bg-dark-100 py-10 text-center text-sm text-white/50">
            Loading…
          </footer>
        }
      >
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </>
  );
};

export default layout;
