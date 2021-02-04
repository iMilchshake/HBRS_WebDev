import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "../views/site/home_wrapper/Home";
import About from "../views/site/about_wrapper/about/About";
import Welcome from "../views/welcome/Welcome";
import About_wrapper from "../views/site/about_wrapper/About_wrapper";
import About2 from "../views/site/about_wrapper/about2/About2";
import Navigator_wrapper from "../views/site/navigator_wrapper/Navigator_wrapper";
import Site from "../views/site/Site";
import NotFound from "../views/NotFound/NotFound";
import a1 from "../views/site/navigator_wrapper/u9/a1";
import a2 from "../views/site/navigator_wrapper/u9/a2";

const routes = [
    {
        path: '/site',
        name: 'Site',
        component: Site,
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
        path: '/solutions/u9/a1',
        name: 'u9/a1',
        component: a1
    },
    {
        path: '/solutions/u9/a2',
        name: 'u9/a2',
        component: a2
    },
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: "/:catchAll(.*)",
        name: 'NotFoundError',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
