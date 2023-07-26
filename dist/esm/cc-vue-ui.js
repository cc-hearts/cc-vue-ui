import { defineComponent as f, reactive as b, computed as $, unref as u, openBlock as y, createElementBlock as _, normalizeClass as m, normalizeStyle as p, renderSlot as v } from "vue";
function g(e) {
  return typeof e == "function";
}
function C(e, r) {
  return Object.prototype.hasOwnProperty.call(e, r);
}
const h = (e) => {
  const { type: r } = e;
  return {
    type: r,
    validator: (n) => {
      var d;
      if (g(e.validator))
        return ((d = e.validator) == null ? void 0 : d.call(e, n)) || !1;
      const l = new Set(e.validateField || []);
      return C(e, "default") && l.add(e.default), l.has(n);
    },
    required: !!e.required,
    default: e.default
  };
}, O = (e) => Object.fromEntries(
  Object.entries(e).map(([r, a]) => [
    r,
    h(a)
  ])
), P = O({
  type: {
    type: String,
    validateField: ["primary", "dashed", "danger", "default", "flat"],
    default: "default"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  size: {
    type: String,
    validateField: ["mini", "small", "default"],
    default: "small"
  }
}), V = "cc";
function j(e) {
  return e || V;
}
function B(e, r) {
  const a = j(r), n = e ? `${a}-${e}` : a;
  return {
    cls: n,
    b: (t) => t ? `${n}-${t}` : n,
    e: (t) => t ? `${n}__${t}` : n,
    m: (t) => t ? `${n}--${t}` : n,
    be: (t, s) => t && s && `${n}-${t}__${s}` || "",
    bm: (t, s) => t && s && `${n}-${t}--${s}` || "",
    em: (t, s) => t && s && `${n}__${t}--${s}` || "",
    bem: (t, s, c) => t && s && c && `${n}-${t}__${s}--${c}` || "",
    genCssVar: (t) => {
      const s = {};
      return Object.keys(t).forEach((c) => {
        t[c] && (s[`--${n}-${c}`] = t[c]);
      }), s;
    },
    getCssVar: (t) => `--${n}-${t}`
  };
}
const F = ["disabled"], S = /* @__PURE__ */ f({
  __name: "button",
  props: P,
  setup(e) {
    const r = e, a = b({
      x: "0px",
      y: "0px"
    }), n = B("button"), l = $(() => {
      const o = {
        primary: "#65b787",
        "danger-color": "#fff",
        "active-danger-color": "#fff",
        "active-primary-color": "#fff",
        "flat-color": "#3ecd79a8",
        "primary-color": "#fff",
        "default-bgc": "transparent",
        "primary-bgc": "#65b787",
        "danger-bgc": "#ee8079",
        "default-border-color": "#ccc",
        ...u(a)
      };
      return n.genCssVar({
        color: "#333",
        ...o
      });
    }), d = (o) => {
      r.disabled || (a.x = o.offsetX + "px", a.y = o.offsetY + "px");
    };
    return (o, i) => (y(), _("button", {
      ref: "btn",
      class: m([u(n).cls, u(n).e(r.type)]),
      style: p(u(l)),
      onClick: d,
      disabled: o.disabled
    }, [
      v(o.$slots, "default")
    ], 14, F));
  }
});
export {
  S as CcButton
};
