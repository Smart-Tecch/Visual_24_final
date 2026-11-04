import { contactPhones, schoolData } from "@/lib/school-data";

export const siteUrl = `https://${schoolData.school.domain ?? "visual-24-technical-institute.vercel.app"}`;

export function educationalOrganizationJsonLd() {
  const phones = contactPhones();
  const address = schoolData.school.address;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: schoolData.school.name,
    slogan: schoolData.school.motto,
    url: siteUrl,
    email: schoolData.school.contacts.email || undefined,
    telephone: phones[0] || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: [address.line1, address.line2].filter(Boolean).join(", "),
      addressLocality: address.area || "Kasenge",
      addressCountry: address.country || "UG",
    },
    description: schoolData.seo.description,
  };
}
