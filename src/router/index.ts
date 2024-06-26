import AdminLayout from '@/layouts/AdminLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import MovieFormView from '@/views/admin/MovieFormView.vue'
import MovieShowView from '@/views/admin/MovieShowView.vue'
import MoviesView from '@/views/admin/MoviesView.vue'
import TimeslotFormView from '@/views/admin/TimeslotFormView.vue'
import TimeslotShowView from '@/views/admin/TimeslotShowView.vue'
import TimeslotsView from '@/views/admin/TimeslotsView.vue'
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
          meta: {
            breadcrumb: 'Movies'
          },
          children: [
            {
              path: '',
              name: 'MoviesList',
              component: MoviesView,
              meta: {
                breadcrumb: 'List'
              },
            },
            {
              path: ':id',
              name: 'MoviesShow',
              component: MovieShowView,
              meta: {
                breadcrumb: 'Movie'
              },
            },
            {
              path: 'add',
              name: 'MoviesAdd',
              component: MovieFormView,
              meta: {
                breadcrumb: 'Add movie'
              },
            },
            {
              path: ':id/edit',
              name: 'MoviesEdit',
              component: MovieFormView,
              meta: {
                breadcrumb: 'Edit movie'
              },
            }
          ]
        },
        {
          path: 'timeslots',
          meta: {
            breadcrumb: 'Timeslots'
          },
          children: [
            {
              path: '',
              name: 'TimeslotsList',
              component: TimeslotsView,
              meta: {
                breadcrumb: 'List'
              },
            },
            {
              path: ':id',
              name: 'TimeslotShow',
              component: TimeslotShowView,
              meta: {
                breadcrumb: 'Timeslot'
              },
            },
            {
              path: 'add',
              name: 'TimeslotAdd',
              component: TimeslotFormView,
              meta: {
                breadcrumb: 'Add timeslots'
              },
            },
            {
              path: ':id/edit',
              name: 'TimeslotsEdit',
              component: TimeslotFormView,
              meta: {
                breadcrumb: 'Edit timeslots'
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
