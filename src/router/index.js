import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom'

const Dashboard = lazy(_ => import("@p/dashboard"));
const BlogType = lazy(_ => import("@p/blogtype"));
const BannerData = lazy(_ => import("@p/bannerdata"));
const AddBlog = lazy(_ => import("@p/addblog"));
const EditBlog = lazy(_ => import("@p/editblog"));
const Userinfo = lazy(_ => import("@p/userinfo"));
const Menu = lazy(_ => import("@p/menu"));
const Website = lazy(_ => import("@p/website"));
// const SkeletonComp = lazy(_ => import("@c/skeleton"))

export const router = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/Dashboard" />
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/blogType',
    component: BlogType
  },
  {
    path: '/bannerData',
    component: BannerData
  },
  {
    path: '/addBlog',
    component: AddBlog
  },
  {
    path: '/editBlog',
    component: EditBlog
  },
  {
    path: '/website',
    component: Website
  },{
    path: '/menu',
    component: Menu
  },
  {
    path: '/user',
    component: Userinfo
  }
]
