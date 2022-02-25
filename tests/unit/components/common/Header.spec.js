import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';
import Header from '@/common/components/Header';
import Home from '@/pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
  },
];

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(PortalVue);

const router = new VueRouter({
  routes,
});

describe('Component: Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header, {
      stubs: ['JdsIcon', 'JdsBadge', 'JdsPopover'],
      localVue,
      router,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('should render page title', () => {
    const title = wrapper.findComponent({ ref: 'header-title' });
    expect(title.exists()).toBe(true);
    /**
     * Check page name based on $route.name
     * in this test we mock '/' route with name of 'Dashboard'
     */
    expect(title.text()).toMatch(/dashboard/i);
  });

  test('should render notification icon', () => {
    const notification = wrapper.findComponent({ ref: 'header-notification' });
    expect(notification.exists()).toBe(true);
  });

  test('should render user menu', () => {
    const userMenu = wrapper.findComponent({ ref: 'header-user' });
    expect(userMenu.exists()).toBe(true);
  });

  test('should show modal when logout button clicked', async () => {
    const dropdownMenu = wrapper.findComponent({ ref: 'header-user-dropdown-menu' });
    const logoutButton = dropdownMenu.findComponent('button');

    await logoutButton.trigger('click');

    const modal = wrapper.findComponent({ ref: 'header-logout-modal' });

    expect(modal.exists()).toBe(true);
  });
});
