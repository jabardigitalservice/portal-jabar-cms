import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';
import Login from '@/pages/Login';

describe('Login', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(PortalVue);
  const router = new VueRouter();

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      router,
      stubs: ['JdsIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render hero image', () => {
    const image = wrapper.findComponent({ name: 'Login' }).classes('bg-hero');

    expect(image).toBe(true);
  });

  test('should render navigation', () => {
    const navigation = wrapper.findComponent({ ref: 'navigation' });

    expect(navigation.exists()).toBe(true);
  });

  test('should render login form', () => {
    const form = wrapper.findComponent({ name: 'LoginForm' });

    expect(form.exists()).toBe(true);
  });

  test('should render portal jabar logo', () => {
    const logo = wrapper.findComponent({ ref: 'navigation-logo' });

    expect(logo.exists()).toBe(true);
  });

  test('should render link to portal jabar website', () => {
    const logo = wrapper.findComponent({ ref: 'navigation-link' });
    const url = process.env.VUE_APP_PORTAL_JABAR_URL;

    expect(logo.attributes('href')).toBe(url);
  });
});
