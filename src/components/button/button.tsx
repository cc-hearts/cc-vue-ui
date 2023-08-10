import { defineComponent, computed, reactive, unref } from 'vue'
import { useNamespace } from '@/hooks'
import { buttonProps } from './props'
export default defineComponent({
  props: buttonProps,
  setup(props, { slots }) {
    const state = reactive({
      x: '0px',
      y: '0px',
    })
    const ns = useNamespace('button')
    const styles = computed(() => {
      // TODO: size
      const styles = {
        primary: '#65b787',
        'danger-color': '#fff',
        'active-danger-color': '#fff',
        'active-primary-color': '#fff',
        'flat-color': '#3ecd79a8',
        'primary-color': '#fff',
        'default-bgc': 'transparent',
        'primary-bgc': '#65b787',
        'danger-bgc': '#ee8079',
        'default-border-color': '#ccc',
        ...unref(state),
      }

      return ns.genCssVar({
        color: '#333',
        ...styles,
      })
    })

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return
      state['x'] = e.offsetX + 'px'
      state['y'] = e.offsetY + 'px'
    }

    return () => (
      <button
        ref="btn"
        class={`${ns.cls} ${ns.e(props.type)}`}
        style={styles.value}
        onClick={handleClick}
        disabled={props.disabled}
      >
        {slots.default?.()}
      </button>
    )
  },
})
