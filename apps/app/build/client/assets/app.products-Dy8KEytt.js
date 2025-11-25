import { j as F } from "./jsx-runtime-BgjmLhhW.js";
import {
  u as J,
  c as E,
  v as re,
  h as G,
  e as oe,
  f as ce,
  g as de,
  j as ue,
  M as he,
  k as fe,
  d as Q,
  l as me,
  m as pe,
  n as ge,
  o as be,
  E as X,
  P as Ce,
  L as Y,
  C as ye,
  T as ve,
  S as Se,
} from "./AppBridgeProvider-DqiiqNw1.js";
import { R as i, x as Te, r as k, d as Ee, e as ke } from "./components-4Qx4B_-1.js";
var ne = function (r) {
  return i.createElement(
    "svg",
    Object.assign({ viewBox: "0 0 20 20" }, r),
    i.createElement("path", {
      fillRule: "evenodd",
      d: "M9.116 4.323a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z",
    }),
    i.createElement("path", {
      fillOpacity: 0.33,
      fillRule: "evenodd",
      d: "M9.116 15.677a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z",
    })
  );
};
ne.displayName = "SortAscendingIcon";
var le = function (r) {
  return i.createElement(
    "svg",
    Object.assign({ viewBox: "0 0 20 20" }, r),
    i.createElement("path", {
      fillOpacity: 0.33,
      fillRule: "evenodd",
      d: "M9.116 4.823a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z",
    }),
    i.createElement("path", {
      fillRule: "evenodd",
      d: "M9.116 15.177a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z",
    })
  );
};
le.displayName = "SortDescendingIcon";
var K, ee;
function Ne() {
  if (ee) return K;
  ee = 1;
  var h = typeof Element < "u",
    r = typeof Map == "function",
    e = typeof Set == "function",
    t = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function n(s, l) {
    if (s === l) return !0;
    if (s && l && typeof s == "object" && typeof l == "object") {
      if (s.constructor !== l.constructor) return !1;
      var o, a, u;
      if (Array.isArray(s)) {
        if (((o = s.length), o != l.length)) return !1;
        for (a = o; a-- !== 0; ) if (!n(s[a], l[a])) return !1;
        return !0;
      }
      var c;
      if (r && s instanceof Map && l instanceof Map) {
        if (s.size !== l.size) return !1;
        for (c = s.entries(); !(a = c.next()).done; ) if (!l.has(a.value[0])) return !1;
        for (c = s.entries(); !(a = c.next()).done; )
          if (!n(a.value[1], l.get(a.value[0]))) return !1;
        return !0;
      }
      if (e && s instanceof Set && l instanceof Set) {
        if (s.size !== l.size) return !1;
        for (c = s.entries(); !(a = c.next()).done; ) if (!l.has(a.value[0])) return !1;
        return !0;
      }
      if (t && ArrayBuffer.isView(s) && ArrayBuffer.isView(l)) {
        if (((o = s.length), o != l.length)) return !1;
        for (a = o; a-- !== 0; ) if (s[a] !== l[a]) return !1;
        return !0;
      }
      if (s.constructor === RegExp) return s.source === l.source && s.flags === l.flags;
      if (
        s.valueOf !== Object.prototype.valueOf &&
        typeof s.valueOf == "function" &&
        typeof l.valueOf == "function"
      )
        return s.valueOf() === l.valueOf();
      if (
        s.toString !== Object.prototype.toString &&
        typeof s.toString == "function" &&
        typeof l.toString == "function"
      )
        return s.toString() === l.toString();
      if (((u = Object.keys(s)), (o = u.length), o !== Object.keys(l).length)) return !1;
      for (a = o; a-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(l, u[a])) return !1;
      if (h && s instanceof Element) return !1;
      for (a = o; a-- !== 0; )
        if (
          !((u[a] === "_owner" || u[a] === "__v" || u[a] === "__o") && s.$$typeof) &&
          !n(s[u[a]], l[u[a]])
        )
          return !1;
      return !0;
    }
    return s !== s && l !== l;
  }
  return (
    (K = function (l, o) {
      try {
        return n(l, o);
      } catch (a) {
        if ((a.message || "").match(/stack|recursion/i))
          return (console.warn("react-fast-compare cannot handle circular refs"), !1);
        throw a;
      }
    }),
    K
  );
}
var He = Ne();
const De = Te(He);
function Fe(h) {
  return function (r, e) {
    const { firstVisibleColumnIndex: t, tableLeftVisibleEdge: n, tableRightVisibleEdge: s } = h,
      l = r.offsetLeft,
      o = l + r.offsetWidth,
      a = te(l, n, s, "left"),
      u = te(o, n, s, "right"),
      c = a || u,
      f = r.offsetWidth;
    return (
      c && (h.firstVisibleColumnIndex = Math.min(t, e)),
      { leftEdge: l, rightEdge: o, isVisible: c, width: f, index: e }
    );
  };
}
function te(h, r, e, t) {
  return h >= r + (t === "left" ? 0 : 30) && h <= e - 30;
}
function Pe(h, r) {
  const { firstVisibleColumnIndex: e } = h,
    t = Math.max(e - 1, 0),
    n = r[t],
    s = r[e];
  return { previousColumn: n, currentColumn: s };
}
var d = {
  DataTable: "Polaris-DataTable",
  condensed: "Polaris-DataTable--condensed",
  Navigation: "Polaris-DataTable__Navigation",
  Pip: "Polaris-DataTable__Pip",
  "Pip-visible": "Polaris-DataTable__Pip--visible",
  ScrollContainer: "Polaris-DataTable__ScrollContainer",
  Table: "Polaris-DataTable__Table",
  TableRow: "Polaris-DataTable__TableRow",
  Cell: "Polaris-DataTable__Cell",
  IncreasedTableDensity: "Polaris-DataTable__IncreasedTableDensity",
  ZebraStripingOnData: "Polaris-DataTable__ZebraStripingOnData",
  RowCountIsEven: "Polaris-DataTable__RowCountIsEven",
  ShowTotalsInFooter: "Polaris-DataTable__ShowTotalsInFooter",
  "Cell-separate": "Polaris-DataTable__Cell--separate",
  "Cell-firstColumn": "Polaris-DataTable__Cell--firstColumn",
  "Cell-numeric": "Polaris-DataTable__Cell--numeric",
  "Cell-truncated": "Polaris-DataTable__Cell--truncated",
  "Cell-header": "Polaris-DataTable__Cell--header",
  "Cell-sortable": "Polaris-DataTable__Cell--sortable",
  "Heading-left": "Polaris-DataTable__Heading--left",
  "Cell-verticalAlignTop": "Polaris-DataTable__Cell--verticalAlignTop",
  "Cell-verticalAlignBottom": "Polaris-DataTable__Cell--verticalAlignBottom",
  "Cell-verticalAlignMiddle": "Polaris-DataTable__Cell--verticalAlignMiddle",
  "Cell-verticalAlignBaseline": "Polaris-DataTable__Cell--verticalAlignBaseline",
  hoverable: "Polaris-DataTable--hoverable",
  "Cell-hovered": "Polaris-DataTable__Cell--hovered",
  Icon: "Polaris-DataTable__Icon",
  Heading: "Polaris-DataTable__Heading",
  StickyHeaderEnabled: "Polaris-DataTable__StickyHeaderEnabled",
  StickyHeaderWrapper: "Polaris-DataTable__StickyHeaderWrapper",
  "Cell-sorted": "Polaris-DataTable__Cell--sorted",
  "Cell-total": "Polaris-DataTable__Cell--total",
  ShowTotals: "Polaris-DataTable__ShowTotals",
  "Cell-total-footer": "Polaris-DataTable--cellTotalFooter",
  Footer: "Polaris-DataTable__Footer",
  StickyHeaderInner: "Polaris-DataTable__StickyHeaderInner",
  "StickyHeaderInner-isSticky": "Polaris-DataTable__StickyHeaderInner--isSticky",
  StickyHeaderTable: "Polaris-DataTable__StickyHeaderTable",
  FixedFirstColumn: "Polaris-DataTable__FixedFirstColumn",
  StickyTableHeadingsRow: "Polaris-DataTable__StickyTableHeadingsRow",
  TooltipContent: "Polaris-DataTable__TooltipContent",
};
function M({
  content: h,
  contentType: r,
  nthColumn: e,
  firstColumn: t,
  truncate: n,
  header: s,
  total: l,
  totalInFooter: o,
  sorted: a,
  sortable: u,
  sortDirection: c,
  inFixedNthColumn: f,
  verticalAlign: p = "top",
  defaultSortDirection: m = "ascending",
  onSort: v,
  colSpan: C,
  setRef: y = () => {},
  stickyHeadingCell: S = !1,
  stickyCellWidth: H,
  hovered: w = !1,
  handleFocus: D = () => {},
  hasFixedNthColumn: P = !1,
  fixedCellVisible: I = !1,
  firstColumnMinWidth: N,
  style: T,
  lastFixedFirstColumn: x,
}) {
  const A = J(),
    V = r === "numeric",
    _ = E(
      d.Cell,
      d[`Cell-${re("verticalAlign", p)}`],
      t && d["Cell-firstColumn"],
      n && d["Cell-truncated"],
      s && d["Cell-header"],
      l && d["Cell-total"],
      o && d["Cell-total-footer"],
      V && d["Cell-numeric"],
      u && d["Cell-sortable"],
      a && d["Cell-sorted"],
      S && d.StickyHeaderCell,
      w && d["Cell-hovered"],
      x && f && I && d["Cell-separate"],
      e && f && S && d.FixedFirstColumn
    ),
    B = E(s && d.Heading, s && r === "text" && d["Heading-left"]),
    $ = E(u && d.Icon),
    O = a && c ? c : m,
    q = O === "descending" ? le : ne,
    z = c === "ascending" ? "descending" : "ascending",
    Z = A.translate("Polaris.DataTable.sortAccessibilityLabel", { direction: a ? z : O }),
    W = i.createElement(
      "span",
      { className: $ },
      i.createElement(ce, { source: q, accessibilityLabel: Z })
    ),
    U = !(S && P && e && !f),
    b = u
      ? i.createElement(
          "button",
          { className: B, onClick: v, onFocus: D, tabIndex: U ? 0 : -1 },
          W,
          h
        )
      : h,
    R = C && C > 1 ? { colSpan: C } : {},
    L = e && N ? { minWidth: N } : { minWidth: H },
    j = i.createElement(
      "th",
      Object.assign({ ref: y }, G.props, R, {
        className: _,
        "aria-sort": c,
        style: { ...T, ...L },
        "data-index-table-sticky-heading": !0,
      }),
      b
    ),
    ae = s
      ? i.createElement(
          "th",
          Object.assign({}, G.props, { "aria-sort": c }, R, {
            ref: y,
            className: _,
            scope: "col",
            style: { ...L },
          }),
          b
        )
      : i.createElement(
          "th",
          Object.assign({}, R, { ref: y, className: _, scope: "row", style: { ...L } }),
          n ? i.createElement(xe, { className: d.TooltipContent }, h) : h
        ),
    ie = s || t || e ? ae : i.createElement("td", Object.assign({ className: _ }, R), h);
  return S ? j : ie;
}
const xe = ({ children: h, className: r = "" }) => {
  const e = k.useRef(null),
    { current: t } = e,
    n = i.createElement("span", { ref: e, className: r }, h);
  return t?.scrollWidth > t?.offsetWidth
    ? i.createElement(oe, { content: e.current.innerText }, n)
    : n;
};
function _e({ children: h, onMount: r, fallback: e = null }) {
  const t = de(),
    n = t ? h : e;
  return (
    k.useEffect(() => {
      t && r && r();
    }, [t, r]),
    i.createElement(i.Fragment, null, n)
  );
}
function Re() {
  const h = k.useContext(ue);
  if (!h) throw new he("No StickyManager was provided.");
  return h;
}
class we extends k.Component {
  constructor(...r) {
    (super(...r),
      (this.state = { isSticky: !1, style: {} }),
      (this.placeHolderNode = null),
      (this.stickyNode = null),
      (this.setPlaceHolderNode = (e) => {
        this.placeHolderNode = e;
      }),
      (this.setStickyNode = (e) => {
        this.stickyNode = e;
      }),
      (this.handlePositioning = (e, t = 0, n = 0, s = 0) => {
        const { isSticky: l } = this.state;
        ((e && !l) || (!e && l)) &&
          (this.adjustPlaceHolderNode(e),
          this.setState({ isSticky: !l }, () => {
            if (
              this.props.onStickyChange == null ||
              (this.props.onStickyChange(!l), this.props.boundingElement == null)
            )
              return null;
            this.props.boundingElement.toggleAttribute("data-sticky-active");
          }));
        const o = e ? { position: "fixed", top: t, left: n, width: s } : {};
        this.setState({ style: o });
      }),
      (this.adjustPlaceHolderNode = (e) => {
        this.placeHolderNode &&
          this.stickyNode &&
          (this.placeHolderNode.style.paddingBottom = e
            ? `${fe(this.stickyNode).height}px`
            : "0px");
      }));
  }
  componentDidMount() {
    const {
      boundingElement: r,
      offset: e = !1,
      disableWhenStacked: t = !1,
      stickyManager: n,
    } = this.props;
    !this.stickyNode ||
      !this.placeHolderNode ||
      n.registerStickyItem({
        stickyNode: this.stickyNode,
        placeHolderNode: this.placeHolderNode,
        handlePositioning: this.handlePositioning,
        offset: e,
        boundingElement: r,
        disableWhenStacked: t,
      });
  }
  componentDidUpdate() {
    const {
      boundingElement: r,
      offset: e = !1,
      disableWhenStacked: t = !1,
      stickyManager: n,
    } = this.props;
    if (!this.stickyNode || !this.placeHolderNode) return;
    const s = n.getStickyItem(this.stickyNode);
    (!s || r !== s.boundingElement || e !== s.offset || t !== s.disableWhenStacked) &&
      (n.unregisterStickyItem(this.stickyNode),
      n.registerStickyItem({
        stickyNode: this.stickyNode,
        placeHolderNode: this.placeHolderNode,
        handlePositioning: this.handlePositioning,
        offset: e,
        boundingElement: r,
        disableWhenStacked: t,
      }));
  }
  componentWillUnmount() {
    const { stickyManager: r } = this.props;
    this.stickyNode && r.unregisterStickyItem(this.stickyNode);
  }
  render() {
    const { style: r, isSticky: e } = this.state,
      { children: t } = this.props,
      n = Ie(t) ? t(e) : t;
    return i.createElement(
      "div",
      null,
      i.createElement("div", { ref: this.setPlaceHolderNode }),
      i.createElement("div", { ref: this.setStickyNode, style: r }, n)
    );
  }
}
function Ie(h) {
  return typeof h == "function";
}
function Le(h) {
  const r = Re();
  return i.createElement(we, Object.assign({}, h, { stickyManager: r }));
}
function Me({
  columnVisibilityData: h,
  isScrolledFarthestLeft: r,
  isScrolledFarthestRight: e,
  navigateTableLeft: t,
  navigateTableRight: n,
  fixedFirstColumns: s,
  setRef: l = () => {},
}) {
  const o = J(),
    a = h.map((f, p) => {
      if (p < s) return;
      const m = E(d.Pip, f.isVisible && d["Pip-visible"]);
      return i.createElement("div", { className: m, key: `pip-${p}` });
    }),
    u = o.translate("Polaris.DataTable.navAccessibilityLabel", { direction: "left" }),
    c = o.translate("Polaris.DataTable.navAccessibilityLabel", { direction: "right" });
  return i.createElement(
    "div",
    { className: d.Navigation, ref: l },
    i.createElement(Q, {
      variant: "tertiary",
      icon: me,
      disabled: r,
      accessibilityLabel: u,
      onClick: t,
    }),
    a,
    i.createElement(Q, {
      variant: "tertiary",
      icon: pe,
      disabled: e,
      accessibilityLabel: c,
      onClick: n,
    })
  );
}
const se = (h) => {
  const r = [];
  return (
    h &&
      h.forEach((e) => {
        r.push(e.clientHeight);
      }),
    r
  );
};
class Ae extends k.PureComponent {
  constructor(...r) {
    (super(...r),
      (this.state = {
        condensed: !1,
        columnVisibilityData: [],
        isScrolledFarthestLeft: !0,
        isScrolledFarthestRight: !1,
        rowHovered: void 0,
      }),
      (this.dataTable = k.createRef()),
      (this.scrollContainer = k.createRef()),
      (this.table = k.createRef()),
      (this.stickyTable = k.createRef()),
      (this.stickyNav = null),
      (this.headerNav = null),
      (this.tableHeadings = []),
      (this.stickyHeadings = []),
      (this.tableHeadingWidths = []),
      (this.stickyHeaderActive = !1),
      (this.scrollStopTimer = null),
      (this.handleResize = ge(() => {
        const {
          table: { current: e },
          scrollContainer: { current: t },
        } = this;
        let n = !1;
        (e && t && (n = e.scrollWidth > t.clientWidth + 1),
          this.setState({ condensed: n, ...this.calculateColumnVisibilityData(n) }));
      })),
      (this.setCellRef = ({ ref: e, index: t, inStickyHeader: n }) => {
        if (e != null)
          if (n) {
            this.stickyHeadings[t] = e;
            const s = e.querySelector("button");
            if (s == null) return;
            s.addEventListener("focus", this.handleHeaderButtonFocus);
          } else ((this.tableHeadings[t] = e), (this.tableHeadingWidths[t] = e.clientWidth));
      }),
      (this.changeHeadingFocus = () => {
        const { tableHeadings: e, stickyHeadings: t, stickyNav: n, headerNav: s } = this,
          l = t.findIndex((m) => m === document.activeElement?.parentElement),
          o = e.findIndex((m) => m === document.activeElement?.parentElement),
          a = n?.querySelectorAll("button"),
          u = s?.querySelectorAll("button");
        let c = -1;
        a?.forEach((m, v) => {
          m === document.activeElement && (c = v);
        });
        let f = -1;
        if (
          (u?.forEach((m, v) => {
            m === document.activeElement && (f = v);
          }),
          l < 0 && o < 0 && c < 0 && f < 0)
        )
          return null;
        let p;
        if (
          (l >= 0
            ? (p = e[l].querySelector("button"))
            : o >= 0 && (p = t[o].querySelector("button")),
          c >= 0 ? (p = u?.[c]) : f >= 0 && (p = a?.[f]),
          p == null)
        )
          return null;
        ((p.style.visibility = "visible"), p.focus(), p.style.removeProperty("visibility"));
      }),
      (this.calculateColumnVisibilityData = (e) => {
        const t = this.fixedFirstColumns(),
          {
            table: { current: n },
            scrollContainer: { current: s },
            dataTable: { current: l },
          } = this,
          { stickyHeader: o } = this.props;
        if ((o || e) && n && s && l) {
          const a = n.querySelectorAll(G.selector),
            u = a[t - 1],
            c = t ? u.offsetLeft + u.offsetWidth : 0;
          if (a.length > 0) {
            const f = a.length - 1,
              p = s.scrollLeft + c,
              m = s.scrollLeft + l.offsetWidth,
              v = { firstVisibleColumnIndex: f, tableLeftVisibleEdge: p, tableRightVisibleEdge: m },
              C = [...a].map(Fe(v)),
              y = C[C.length - 1],
              S = t ? p === c : p === 0;
            return {
              columnVisibilityData: C,
              ...Pe(v, C),
              isScrolledFarthestLeft: S,
              isScrolledFarthestRight: y.rightEdge <= m,
            };
          }
        }
        return { columnVisibilityData: [], previousColumn: void 0, currentColumn: void 0 };
      }),
      (this.handleHeaderButtonFocus = (e) => {
        const t = this.fixedFirstColumns();
        if (
          this.scrollContainer.current == null ||
          e.target == null ||
          this.state.columnVisibilityData.length === 0
        )
          return;
        const s = e.target.parentNode,
          l = this.scrollContainer.current.scrollLeft,
          o = this.scrollContainer.current.offsetWidth,
          a = l + o,
          u =
            this.state.columnVisibilityData.length > 0
              ? this.state.columnVisibilityData[t]?.rightEdge
              : 0,
          c = s.offsetLeft,
          f = s.offsetLeft + s.offsetWidth;
        (l > c - u && (this.scrollContainer.current.scrollLeft = c - u),
          f > a && (this.scrollContainer.current.scrollLeft = f - o));
      }),
      (this.stickyHeaderScrolling = () => {
        const { current: e } = this.stickyTable,
          { current: t } = this.scrollContainer;
        e == null || t == null || (e.scrollLeft = t.scrollLeft);
      }),
      (this.scrollListener = () => {
        (this.scrollStopTimer && clearTimeout(this.scrollStopTimer),
          (this.scrollStopTimer = setTimeout(() => {
            this.setState((e) => ({ ...this.calculateColumnVisibilityData(e.condensed) }));
          }, 100)),
          this.setState({ isScrolledFarthestLeft: this.scrollContainer.current?.scrollLeft === 0 }),
          this.props.stickyHeader && this.stickyHeaderActive && this.stickyHeaderScrolling());
      }),
      (this.handleHover = (e) => () => {
        this.setState({ rowHovered: e });
      }),
      (this.handleFocus = (e) => {
        const t = this.fixedFirstColumns();
        if (this.scrollContainer.current == null || e.target == null) return;
        const n = e.target.parentNode,
          l = this.props ? this.state.columnVisibilityData[t]?.rightEdge : 0,
          a = n.offsetLeft - l;
        this.scrollContainer.current.scrollLeft > a &&
          (this.scrollContainer.current.scrollLeft = a);
      }),
      (this.navigateTable = (e) => {
        const t = this.fixedFirstColumns(),
          { currentColumn: n, previousColumn: s } = this.state,
          l = this.state.columnVisibilityData[t - 1]?.rightEdge;
        if (!n || !s) return;
        let o = 0;
        for (let c = 0; c < n.index; c++) o += this.state.columnVisibilityData[c].width;
        const { current: a } = this.scrollContainer;
        return () => {
          let c = 0;
          (t
            ? (c = e === "right" ? o - l + n.width : o - s.width - l)
            : (c = e === "right" ? n.rightEdge : s.leftEdge),
            a &&
              ((a.scrollLeft = c),
              requestAnimationFrame(() => {
                this.setState((f) => ({ ...this.calculateColumnVisibilityData(f.condensed) }));
              })));
        };
      }),
      (this.renderHeading = ({
        heading: e,
        headingIndex: t,
        inFixedNthColumn: n,
        inStickyHeader: s,
      }) => {
        const {
            sortable: l,
            truncate: o = !1,
            columnContentTypes: a,
            defaultSortDirection: u,
            initialSortColumnIndex: c = 0,
            verticalAlign: f,
            firstColumnMinWidth: p,
          } = this.props,
          m = this.fixedFirstColumns(),
          {
            sortDirection: v = u,
            sortedColumnIndex: C = c,
            isScrolledFarthestLeft: y,
          } = this.state;
        let S;
        const H = `heading-cell-${t}`,
          w = `stickyheader-${t}`,
          D = s ? w : H;
        if (l) {
          const T = l[t],
            x = T && C === t;
          S = {
            defaultSortDirection: u,
            sorted: x,
            sortable: T,
            sortDirection: x ? v : "none",
            onSort: this.defaultOnSort(t),
            fixedNthColumn: m,
            inFixedNthColumn: m,
          };
        }
        const P = s ? this.tableHeadingWidths[t] : void 0,
          I = !y,
          N = {
            header: !0,
            stickyHeadingCell: s,
            content: e,
            contentType: a[t],
            nthColumn: t < m,
            fixedFirstColumns: m,
            truncate: o,
            headingIndex: t,
            ...S,
            verticalAlign: f,
            handleFocus: this.handleFocus,
            stickyCellWidth: P,
            fixedCellVisible: I,
            firstColumnMinWidth: p,
          };
        return n && s
          ? [
              i.createElement(
                M,
                Object.assign({ key: D }, N, {
                  setRef: (T) => {
                    this.setCellRef({ ref: T, index: t, inStickyHeader: s });
                  },
                  inFixedNthColumn: !1,
                })
              ),
              i.createElement(
                M,
                Object.assign({ key: `${D}-sticky` }, N, {
                  setRef: (T) => {
                    this.setCellRef({ ref: T, index: t, inStickyHeader: s });
                  },
                  inFixedNthColumn: !!m,
                  lastFixedFirstColumn: t === m - 1,
                  style: { left: this.state.columnVisibilityData[t]?.leftEdge },
                })
              ),
            ]
          : i.createElement(
              M,
              Object.assign({ key: D }, N, {
                setRef: (T) => {
                  this.setCellRef({ ref: T, index: t, inStickyHeader: s });
                },
                lastFixedFirstColumn: t === m - 1,
                inFixedNthColumn: n,
              })
            );
      }),
      (this.totalsRowHeading = () => {
        const { i18n: e, totals: t, totalsName: n } = this.props,
          s = n || {
            singular: e.translate("Polaris.DataTable.totalRowHeading"),
            plural: e.translate("Polaris.DataTable.totalsRowHeading"),
          };
        return t && t.filter((l) => l !== "").length > 1 ? s.plural : s.singular;
      }),
      (this.renderTotals = ({ total: e, index: t }) => {
        const n = this.fixedFirstColumns(),
          s = `totals-cell-${t}`,
          { truncate: l = !1, verticalAlign: o, columnContentTypes: a } = this.props;
        let u, c;
        (t === 0 && (u = this.totalsRowHeading()), e !== "" && t > 0 && ((c = a[t]), (u = e)));
        const f = this.props.showTotalsInFooter;
        return i.createElement(M, {
          total: !0,
          totalInFooter: f,
          nthColumn: t <= n - 1,
          firstColumn: t === 0,
          key: s,
          content: u,
          contentType: c,
          truncate: l,
          verticalAlign: o,
        });
      }),
      (this.getColSpan = (e, t, n, s) => {
        if (this.fixedFirstColumns()) return 1;
        const o = e || 1,
          a = t || n,
          u = Math.floor(a / o),
          c = a % o;
        return s === 0 ? u + c : u;
      }),
      (this.defaultRenderRow = ({ row: e, index: t, inFixedNthColumn: n, rowHeights: s }) => {
        const {
            columnContentTypes: l,
            truncate: o = !1,
            verticalAlign: a,
            hoverable: u = !0,
            headings: c,
          } = this.props,
          { condensed: f } = this.state,
          p = this.fixedFirstColumns(),
          m = E(d.TableRow, u && d.hoverable);
        return i.createElement(
          "tr",
          {
            key: `row-${t}`,
            className: m,
            onMouseEnter: this.handleHover(t),
            onMouseLeave: this.handleHover(),
          },
          e.map((v, C) => {
            const y = t === this.state.rowHovered,
              S = `cell-${C}-row-${t}`,
              H = this.getColSpan(e.length, c.length, l.length, C);
            return i.createElement(M, {
              key: S,
              content: v,
              contentType: l[C],
              nthColumn: C <= p - 1,
              firstColumn: C === 0,
              truncate: o,
              verticalAlign: a,
              colSpan: H,
              hovered: y,
              style: s ? { height: `${s[t]}px` } : {},
              inFixedNthColumn: f && n,
            });
          })
        );
      }),
      (this.defaultOnSort = (e) => {
        const {
            onSort: t,
            defaultSortDirection: n = "ascending",
            initialSortColumnIndex: s,
          } = this.props,
          { sortDirection: l = n, sortedColumnIndex: o = s } = this.state;
        let a = n;
        return (
          o === e && (a = l === "ascending" ? "descending" : "ascending"),
          () => {
            this.setState({ sortDirection: a, sortedColumnIndex: e }, () => {
              t && t(e, a);
            });
          }
        );
      }));
  }
  componentDidMount() {
    this.handleResize();
  }
  componentDidUpdate(r) {
    De(r, this.props) || this.handleResize();
  }
  componentWillUnmount() {
    this.handleResize.cancel();
  }
  render() {
    const {
        headings: r,
        totals: e,
        showTotalsInFooter: t,
        rows: n,
        footerContent: s,
        hideScrollIndicator: l = !1,
        increasedTableDensity: o = !1,
        hasZebraStripingOnData: a = !1,
        stickyHeader: u = !1,
        hasFixedFirstColumn: c = !1,
        pagination: f,
      } = this.props,
      {
        condensed: p,
        columnVisibilityData: m,
        isScrolledFarthestLeft: v,
        isScrolledFarthestRight: C,
      } = this.state,
      y = this.fixedFirstColumns(),
      S = n.length % 2 === 0,
      H = E(
        d.DataTable,
        p && d.condensed,
        e && d.ShowTotals,
        t && d.ShowTotalsInFooter,
        a && d.ZebraStripingOnData,
        a && S && d.RowCountIsEven
      ),
      w = E(
        d.TableWrapper,
        p && d.condensed,
        o && d.IncreasedTableDensity,
        u && d.StickyHeaderEnabled
      ),
      D = i.createElement(
        "tr",
        null,
        r.map((g, b) =>
          this.renderHeading({
            heading: g,
            headingIndex: b,
            inFixedNthColumn: !1,
            inStickyHeader: !1,
          })
        )
      ),
      P = e
        ? i.createElement(
            "tr",
            null,
            e.map((g, b) => this.renderTotals({ total: g, index: b }))
          )
        : null,
      I = n.map((g) => g.slice(0, y)),
      N = r.slice(0, y),
      T = e?.slice(0, y),
      x = this.table.current?.children[0].childNodes,
      A = this.table.current?.children[1].childNodes,
      V = se(x),
      _ = se(A),
      B =
        p &&
        y !== 0 &&
        i.createElement(
          "table",
          {
            className: E(d.FixedFirstColumn, !v && d.separate),
            style: { width: `${m[y - 1]?.rightEdge}px` },
          },
          i.createElement(
            "thead",
            null,
            i.createElement(
              "tr",
              { style: { height: `${V[0]}px` } },
              N.map((g, b) =>
                this.renderHeading({
                  heading: g,
                  headingIndex: b,
                  inFixedNthColumn: !0,
                  inStickyHeader: !1,
                })
              )
            ),
            e &&
              !t &&
              i.createElement(
                "tr",
                { style: { height: `${V[1]}px` } },
                T?.map((g, b) => this.renderTotals({ total: g, index: b }))
              )
          ),
          i.createElement(
            "tbody",
            null,
            I.map((g, b) =>
              this.defaultRenderRow({ row: g, index: b, inFixedNthColumn: !0, rowHeights: _ })
            )
          ),
          e &&
            t &&
            i.createElement(
              "tfoot",
              null,
              i.createElement(
                "tr",
                null,
                T?.map((g, b) => this.renderTotals({ total: g, index: b }))
              )
            )
        ),
      $ = n.map((g, b) => this.defaultRenderRow({ row: g, index: b, inFixedNthColumn: !1 })),
      O = s ? i.createElement("div", { className: d.Footer }, s) : null,
      q = f ? i.createElement(be, Object.assign({ type: "table" }, f)) : null,
      z = t ? null : P,
      Z = t ? i.createElement("tfoot", null, P) : null,
      W = (g) =>
        l
          ? null
          : i.createElement(Me, {
              columnVisibilityData: m,
              isScrolledFarthestLeft: v,
              isScrolledFarthestRight: C,
              navigateTableLeft: this.navigateTable("left"),
              navigateTableRight: this.navigateTable("right"),
              fixedFirstColumns: y,
              setRef: (b) => {
                g === "header" ? (this.headerNav = b) : g === "sticky" && (this.stickyNav = b);
              },
            }),
      U = u
        ? i.createElement(
            _e,
            null,
            i.createElement(
              "div",
              { className: d.StickyHeaderWrapper, role: "presentation" },
              i.createElement(
                Le,
                {
                  boundingElement: this.dataTable.current,
                  onStickyChange: (g) => {
                    (this.changeHeadingFocus(), (this.stickyHeaderActive = g));
                  },
                },
                (g) => {
                  const b = E(d.StickyHeaderInner, g && d["StickyHeaderInner-isSticky"]),
                    R = E(d.StickyHeaderTable, !v && d.separate);
                  return i.createElement(
                    "div",
                    { className: b },
                    i.createElement("div", null, W("sticky")),
                    i.createElement(
                      "table",
                      { className: R, ref: this.stickyTable },
                      i.createElement(
                        "thead",
                        null,
                        i.createElement(
                          "tr",
                          { className: d.StickyTableHeadingsRow },
                          r.map((L, j) =>
                            this.renderHeading({
                              heading: L,
                              headingIndex: j,
                              inFixedNthColumn: !!(j <= y - 1 && y),
                              inStickyHeader: !0,
                            })
                          )
                        )
                      )
                    )
                  );
                }
              )
            )
          )
        : null;
    return i.createElement(
      "div",
      { className: w, ref: this.dataTable },
      U,
      W("header"),
      i.createElement(
        "div",
        { className: H },
        i.createElement(
          "div",
          { className: d.ScrollContainer, ref: this.scrollContainer },
          i.createElement(X, { event: "resize", handler: this.handleResize }),
          i.createElement(X, {
            capture: !0,
            passive: !0,
            event: "scroll",
            handler: this.scrollListener,
          }),
          B,
          i.createElement(
            "table",
            { className: d.Table, ref: this.table },
            i.createElement("thead", null, D, z),
            i.createElement("tbody", null, $),
            Z
          )
        ),
        q,
        O
      )
    );
  }
  fixedFirstColumns() {
    const { hasFixedFirstColumn: r, fixedFirstColumns: e = 0, headings: t } = this.props,
      n = r && !e ? 1 : e;
    return n >= t.length ? 0 : n;
  }
}
function Ve(h) {
  const r = J();
  return i.createElement(Ae, Object.assign({}, h, { i18n: r }));
}
function Be() {
  const { products: h } = Ee(),
    { host: r, apiKey: e } = ke(),
    t = h.map((s) => [s.title, s.handle, s.status, s.totalInventory?.toString() || "0"]),
    n = F.jsx(Ce, {
      title: "Products",
      backAction: { url: "/" },
      children: F.jsx(Y, {
        children: F.jsx(Y.Section, {
          children: F.jsxs(ye, {
            children: [
              F.jsx(ve, { as: "h2", variant: "headingMd", children: "Product List" }),
              F.jsx(Ve, {
                columnContentTypes: ["text", "text", "text", "numeric"],
                headings: ["Title", "Handle", "Status", "Inventory"],
                rows: t,
              }),
            ],
          }),
        }),
      }),
    });
  return r && e ? F.jsx(Se, { apiKey: e, host: r, children: n }) : n;
}
export { Be as default };
