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
    name: '404',
    path: '*',
    component: React.lazy(() => import('./pages/NotFound')),
    unlisted: true
  }
]
