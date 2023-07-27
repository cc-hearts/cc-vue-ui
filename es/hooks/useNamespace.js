import { defaultNamespace as u } from "../configs/constants.js";
function a(t) {
  return t || u;
}
function j(t, c) {
  const e = a(c), $ = t ? `${e}-${t}` : e;
  return {
    cls: $,
    b: (s) => s ? `${$}-${s}` : $,
    e: (s) => s ? `${$}__${s}` : $,
    m: (s) => s ? `${$}--${s}` : $,
    be: (s, n) => s && n && `${$}-${s}__${n}` || "",
    bm: (s, n) => s && n && `${$}-${s}--${n}` || "",
    em: (s, n) => s && n && `${$}__${s}--${n}` || "",
    bem: (s, n, r) => s && n && r && `${$}-${s}__${n}--${r}` || "",
    genCssVar: (s) => {
      const n = {};
      return Object.keys(s).forEach((r) => {
        s[r] && (n[`--${$}-${r}`] = s[r]);
      }), n;
    },
    getCssVar: (s) => `--${$}-${s}`
  };
}
export {
  a as useDerivedNamespace,
  j as useNamespace
};
