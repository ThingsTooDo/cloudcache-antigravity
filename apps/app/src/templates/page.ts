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
  // Strict UI Template for Preview Phase I
  // We ignore props for this phase to ensure strict UI compliance
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloudcache Preview APP</title>
  <style>
    body { margin: 0; padding: 0; height: 100vh; display: grid; grid-template-rows: 60px 1fr 60px; grid-template-columns: 200px 1fr; font-family: sans-serif; background: #FFFFFF; }
    .header { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; border-bottom: 1px solid #eee; }
    .sidebar { display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; border-right: 1px solid #eee; }
    .footer { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; border-top: 1px solid #eee; }
    .main { display: flex; justify-content: center; align-items: center; }
    .title { font-size: 30px; color: #FF0000; }
    .module-name { color: #000000; }
  </style>
</head>
<body>
  <div class="header">Header</div>
  <div class="sidebar">Left Sidebar</div>
  <div class="main">
    <div class="title">This is Cloudcache preview <span class="module-name">APP</span></div>
  </div>
  <div class="footer">Footer</div>
</body>
</html>
  `.trim();
}
