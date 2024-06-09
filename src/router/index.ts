import AdminLayout from '@/layouts/AdminLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import MoviesView from '@/views/admin/MoviesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        }
      ]
    },
    {
      path: '/login',
      component: LoginView,
      name: 'Login'
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Admin',
          component: AdminView
        },
        {
          path: 'movies',
          name: 'MoviesList',
          component: MoviesView,
          meta: {
            breadcrumb: 'Movies'
          },
          children: [
            {
              path: 'add',
              name: 'MoviesAdd',
              component: MoviesView,
              meta: {
                breadcrumb: 'Add movie'
              },
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.path === '/login' && isAuthenticated) {
    next('/admin')
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
