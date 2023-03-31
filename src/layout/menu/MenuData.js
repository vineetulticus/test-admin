const menu = [
  {
    icon: "dashlite",
    text: "Default Dashboard",
    link: "/",
  },
  {
    icon: "bitcoin-cash",
    text: "Crypto Dashboard",
    link: "/crypto",
  },

  {
    icon: "table-view",
    text: "Modules",
    active: false,
    subMenu: [
      {
        text: "Admin Management",
        link: "/userList",
      },
      // {
      //   text: "Table One",
      //   link: "/table-basic",
      // },
      // {
      //   text: "Table Two",
      //   link: "/crud",
      // },
      // {
      //   text: "Table Three",
      //   link: "/list",
      // },
      // {
      //   text: "Table Four",
      //   link: "/crudList",
      // },
    ],
  },
];
export default menu;
