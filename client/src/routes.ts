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
    component: React.lazy(() => import('./pages/posts/Posts'))
  },
  {
    name: 'Post',
    path: '/posts/:postid',
    component: React.lazy(() => import('./pages/posts/Post')),
    unlisted: true
  },
  {
    name: 'Users',
    path: '/users',
    component: React.lazy(() => import('./pages/users/Users'))
  },
  {
    name: 'User',
    path: '/users/:userid',
    component: React.lazy(() => import('./pages/users/User')),
    unlisted: true
  },
  {
    // TODO: add a button matching this route
    name: 'SignUp',
    path: '/signup',
    component: React.lazy(() => import('./pages/SignUp')),
    unlisted: true
  },
  {
    name: '404',
    path: '*',
    component: React.lazy(() => import('./pages/NotFound')),
    unlisted: true
  }
]
