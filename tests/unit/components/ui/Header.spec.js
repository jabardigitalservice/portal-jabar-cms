import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

// import JdsPopover from '@jabardigitalservice/jds-design-system';
import Header from '@/components/ui/Header.vue';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: HomePage,
  },
];

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter({
  routes,
});

describe('Component: Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header, {
      stubs: ['router-link', 'JdsIcon', 'JdsBadge', 'JdsPopover'],
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
});
