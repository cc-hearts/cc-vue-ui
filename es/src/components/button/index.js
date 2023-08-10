import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { defineComponent, reactive, computed, unref } from 'vue';
import { useNamespace } from '@/hooks';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';

// eslint-disable-next-line @typescript-eslint/ban-types
function isFn(val) {
    return typeof val === 'function';
}
function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

var buildProp = function buildProp(prop) {
  var type = prop.type;
  var _validator = function _validator(val) {
    if (isFn(prop.validator)) {
      var _prop$validator;
      return ((_prop$validator = prop.validator) === null || _prop$validator === void 0 ? void 0 : _prop$validator.call(prop, val)) || false;
    }
    var validateSet = new Set(prop.validateField || []);
    if (hasOwn(prop, 'default')) {
      validateSet.add(prop["default"]);
    }
    return validateSet.has(val);
  };
  return {
    type: type,
    validator: _validator,
    required: !!prop.required,
    "default": prop["default"]
  };
};
var buildProps = function buildProps(props) {
  return Object.fromEntries(Object.entries(props).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return [key, buildProp(value)];
  }));
};

var buttonProps = buildProps({
  type: {
    type: String,
    validateField: ['primary', 'dashed', 'danger', 'default', 'flat'],
    "default": 'default'
  },
  disabled: {
    type: Boolean,
    "default": false
  },
  size: {
    type: String,
    validateField: ['mini', 'small', 'default'],
    "default": 'small'
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Button = defineComponent({
  props: buttonProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var h = this.$createElement;
    var state = reactive({
      x: '0px',
      y: '0px'
    });
    var ns = useNamespace('button');
    var styles = computed(function () {
      // TODO: size
      var styles = _objectSpread({
        primary: '#65b787',
        'danger-color': '#fff',
        'active-danger-color': '#fff',
        'active-primary-color': '#fff',
        'flat-color': '#3ecd79a8',
        'primary-color': '#fff',
        'default-bgc': 'transparent',
        'primary-bgc': '#65b787',
        'danger-bgc': '#ee8079',
        'default-border-color': '#ccc'
      }, unref(state));
      return ns.genCssVar(_objectSpread({
        color: '#333'
      }, styles));
    });
    var handleClick = function handleClick(e) {
      if (props.disabled) return;
      state['x'] = e.offsetX + 'px';
      state['y'] = e.offsetY + 'px';
    };
    return function () {
      var _slots$default;
      return h("button", {
        "ref": "btn",
        "class": "".concat(ns.cls, " ").concat(ns.e(props.type)),
        "style": styles.value,
        "on": {
          "click": handleClick
        },
        "attrs": {
          "disabled": props.disabled
        }
      }, [(_slots$default = slots["default"]) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

var CcButton = Button;

export { CcButton };
