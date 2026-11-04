"use server";

import { findSiteSettings } from "@/lib/data/settings";
import type { SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return findSiteSettings();
}
