import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TLoading from '../loading';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import ripple from '../utils/ripple';

const name = `${prefix}-button`;

export default Vue.extend({
  name: 'TButton',
  props,
  directives: { ripple },
  render(): VNode {
    let buttonContent = renderContent(this, 'default', 'content');
    const icon = this.loading ? <TLoading inheritColor={true} /> : renderTNodeJSX(this, 'icon');
    const disabled = this.disabled || this.loading;
    let { theme } = this;

    if (!this.theme) {
      if (this.variant === 'base') {
        theme = 'primary';
      } else {
        theme = 'default';
      }
    }

    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--variant-${this.variant}`,
      `${name}--theme-${theme}`,
      {
        [CLASSNAMES.STATUS.disabled]: disabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--shape-${this.shape}`]: this.shape !== 'rectangle',
        [`${name}--ghost`]: this.ghost,
        [CLASSNAMES.SIZE.block]: this.block,
      },
    ];

    buttonContent = buttonContent ? <span class={`${name}__text`}>{buttonContent}</span> : '';
    if (icon) {
      buttonContent = [icon, buttonContent];
    }

    return (
      <button v-ripple class={buttonClass} type={this.type} disabled={disabled} {...{ on: this.$listeners }}>
        {buttonContent}
      </button>
    );
  },
});
