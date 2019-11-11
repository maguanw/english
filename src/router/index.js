import Vue from 'vue'
import Router from 'vue-router';

import Share from '../components/share.vue'
import Book from '../components/book.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'Share'}
        },
        {
            path: '/book',
            name: 'Book',
            component: Book
        },
        {
            path: '/share',
            name: 'Share',
            component: Share
        },
        {
            path: '*',
            redirect: '/share'
        }
    ]
});