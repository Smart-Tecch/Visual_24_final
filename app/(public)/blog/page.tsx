import PageHero from "@/components/PageHero";
import { siteImages } from "@/lib/site-content";

export default function BlogPage() {
  return (
    <div>
      <PageHero
        kicker="Journal"
        title="Notes from the studio."
        lede="Stories from Visual 24 will be published here when the school has them. Nothing on this page is a sample article."
        image={siteImages.pages.blog}
        imageAlt="Computer lab at Visual 24 Technical Institute"
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="text-muted-foreground">Coming soon.</p>
      </section>
    </div>
  );
}
