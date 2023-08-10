import { defineComponent, ref, reactive, watch, onMounted, createVNode } from 'vue';
import { basicSetup, EditorView } from 'codemirror';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { copy } from '@cc-heart/utils-client';
import { usePrefixCls } from '../../hooks/usePrefixCls.js';

var codeMirror = defineComponent({
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'javascript',
      validator: val => {
        return ['javascript', 'html', 'css', 'json'].includes(val);
      }
    },
    value: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {
    emit: emits,
    expose
  }) {
    const cls = usePrefixCls('code');
    const val = ref('');
    const state = reactive({
      length: 0
    });
    const codeRef = ref(null);
    const isCopyCodeState = ref(false);
    const copyCode = () => {
      const value = getValue();
      isCopyCodeState.value = true;
      value && copy(value);
      setTimeout(() => {
        isCopyCodeState.value = false;
      }, 1000);
    };
    let view;
    let lang = () => javascript({
      typescript: true,
      jsx: true
    });
    function changeLang(_lang) {
      switch (_lang) {
        case 'css':
          lang = () => css();
          break;
        case 'html':
          lang = () => html();
          break;
        case 'json':
          lang = () => json();
          break;
        default:
          lang = () => javascript();
      }
    }
    watch(() => props.lang, lang => changeLang(lang));
    watch(() => props.dark, isDark => updateTheme(isDark));
    function updateTheme(dark) {
      if (view) view && view.destroy();
      const extensions = [basicSetup, lang(), EditorView.editable.of(!props.readonly), EditorView.editorAttributes.of({
        class: cls
      })];
      if (dark) {
        extensions.push(oneDark);
      }
      view = new EditorView({
        extensions,
        parent: codeRef.value,
        doc: props.value || val.value,
        dispatch(tr) {
          view.update([tr]);
          val.value = view.state.doc.toString();
        }
      });
    }
    onMounted(() => {
      updateTheme();
    });
    watch(() => val.value, data => {
      if (val.value !== props.value) emits('change', data);
    });
    watch(() => props.value, data => {
      if (data) {
        if (data !== val.value) {
          setValue(data);
          val.value = data;
        }
      }
    });
    function clear() {
      view.dispatch({
        changes: [{
          from: 0,
          to: state.length
        }]
      });
    }
    function getValue() {
      return view.viewState.state.doc.text.join('\n');
    }
    function setValue(value) {
      view.dispatch({
        changes: [{
          from: 0,
          insert: value
        }]
      });
    }
    expose({
      clear,
      getValue,
      setValue
    });
    return () => createVNode("div", {
      "class": "code-mirror"
    }, [createVNode("div", {
      "ref": codeRef
    }, null), createVNode("button", {
      "class": (isCopyCodeState.value ? 'copy-btn-copied' : '') + ' copy-btn',
      "onClick": copyCode
    }, [createVNode("svg", {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "1em",
      "height": "1em",
      "viewBox": "0 0 256 256"
    }, [createVNode("path", {
      "fill": "currentColor",
      "d": "M216 34H88a6 6 0 0 0-6 6v42H40a6 6 0 0 0-6 6v128a6 6 0 0 0 6 6h128a6 6 0 0 0 6-6v-42h42a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6Zm-54 176H46V94h116Zm48-48h-36V88a6 6 0 0 0-6-6H94V46h116Z"
    }, null)]), createVNode("svg", {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "1em",
      "height": "1em",
      "viewBox": "0 0 24 24"
    }, [createVNode("path", {
      "fill": "currentColor",
      "d": "M18.9 8.1L9 18l-4.95-4.95l.71-.71L9 16.59l9.19-9.2l.71.71Z"
    }, null)])])]);
  }
});

export { codeMirror as default };
