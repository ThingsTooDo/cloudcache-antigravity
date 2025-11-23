import { j as t } from "./jsx-runtime-BgjmLhhW.js";
import {
  n as h,
  o as x,
  p as y,
  q as S,
  r as n,
  _ as f,
  M as w,
  L as j,
  O as g,
  S as M,
} from "./components-BteVxL_8.js";
let a = "positions";
function k({ getKey: r, ...l }) {
  let { isSpaMode: c } = h(),
    o = x(),
    u = y();
  S({ getKey: r, storageKey: a });
  let d = n.useMemo(() => {
    if (!r) return null;
    let e = r(o, u);
    return e !== o.key ? e : null;
  }, []);
  if (c) return null;
  let p = ((e, m) => {
    if (!window.history.state || !window.history.state.key) {
      let s = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: s }, "");
    }
    try {
      let i = JSON.parse(sessionStorage.getItem(e) || "{}")[m || window.history.state.key];
      typeof i == "number" && window.scrollTo(0, i);
    } catch (s) {
      (console.error(s), sessionStorage.removeItem(e));
    }
  }).toString();
  return n.createElement(
    "script",
    f({}, l, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: { __html: `(${p})(${JSON.stringify(a)}, ${JSON.stringify(d)})` },
    })
  );
}
function R() {
  return t.jsxs("html", {
    children: [
      t.jsxs("head", {
        children: [
          t.jsx("meta", { charSet: "utf-8" }),
          t.jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
          t.jsx(w, {}),
          t.jsx(j, {}),
        ],
      }),
      t.jsxs("body", { children: [t.jsx(g, {}), t.jsx(k, {}), t.jsx(M, {})] }),
    ],
  });
}
export { R as default };
