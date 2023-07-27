import { isFn as n, hasOwn as r } from "@cc-heart/utils";
const s = (t) => {
  const { type: e } = t;
  return {
    type: e,
    validator: (d) => {
      var l;
      if (n(t.validator))
        return ((l = t.validator) == null ? void 0 : l.call(t, d)) || !1;
      const i = new Set(t.validateField || []);
      return r(t, "default") && i.add(t.default), i.has(d);
    },
    required: !!t.required,
    default: t.default
  };
}, f = (t) => Object.fromEntries(
  Object.entries(t).map(([e, a]) => [
    e,
    s(a)
  ])
);
export {
  s as buildProp,
  f as buildProps
};
