import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import BlankLayout from "../layouts/BlankLayout";

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
const LoginComponent = lazy(() => import('./../application/Login/'));
const LoginPhoneComponent  = lazy(() => import("./../application/Login/loginMode/phone.js"));
const LoginEmailComponent  = lazy(() => import("./../application/Login/loginMode/email.js"));
const LoginQrComponent  = lazy(() => import("./../application/Login/loginMode/qr.js"));
const ResigterComponent = lazy(() => import("./../application/Resigter/"))
const UserinfoComponent = lazy(() => import("../application/Userinfo/"))


export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: () => <Redirect to={"/recommend"} />
          },
          {
            path: "/recommend",
            component: SuspenseComponent(RecommendComponent),
            routes: [
              {
                path: "/recommend/:id",
                component: SuspenseComponent(AlbumComponent)
              }
            ]
          },
          {
            path: "/singers",
            component: SuspenseComponent(SingersComponent),
            key: "singers",
            routes: [
              {
                path: "/singers/:id",
                component: SuspenseComponent(SingerComponent)
              }
            ]
          },
          {
            path: "/rank/",
            component: SuspenseComponent(RankComponent),
            key: "rank",
            routes: [
              {
                path: "/rank/:id",
                component: SuspenseComponent(AlbumComponent)
              }
            ]
          },
          {
            path: "/album/:id",
            exact: true,
            key: "album",
            component: SuspenseComponent(AlbumComponent)
          },
          {
            path: "/search",
            exact: true,
            key: "search",
            component: SuspenseComponent(SearchComponent)
          },
          {
            path: '/login/',
            key: 'login',
            component: SuspenseComponent(LoginComponent),
            routes: [
              {
                path: '/login/phone',
                component: SuspenseComponent(LoginPhoneComponent)
              },
              {
                path: '/login/email',
                component: SuspenseComponent(LoginEmailComponent)
              },
              {
                path: '/login/qr',
                component: SuspenseComponent(LoginQrComponent)
              }
            ]
          },
          {
            path: '/resigter',
            exact: true,
            key: 'resigter',
            component: SuspenseComponent(ResigterComponent),
          }, 
          {
            path: '/userinfo',
            exact: true,
            key: 'userinfo',
            component: SuspenseComponent(UserinfoComponent)
          }
        ]
      },
      
    ]
  }
];
