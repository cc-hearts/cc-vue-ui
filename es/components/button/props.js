import { buildProps as e } from "../../utils/props.js";
const a = e({
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
});
export {
  a as buttonProps
};
