import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "../views/site/home_wrapper/Home";
import About from "../views/site/about_wrapper/about/About";
import Main from "../views/site/Site";
import Welcome from "../views/welcome/Welcome";
import About_wrapper from "../views/site/about_wrapper/About_wrapper";
import About2 from "../views/site/about_wrapper/about2/About2";
import Navigator_wrapper from "../views/site/navigator_wrapper/Navigator_wrapper";

const routes = [
    {
        path: '/site',
        name: 'Site',
        component: Main,
        children: [
            {
                path: '/site/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/site/about',
                name: 'About_wrapper',
                component: About_wrapper,
                children: [
                    {
                        path: '/site/about/about',
                        name: 'About',
                        component: About
                    },
                    {
                        path: '/site/about/about2',
                        name: 'About2',
                        component: About2
                    }]
            },
            {
                path: '/site/navigator/',
                name: 'Navigator',
                component: Navigator_wrapper,
                children: []
            }]
    },
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
