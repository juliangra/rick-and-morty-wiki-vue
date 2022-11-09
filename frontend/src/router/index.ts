import useIsAuthenticated from '@/hooks/auth/useIsAuthenticated';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      denyIfAuthenticated: true
    },
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      denyIfAuthenticated: true
    },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('../views/LeaderboardView.vue')
  },
  {
    path: '/characters/:id',
    name: 'character',
    component: () => import('../views/characters/CharacterView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, _from, next) => {
  const denyIfAuthenticated = to.matched.some((record) => record.meta.denyIfAuthenticated)
  const authenticated = useIsAuthenticated()

  if (authenticated && denyIfAuthenticated) return next('/')

  return next()
})

export default router
