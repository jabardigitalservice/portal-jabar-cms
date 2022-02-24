import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';
import LoginForm from '@/components/Login/LoginForm';

describe('Login Form', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(PortalVue);
  const router = new VueRouter();

  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      localVue,
      router,
      stubs: ['JdsIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render email input', () => {
    const input = wrapper.findComponent({ ref: 'email-input' });

    expect(input.exists()).toBe(true);
  });

  test('should render password input', () => {
    const input = wrapper.findComponent({ ref: 'password-input' });

    expect(input.exists()).toBe(true);
  });

  test('should render forgot password link', () => {
    const link = wrapper.findComponent({ ref: 'forgot-password-link' });

    expect(link.exists()).toBe(true);
  });

  test('should render login button', () => {
    const button = wrapper.findComponent({ ref: 'login-button' });

    expect(button.exists()).toBe(true);
  });

  test('should render forgot password modal when `lupa kata sandi` button clicked', async () => {
    const button = wrapper.findComponent({ ref: 'forgot-password-link' });

    await button.trigger('click');

    const modal = wrapper.findComponent({ ref: 'forgot-password-modal' });

    expect(modal.exists()).toBe(true);
  });
});
