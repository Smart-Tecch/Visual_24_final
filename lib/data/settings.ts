import dbConnect from "@/lib/db";
import SiteSettings from "@/lib/models/SiteSettings";
import { rethrowNext } from "@/lib/next-errors";
import { schoolData } from "@/lib/school-data";
import type { SiteSettings as SiteSettingsType } from "@/lib/types";

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

const jsonFallback: SiteSettingsType = {
  _id: "default",
  key: "default",
  school: schoolData.school,
  categories: schoolData.categories,
  pages: schoolData.pages,
  seo: schoolData.seo,
  showFees: false,
};

export async function findSiteSettings(): Promise<SiteSettingsType> {
  try {
    await dbConnect();
    const doc = await SiteSettings.findOne({ key: "default" }).lean();
    if (!doc) return jsonFallback;
    return serialize(doc);
  } catch (error) {
    rethrowNext(error);
    console.error("Error fetching site settings:", error);
    return jsonFallback;
  }
}
