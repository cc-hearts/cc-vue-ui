import { prefixCls } from '../configs/constants.js';

function usePrefixCls(cls) {
  if (cls === undefined) return prefixCls;
  return `${prefixCls}-${cls}`;
}

export { usePrefixCls };
  