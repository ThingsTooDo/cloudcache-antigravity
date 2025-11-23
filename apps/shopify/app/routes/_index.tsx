import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "This is Cloudcache Shopapp Preview" }];
};

export default function Index() {
  return (
    <html>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; }
          .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            background-color: white;
          }
          .header {
            display: flex;
            align-items: center;
            justifyContent: center;
            fontSize: 20px;
            color: black;
            padding: 20px;
            border-bottom: 1px solid #ccc;
          }
          .main {
            display: flex;
            flex: 1;
            overflow: hidden;
          }
          .sidebar {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: black;
            padding: 20px;
            border-right: 1px solid #ccc;
          }
          .content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .title {
            font-size: 30px;
          }
          .title-red {
            color: red;
          }
          .title-black {
            color: black;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: black;
            padding: 20px;
            border-top: 1px solid #ccc;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">Header</div>
          <div className="main">
            <div className="sidebar">Left sidebar</div>
            <div className="content">
              <div className="title">
                <span className="title-red">This is Cloudcache Shopapp </span>
                <span className="title-black">Preview</span>
              </div>
            </div>
          </div>
          <div className="footer">Footer</div>
        </div>
      </body>
    </html>
  );
}
