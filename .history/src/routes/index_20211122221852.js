import React,  { lazy, Suspense } from 'react';
import {Redirect} from 'react-router'
import Home from '../application/Home'
import Rank from '../application/Rank'
import Recommend from '../application/Recommend'
import Singers from '../application/Singers'
import Album from '../application/Album'
import Singer from '../application/Singer/index'
import Search from '../application/Search/index'


const SuspenseComponent = Component => props => {
    return (
      <Suspense fallback={null}>
        <Component {...props}></Component>
      </Suspense>
    )
  }

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => {
                    <Redirect to={"/recommend"}></Redirect>
                }
            },
            {
                path: '/recommend',
                component: Recommend,
                routes:[
                    {
                        path: "/recommend/:id",
                        component: Album
                    }
                ]
            },
            {
                path: '/singers',
                component: Singers,
                routes: [
                    {
                        path: '/singers/:id',
                        component: Singer
                    }

                ]
            },
            {
                path: '/rank',
                component: Rank,
                routes: [
                    {
                        path: '/rank/:id',
                        component: Album
                    }
                ]
            },
            {
                path: "/search",
                exact: true,
                key: "search",
                component: Search
            },
            {
                 path: "/album/:id",
                exact: true,
                key: "album",
                component: Album
            }
        ]

    }
]