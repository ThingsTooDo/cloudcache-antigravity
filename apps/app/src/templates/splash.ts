export const Header = `<div class="header">Header</div>`;
export const Sidebar = `<div class="sidebar">Left Sidebar</div>`;
export const Footer = `<div class="footer">Footer</div>`;
export function Title(mode: string, module: string): string {
  return `<div class="title">I love Cloudcache</div>`;
}

export function renderPage(_props?: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>APP</title>
  <style>
    body { margin: 0; padding: 0; height: 100vh; display: grid; grid-template-rows: 60px 1fr 60px; grid-template-columns: 200px 1fr; font-family: sans-serif; background: #FFFFFF; }
    .header { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .sidebar { display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .footer { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .main { display: flex; justify-content: center; align-items: center; }
    .title { font-size: 30px; color: red; animation: slideIn 1s ease-out; }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="header">Header</div>
  <div class="sidebar">Left Sidebar</div>
  <div class="main">
    <div class="title">I love Cloudflare (app)</div>
  </div>
  <div class="footer">Footer</div>
</body>
</html>
  `.trim();
}
