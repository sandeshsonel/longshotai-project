import {lazy} from "react"

const Dashboard = lazy(() => import("pages/Dashboard"))
const Project = lazy(() => import("pages/ProjectPage"))
const Recipes = lazy(() => import("pages/Recipes"))
const Blog = lazy(() => import("pages/Blog"))
const FavoriteTemp = lazy(() => import("pages/TemplatesPage/Favorite"))
const CustomTemp = lazy(() => import("pages/TemplatesPage/CustomTemplate"))
const Semrush = lazy(() => import("pages/IntegrationPage/Semrush"))

const routes = [
    {
        path: "/project",
        component: Project
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/recipes",
        component: Recipes
    },
    {
        path: "/blog",
        component: Blog
    },
    {
        path: "/templates/favorites",
        component: FavoriteTemp
    },
    {
        path: "/templates/custom-template",
        component: CustomTemp
    },
    {
        path: "/integration/semrush",
        component: Semrush
    }
]

export default routes;