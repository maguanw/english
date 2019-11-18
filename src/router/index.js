import Vue from 'vue'
import Router from 'vue-router';

import Share from '@/components/share.vue'
import Book from '@/components/book.vue'
import Reading from '@/components/reading.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
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
            path: '/reading',
            name: 'Reading',
            component: Reading
        },
        {
            path: '*',
            redirect: '/share'
        }
    ]
});