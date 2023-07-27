import { defineComponent as n, reactive as l, computed as s, unref as d, createVNode as i } from "vue";
import { useNamespace as p } from "../../hooks/useNamespace.js";
import { buttonProps as u } from "./props.js";
import "./button.css";
const x = /* @__PURE__ */ n({
  props: u,
  setup(r, {
    slots: t
  }) {
    const o = l({
      x: "0px",
      y: "0px"
    }), a = p("button"), c = s(() => {
      const e = {
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
        ...d(o)
      };
      return a.genCssVar({
        color: "#333",
        ...e
      });
    }), f = (e) => {
      r.disabled || (o.x = e.offsetX + "px", o.y = e.offsetY + "px");
    };
    return () => {
      var e;
      return i("button", {
        ref: "btn",
        class: `${a.cls} ${a.e(r.type)}`,
        style: c.value,
        onClick: f,
        disabled: r.disabled
      }, [(e = t.default) == null ? void 0 : e.call(t)]);
    };
  }
});
export {
  x as default
};
