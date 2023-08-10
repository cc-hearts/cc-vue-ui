import { isFn, hasOwn } from '/Users/heart/Desktop/npm/@cc-heart/cc-vue-ui/node_modules/.pnpm/@cc-heart+utils@3.1.0/node_modules/@cc-heart/utils/index.ts';

const buildProp = prop => {
  const {
    type
  } = prop;
  const _validator = val => {
    if (isFn(prop.validator)) {
      return prop.validator?.(val) || false;
    }
    const validateSet = new Set(prop.validateField || []);
    if (hasOwn(prop, 'default')) {
      validateSet.add(prop.default);
    }
    return validateSet.has(val);
  };
  return {
    type: type,
    validator: _validator,
    required: !!prop.required,
    default: prop.default
  };
};
const buildProps = props => {
  return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, buildProp(value)]));
};

export { buildProp, buildProps };
