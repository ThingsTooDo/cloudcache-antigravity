import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "This is Cloudcache Shopapp Preview" }];
};

export default function Index() {
  return (
    <div className="container">
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
          color: green;
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
      <div className="header">Header</div>
      <div className="main">
        <div className="sidebar">Left Sidebar</div>
        <div className="content">
          <div className="title">I love Cloudflare (app)</div>
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}
