export function renderPage(props = {}) {
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
