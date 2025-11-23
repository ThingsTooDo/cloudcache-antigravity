import { j as e } from "./jsx-runtime-BgjmLhhW.js";
import {
  c as E,
  w as g,
  B as c,
  I,
  a as b,
  T as F,
  i as L,
  P as T,
  L as d,
  C as h,
  b as k,
  d as v,
  S as B,
} from "./AppBridgeProvider-D5vJUI4H.js";
import { R as r, r as l, d as P, e as w, F as A } from "./components-DT2cD7Eo.js";
var m = {
  Item: "Polaris-FormLayout__Item",
  grouped: "Polaris-FormLayout--grouped",
  condensed: "Polaris-FormLayout--condensed",
};
function j({ children: t, condensed: s = !1 }) {
  const n = E(m.Item, s ? m.condensed : m.grouped);
  return t ? r.createElement("div", { className: n }, t) : null;
}
function f({ children: t, condensed: s, title: n, helpText: a }) {
  const i = l.useId();
  let o = null,
    p,
    x = null,
    u;
  (a && ((p = `${i}HelpText`), (o = r.createElement(b, { id: p, color: "text-secondary" }, a))),
    n && ((u = `${i}Title`), (x = r.createElement(F, { id: u, as: "p" }, n))));
  const S = l.Children.map(t, (C) => g(C, j, { condensed: s }));
  return r.createElement(
    c,
    { role: "group", gap: "200", "aria-labelledby": u, "aria-describedby": p },
    x,
    r.createElement(I, { gap: "300" }, S),
    o
  );
}
const y = l.memo(function ({ children: s }) {
  return r.createElement(c, { gap: "400" }, l.Children.map(s, N));
});
y.Group = f;
function N(t, s) {
  return L(t, f) ? t : g(t, j, { key: s });
}
function V() {
  const { shop: t } = P(),
    { host: s, apiKey: n } = w(),
    [a, i] = l.useState(""),
    o = e.jsx(T, {
      title: "Settings",
      backAction: { url: "/" },
      children: e.jsxs(d, {
        children: [
          e.jsx(d.Section, {
            children: e.jsx(h, {
              children: e.jsx(c, {
                gap: "400",
                children: e.jsxs(y, {
                  children: [
                    e.jsx(k, {
                      label: "App Setting",
                      value: a,
                      onChange: i,
                      autoComplete: "off",
                      helpText: "Configure your app settings here",
                    }),
                    e.jsxs(A, {
                      method: "post",
                      children: [
                        e.jsx("input", { type: "hidden", name: "setting", value: a }),
                        e.jsx(v, { submit: !0, children: "Save Settings" }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          }),
          e.jsx(d.Section, {
            children: e.jsx(h, {
              children: e.jsxs(c, {
                gap: "200",
                children: [
                  e.jsxs("p", { children: [e.jsx("strong", { children: "Shop:" }), " ", t] }),
                  e.jsxs("p", {
                    children: [e.jsx("strong", { children: "Status:" }), " Connected"],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    });
  return s && n ? e.jsx(B, { apiKey: n, host: s, children: o }) : o;
}
export { V as default };
