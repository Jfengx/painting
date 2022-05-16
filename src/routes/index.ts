import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Gallery from '../views/Gallery.vue';

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/gallery', component: () => Gallery, meta: { title: 'Gallery' } },
  { path: '/world', component: () => import('../views/World.vue'), meta: { title: 'World' } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
