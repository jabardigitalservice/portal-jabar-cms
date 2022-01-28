import { mount } from '@vue/test-utils';
import { NAVIGATION_MENU } from '@/common/constants';
import Sidebar from '@/common/components/Sidebar';

describe('Component: Sidebar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      stubs: ['router-link', 'JdsIcon'],
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render sidebar title and logo', () => {
    const title = wrapper.findComponent({ ref: 'sidebar-title' });
    const logos = title.findAll('img');

    expect(title.text()).toMatch(/content management/i);
    expect(logos.exists()).toBeTruthy();
  });

  test('should render navigation', () => {
    const navigation = wrapper.findComponent({ ref: 'sidebar-navigation' });

    expect(navigation.exists()).toBeTruthy();

    const navigationMenu = [...NAVIGATION_MENU];

    navigationMenu.forEach(({ label }) => {
      // Test whether component render all link correctly
      expect(navigation.text()).toContain(label);
    });
  });

  test('should render `Pengaturan Akun` menu', () => {
    const settingMenu = wrapper.findComponent({ ref: 'sidebar-bottom-nav' });

    expect(settingMenu.exists()).toBeTruthy();
    expect(settingMenu.text()).toMatch(/pengaturan akun/i);
  });
});
