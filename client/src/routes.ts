import React from 'react'

export interface Route {
  name: string
  path: string
  component: React.ComponentType<any>
  unlisted?: boolean
}

export const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
    component: React.lazy(() => import('./pages/Home'))
  },
  {
    name: 'Posts',
    path: '/posts',
    component: React.lazy(() => import('./pages/Posts'))
  },
  {
    name: 'Post',
    path: '/posts/:postid',
    component: React.lazy(() => import('./pages/Post')),
    unlisted: true
  },
  {
    // TODO: add a button matching this route
    name: 'Sign Up',
    path: '/signup',
    component: React.lazy(() => import('./pages/SignUp'))
  },
  {
    name: '404',
    path: '*',
    component: React.lazy(() => import('./pages/NotFound')),
    unlisted: true
  }
]
