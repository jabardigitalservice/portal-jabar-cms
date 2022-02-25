import { mount } from '@vue/test-utils';
import BaseButton from '@/common/components/BaseButton';

describe('Component: BaseButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseButton, {
      slots: {
        default: 'My Button',
        'icon-left': '<i>icon-left</i>',
        'icon-right': '<i>icon-right</i>',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render button text', () => {
    const button = wrapper.findComponent({ ref: 'base-button' });

    expect(button.text()).toMatch(/my button/i);
  });

  test('should render left icon', () => {
    const button = wrapper.findComponent({ ref: 'base-button' });

    expect(button.html()).toContain('<i>icon-left</i>');
  });

  test('should render right icon', () => {
    const button = wrapper.findComponent({ ref: 'base-button' });

    expect(button.html()).toContain('<i>icon-right</i>');
  });
});
