import React,  { lazy, Suspense } from 'react';
import {Redirect} from 'react-router'
import Home from '../application/Home'
import Rank from '../application/Rank'



const SuspenseComponent = Component => props => {
    return (
      <Suspense fallback={null}>
        <Component {...props}></Component>
      </Suspense>
    )
}

const RecommendComponent = lazy(() => import("../application/Recommend/"));
const SingersComponent = lazy(() => import("../application/Singers/"));
const RankComponent = lazy(() => import("../application/Rank/"));
const AlbumComponent = lazy(() => import("../application/Album/"));
const SingerComponent = lazy(() => import("./../application/Singer/"));
const SearchComponent = lazy(() => import("./../application/Search/"));

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
                component: RecommendComponent,
                routes:[
                    {
                        path: "/recommend/:id",
                        component: AlbumComponent
                    }
                ]
            },
            {
                path: '/singers',
                component: SingersComponent,
                routes: [
                    {
                        path: '/singers/:id',
                        component: SingerComponent
                    }

                ]
            },
            {
                path: '/rank',
                component: Rank,
                routes: [
                    {
                        path: '/rank/:id',
                        component: AlbumComponent
                    }
                ]
            },
            {
                path: "/search",
                exact: true,
                key: "search",
                component: SearchComponent
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