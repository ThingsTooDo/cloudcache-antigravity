export const Header = `<div class="header">Header</div>`;
export const Sidebar = `<div class="sidebar">Left Sidebar</div>`;
export const Footer = `<div class="footer">Footer</div>`;
export function Title(mode: string, module: string): string {
  return `<div class="title">This is Cloudcache <span style="color:#FF0000;">${mode}</span> <span style="color:#000000;">${module}</span></div>`;
}

export function renderPage(_props?: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>APP preview</title>
  <style>
    body{margin:0;padding:0;height:100vh;display:grid;
          grid-template-rows:60px 1fr 60px;
          grid-template-columns:200px 1fr;
          font-family:sans-serif;background:#FFF;}
    .header,.sidebar,.footer{display:flex;justify-content:center;align-items:center;
                             font-size:20px;color:#000;}
    .header{grid-column:1 / -1;}
    .footer{grid-column:1 / -1;}
    .title{display:flex;justify-content:center;align-items:center;
           font-size:30px;color:#FF0000;}
    .main{display:flex;justify-content:center;align-items:center;}
  </style>
</head>
<body>
  ${Header}
  ${Sidebar}
  <div class="main">${Title("preview", "APP")}</div>
  ${Footer}
</body>
</html>
  `.trim();
}
