const sidebar = [
    {
        path: "/longshot/app/dashboard",
        icon: "material-symbols:dashboard",
        name: 'Dashboard'
    },
    {
        path: "/longshot/app/recipes",
        icon: "mdi:chef-hat",
        name: 'Recipes'
    },
    {
        path: "/longshot/app/blog",
        icon: "mdi:blog-outline",
        name: 'Blog',
        lineBreak: true
    },
    {
        path: "/longshot/app/templates",
        icon: "fa6-solid:puzzle-piece",
        name: 'Templates',
        routes: [
            {
                path: "/longshot/app/templates/favorites",
                icon: "material-symbols:favorite",
                name: "Favorites"
            },
            {
                path: "/longshot/app/templates/custom-template",
                icon: "carbon:dot-mark",
                name: "Custom Template"
            }
        ]
    },
    {
        path: "/longshot/app/Integration",
        icon: "ri:stack-fill",
        name: 'Integrations',
        routes: [
            {
                path: "/longshot/app/templates/favorites",
                name: "Favorites"
            }
        ]
    }
]

export default sidebar