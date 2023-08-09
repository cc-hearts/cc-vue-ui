import { defineComponent as V, ref as s, reactive as k, watch as n, onMounted as S, createVNode as a } from "vue";
import { basicSetup as B } from "../../node_modules/.pnpm/codemirror@6.0.1_@lezer_common@1.0.3/node_modules/codemirror/dist/index.js";
import { css as H } from "../../node_modules/.pnpm/@codemirror_lang-css@6.2.1_@codemirror_view@6.16.0/node_modules/@codemirror/lang-css/dist/index.js";
import { html as M } from "../../node_modules/.pnpm/@codemirror_lang-html@6.4.5/node_modules/@codemirror/lang-html/dist/index.js";
import { javascript as v } from "../../node_modules/.pnpm/@codemirror_lang-javascript@6.1.9/node_modules/@codemirror/lang-javascript/dist/index.js";
import { json as Z } from "../../node_modules/.pnpm/@codemirror_lang-json@6.0.1/node_modules/@codemirror/lang-json/dist/index.js";
import { oneDark as L } from "../../node_modules/.pnpm/@codemirror_theme-one-dark@6.1.2/node_modules/@codemirror/theme-one-dark/dist/index.js";
import { copy as R } from "../../node_modules/.pnpm/@cc-heart_utils-client@0.0.16/node_modules/@cc-heart/utils-client/dist/esm/index.js";
import { usePrefixCls as T } from "../../hooks/usePrefixCls.js";
import { EditorView as c } from "../../node_modules/.pnpm/@codemirror_view@6.16.0/node_modules/@codemirror/view/dist/index.js";
const J = /* @__PURE__ */ V({
  props: {
    readonly: {
      type: Boolean,
      default: !1
    },
    lang: {
      type: String,
      default: "javascript",
      validator: (o) => ["javascript", "html", "css", "json"].includes(o)
    },
    value: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(o, {
    emit: p,
    expose: h
  }) {
    const g = T("code"), l = s(""), w = k({
      length: 0
    }), y = s(null), i = s(!1), b = () => {
      const e = f();
      i.value = !0, e && R(e), setTimeout(() => {
        i.value = !1;
      }, 1e3);
    };
    let t, r = () => v({
      typescript: !0,
      jsx: !0
    });
    function x(e) {
      switch (e) {
        case "css":
          r = () => H();
          break;
        case "html":
          r = () => M();
          break;
        case "json":
          r = () => Z();
          break;
        default:
          r = () => v();
      }
    }
    n(() => o.lang, (e) => x(e)), n(() => o.dark, (e) => u(e));
    function u(e) {
      t && t && t.destroy();
      const m = [B, r(), c.editable.of(!o.readonly), c.editorAttributes.of({
        class: g
      })];
      e && m.push(L), t = new c({
        extensions: m,
        parent: y.value,
        doc: o.value || l.value,
        dispatch(C) {
          t.update([C]), l.value = t.state.doc.toString();
        }
      });
    }
    S(() => {
      u();
    }), n(() => l.value, (e) => {
      l.value !== o.value && p("change", e);
    }), n(() => o.value, (e) => {
      e && e !== l.value && (d(e), l.value = e);
    });
    function j() {
      t.dispatch({
        changes: [{
          from: 0,
          to: w.length
        }]
      });
    }
    function f() {
      return t.viewState.state.doc.text.join(`
`);
    }
    function d(e) {
      t.dispatch({
        changes: [{
          from: 0,
          insert: e
        }]
      });
    }
    return h({
      clear: j,
      getValue: f,
      setValue: d
    }), () => a("div", {
      class: "code-mirror"
    }, [a("div", {
      ref: "codeRef"
    }, null), a("button", {
      class: i ? "copy-btn-copied" : " copy-btn",
      onClick: b
    }, [a("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 256 256"
    }, [a("path", {
      fill: "currentColor",
      d: "M216 34H88a6 6 0 0 0-6 6v42H40a6 6 0 0 0-6 6v128a6 6 0 0 0 6 6h128a6 6 0 0 0 6-6v-42h42a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6Zm-54 176H46V94h116Zm48-48h-36V88a6 6 0 0 0-6-6H94V46h116Z"
    }, null)]), a("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24"
    }, [a("path", {
      fill: "currentColor",
      d: "M18.9 8.1L9 18l-4.95-4.95l.71-.71L9 16.59l9.19-9.2l.71.71Z"
    }, null)])])]);
  }
});
export {
  J as default
};
