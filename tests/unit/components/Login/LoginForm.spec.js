import { mount } from '@vue/test-utils';
import LoginForm from '@/components/Login/LoginForm';

describe('Login Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      stubs: ['router-link', 'JdsIcon'],
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
});
