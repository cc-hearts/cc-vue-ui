import { defaultNamespace } from '../configs/constants.js';

function useDerivedNamespace(ns) {
  return ns || defaultNamespace;
}
function useNamespace(block, overrideNamespace) {
  const ns = useDerivedNamespace(overrideNamespace);
  const cls = block ? `${ns}-${block}` : ns;
  const b = blockSuffix => {
    return blockSuffix ? `${cls}-${blockSuffix}` : cls;
  };
  const e = element => {
    return element ? `${cls}__${element}` : cls;
  };
  const m = modifier => {
    return modifier ? `${cls}--${modifier}` : cls;
  };
  const be = (blockSuffix, element) => {
    return blockSuffix && element && `${cls}-${blockSuffix}__${element}` || '';
  };
  const bm = (blockSuffix, modifier) => {
    return blockSuffix && modifier && `${cls}-${blockSuffix}--${modifier}` || '';
  };
  const em = (element, modifier) => {
    return element && modifier && `${cls}__${element}--${modifier}` || '';
  };
  const bem = (blockSuffix, element, modifier) => {
    return blockSuffix && element && modifier && `${cls}-${blockSuffix}__${element}--${modifier}` || '';
  };
  const genCssVar = target => {
    const styles = {};
    Object.keys(target).forEach(key => {
      if (target[key]) {
        styles[`--${cls}-${key}`] = target[key];
      }
    });
    return styles;
  };
  const getCssVar = key => `--${cls}-${key}`;
  return {
    cls,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    genCssVar,
    getCssVar
  };
}

export { useDerivedNamespace, useNamespace };
