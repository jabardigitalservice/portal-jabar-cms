import { mount /* createLocalVue */ } from '@vue/test-utils';
import BaseModal from '@/components/ui/BaseModal.vue';

describe('Component: Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseModal, {
      stubs: ['portal', 'JdsButton'],
      propsData: {
        open: false,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should not render modal when `open` props is false', () => {
    const modal = wrapper.findComponent({ ref: 'modal' });

    expect(modal.exists()).not.toBe(true);
  });

  test('should render modal when `open` props is true', async () => {
    await wrapper.setProps({ open: true });

    const modalOverlay = wrapper.findComponent({ ref: 'modal-overlay' });
    const modalBody = wrapper.findComponent({ ref: 'modal-body' });
    const modalFooter = wrapper.findComponent({ ref: 'modal-footer' });

    expect(modalOverlay.exists()).toBe(true);
    expect(modalBody.exists()).toBe(true);
    expect(modalFooter.exists()).toBe(true);
  });
});
