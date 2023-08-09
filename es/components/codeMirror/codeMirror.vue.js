import { defineComponent as k, ref as c, reactive as C, computed as V, watch as u, onMounted as j, openBlock as B, createElementBlock as R, createElementVNode as l, normalizeClass as S } from "vue";
import { basicSetup as g } from "../../node_modules/.pnpm/codemirror@6.0.1_@lezer_common@1.0.3/node_modules/codemirror/dist/index.js";
import { css as D } from "../../node_modules/.pnpm/@codemirror_lang-css@6.2.1_@codemirror_view@6.16.0/node_modules/@codemirror/lang-css/dist/index.js";
import { html as H } from "../../node_modules/.pnpm/@codemirror_lang-html@6.4.5/node_modules/@codemirror/lang-html/dist/index.js";
import { javascript as M } from "../../node_modules/.pnpm/@codemirror_lang-javascript@6.1.9/node_modules/@codemirror/lang-javascript/dist/index.js";
import { json as Z } from "../../node_modules/.pnpm/@codemirror_lang-json@6.0.1/node_modules/@codemirror/lang-json/dist/index.js";
import { oneDark as E } from "../../node_modules/.pnpm/@codemirror_theme-one-dark@6.1.2/node_modules/@codemirror/theme-one-dark/dist/index.js";
import { copy as A } from "../../node_modules/.pnpm/@cc-heart_utils-client@0.0.16/node_modules/@cc-heart/utils-client/dist/esm/index.js";
import { usePrefixCls as L } from "../../hooks/usePrefixCls.js";
import { EditorView as s } from "../../node_modules/.pnpm/@codemirror_view@6.16.0/node_modules/@codemirror/view/dist/index.js";
const T = { class: "code-mirror" }, z = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  viewBox: "0 0 256 256"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M216 34H88a6 6 0 0 0-6 6v42H40a6 6 0 0 0-6 6v128a6 6 0 0 0 6 6h128a6 6 0 0 0 6-6v-42h42a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6Zm-54 176H46V94h116Zm48-48h-36V88a6 6 0 0 0-6-6H94V46h116Z"
  })
], -1), N = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M18.9 8.1L9 18l-4.95-4.95l.71-.71L9 16.59l9.19-9.2l.71.71Z"
  })
], -1), P = [
  z,
  N
], Y = /* @__PURE__ */ k({
  __name: "codeMirror",
  props: {
    isReadonly: { type: Boolean, default: !1 },
    lang: { default: "javascript" },
    value: {},
    isDark: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(w, { expose: _, emit: y }) {
    const o = w, a = c(""), p = C({
      length: 0
    }), i = c(null), r = c(!1), x = () => {
      const e = v();
      r.value = !0, e && A(e), setTimeout(() => {
        r.value = !1;
      }, 1e3);
    };
    let t, n = () => M({
      typescript: !0,
      jsx: !0
    });
    switch (o.lang) {
      case "css":
        n = () => D();
        break;
      case "html":
        n = () => H();
        break;
      case "json":
        n = () => Z();
    }
    const d = L("code"), m = V(() => o.isDark);
    u(
      () => m.value,
      () => {
        f();
      }
    );
    function f() {
      t && t && t.destroy(), m.value ? t = new s({
        extensions: [
          g,
          n(),
          s.editable.of(!o.isReadonly),
          E,
          s.editorAttributes.of({ class: d })
        ],
        parent: i.value,
        doc: o.value || a.value,
        dispatch(e) {
          t.update([e]), a.value = t.state.doc.toString();
        }
      }) : t = new s({
        extensions: [
          g,
          n(),
          s.editable.of(!o.isReadonly),
          s.editorAttributes.of({ class: d })
        ],
        parent: i.value,
        doc: o.value || a.value,
        dispatch(e) {
          t.update([e]), p.length = e.state.doc.length, a.value = t.state.doc.toString();
        }
      });
    }
    j(() => {
      f();
    }), u(
      () => a.value,
      (e) => {
        a.value !== o.value && y("change", e);
      }
    ), u(
      () => o.value,
      (e) => {
        e && e !== a.value && (h(e), a.value = e);
      }
    );
    function b() {
      t.dispatch({ changes: [{ from: 0, to: p.length }] });
    }
    function v() {
      return t.viewState.state.doc.text.join(`
`);
    }
    function h(e) {
      t.dispatch({ changes: [{ from: 0, insert: e }] });
    }
    return _({
      clear: b,
      getValue: v,
      setValue: h
    }), (e, q) => (B(), R("div", T, [
      l("div", {
        ref_key: "codeRef",
        ref: i
      }, null, 512),
      l("button", {
        class: S(["copy-btn", [r.value ? "copy-btn-copied" : ""]]),
        onClick: x
      }, P, 2)
    ]));
  }
});
export {
  Y as default
};
