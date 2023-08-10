import { buildProps } from '../../utils/props.js';

const buttonProps = buildProps({
  type: {
    type: String,
    validateField: ['primary', 'dashed', 'danger', 'default', 'flat'],
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    validateField: ['mini', 'small', 'default'],
    default: 'small'
  }
});

export { buttonProps };
