type Route = {
  name: string;
  to: string | null;
  children: Route[] | null;
}

const ROUTES: Route[] = [
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
        to: "/dashboard/team-settings",
        children: null
      },
      {
        name: "Manage Your Team",
        to: "/dashboard/team-management",
        children: [
          {
            name: "Members",
            to: "/dashboard/team-management/members",
            children: null
          },
          {
            name: "Plugins",
            to: "/dashboard/team-management/pugins",
            children: null
          },
          {
            name: "Add a member",
            to: "/dashboard/team-management/add-member",
            children: null
          },
        ]
      },
    ]
  }
]

export default ROUTES;
