const ROUTES = [
  {
    name: "General",
    to: null,
    children: [
      {
        name: "Dashboard",
        to: "/dashboard",
        children: null
      },
      {
        name: "Customers",
        to: "/dashboard/customers",
        children: null
      },
    ]
  },
  {
    name: "Administration",
    to: null,
    children: [
      {
        name: "Team Settings",
        to: "/dashboard/admin/team-settings",
        children: null
      },
      {
        name: "Manage Your Team",
        to: "/dashboard/admin/team-management",
        children: [
          {
            name: "Members",
            to: "/dashboard/admin/team-management/members",
            children: null
          },
          {
            name: "Plugins",
            to: "/dashboard/admin/team-management/pugins",
            children: null
          },
          {
            name: "Add a member",
            to: "/dashboard/admin/team-management/add-member",
            children: null
          },
        ]
      },
    ]
  }
]

export const CURRENT_DOMAIN = "http://localhost:3000/"

export default ROUTES;
