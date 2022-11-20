import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

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
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('../views/LeaderboardView.vue')
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/characters/:id',
    name: 'character',
    component: () => import('../views/characters/CharacterView.vue')
  },
  {
    path: '/characters/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _from, next) => {
  /**
   * Checks if the route requires an authenticated user.
   */
  const denyIfAuthenticated = to.matched.some((record) => record.meta.denyIfAuthenticated)
  const { isAuthenticated } = storeToRefs(useAuthStore())

  // If the route requires an authenticated user and the user is not authenticated, redirect to home view
  if (isAuthenticated.value && denyIfAuthenticated) return next('/')

  return next()
})

export default router
