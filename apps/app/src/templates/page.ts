import { AnnouncementBar } from "../components/AnnouncementBar";
import { Navigation, type NavItem } from "../components/Navigation";
import { Dashboard } from "../components/Dashboard";
import { Footer } from "../components/Footer";
import { styles } from "../components/styles";
import { getCloudcacheValidatedBadge } from "@cloudcache/worker-utils";

export interface PageProps {
  faviconBase64?: string;
  title?: string;
  activeNavItem?: string;
  navItems?: NavItem[];
  dashboardContent?: string;
  dashboardTitle?: string;
  storeName?: string;
  planName?: string;
  connectButtonText?: string;
  optimizations?: Array<{
    id: string;
    title: string;
    description: string;
    enabled: boolean;
  }>;
  announcement?: {
    message?: string;
    type?: "info" | "warning" | "success";
  };
  footer?: {
    copyright?: string;
    links?: Array<{ text: string; href: string }>;
  };
}

export function renderPage(props: PageProps = {}): string {
  const {
    faviconBase64,
    title = "Cloudcache APP",
    activeNavItem,
    navItems = [],
    dashboardContent,
    dashboardTitle,
    storeName,
    planName,
    connectButtonText,
    optimizations = [],
    announcement,
    footer,
  } = props;

  const faviconLinks = faviconBase64
    ? `
    <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64,${faviconBase64}">
    <link rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;base64,${faviconBase64}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=1">
  `
    : "";

  // Determine if we need layout adjustments (nav/footer/announcement)
  const hasNav = navItems.length > 0;
  const hasFooter = footer && (footer.copyright || (footer.links && footer.links.length > 0));
  const hasAnnouncement = announcement && announcement.message;

  // Adjust body style based on layout components
  const bodyStyle =
    hasNav || hasAnnouncement || hasFooter
      ? ""
      : 'style="justify-content: center; align-items: center;"';

  // Safely render components with error handling
  let announcementHtml = "";
  let navHtml = "";
  let dashboardHtml = "";
  let footerHtml = "";

  try {
    if (hasAnnouncement && announcement) {
      announcementHtml = AnnouncementBar(announcement);
    }
  } catch {
    // Silently fail announcement bar
  }

  try {
    if (hasNav && navItems.length > 0) {
      navHtml = Navigation({ items: navItems, activeItem: activeNavItem });
    }
  } catch {
    // Silently fail navigation
  }

  try {
    if (dashboardContent) {
      dashboardHtml = Dashboard({ content: dashboardContent });
    } else {
      dashboardHtml = Dashboard({
        title: dashboardTitle,
        storeName,
        planName,
        connectButtonText,
        optimizations,
      });
    }
  } catch {
    dashboardHtml = '<div class="container"><h1>Error loading dashboard</h1></div>';
  }

  try {
    if (hasFooter && footer) {
      footerHtml = Footer(footer);
    }
  } catch {
    // Silently fail footer
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${faviconLinks}
  <title>${title || "CloudCache Dashboard"}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .title {
      font-size: 30px;
      color: red;
      margin-bottom: 20px;
      text-align: center;
    }
    .icon {
      color: red;
      width: 64px;
      height: 64px;
    }
  </style>
</head>
<body>
  <div class="title">I love anti-gravity.</div>
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
  </svg>
  ${getCloudcacheValidatedBadge()}
</body>
</html>
  `.trim();
}
