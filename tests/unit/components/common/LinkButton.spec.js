import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import LinkButton from '@/common/components/LinkButton';

describe('Component: LinkButton', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  let wrapper;

  beforeEach(() => {
    wrapper = mount(LinkButton, {
      localVue,
      router,
      propsData: {
        href: '/dummy-route',
        variant: 'primary',
        newTab: false,
      },
      slots: {
        default: 'My Link',
        'icon-left': '<i>icon-left</i>',
        'icon-right': '<i>icon-right</i>',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render button text', () => {
    const button = wrapper.findComponent({ ref: 'link-button' });

    expect(button.text()).toMatch(/my link/i);
  });

  test('should render left icon', () => {
    const button = wrapper.findComponent({ ref: 'link-button' });

    expect(button.html()).toContain('<i>icon-left</i>');
  });

  test('should render right icon', () => {
    const button = wrapper.findComponent({ ref: 'link-button' });

    expect(button.html()).toContain('<i>icon-right</i>');
  });

  test('should have correct `href` attribute', () => {
    const button = wrapper.findComponent({ ref: 'link-button' });

    expect(button.attributes('href')).toContain('/dummy-route');
  });

  test('should open link in new tab', async () => {
    // mutate `newData` props to `true`
    await wrapper.setData({ newTab: true });

    const button = wrapper.findComponent({ ref: 'link-button' });

    expect(button.attributes('target')).toBe('_blank');
  });
});
