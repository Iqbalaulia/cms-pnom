import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import icons from "../../composables/useIcon";
import logo from "assets/images/svg/logo-pnom.svg";
import { getDataFromLocalStorage } from "utils/function";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const userData = getDataFromLocalStorage("userData");
  const dataDashboard = [
    {
      id: "00",
      pages: "Dashboard",
      data: [
        {
          id: "0",
          icons: icons.iconDashboard,
          routerLink: "/dashboard",
          name: "Dashboard",
        },
      ],
    },
  ];
  const dataMenu = [
    {
      id: "11",
      pages: "Transactional",
      data: [
        {
          id: "1",
          icons: icons.iconProduct,
          routerLink: "/product",
          name: "product",
        },
        // {
        //   id:'2',
        //   icons: icons.iconTransaction,
        //   routerLink:'/transaction',
        //   name:'transaction'
        // },
        // {
        //   id:'3',
        //   icons: icons.iconOrder,
        //   routerLink:'/order',
        //   name:'order'
        // },
        // {
        //   id:'4',
        //   icons: icons.iconCustomer,
        //   routerLink:'/customer',
        //   name:'Pelanggan'
        // },
      ],
    },
    {
      id: "22",
      pages: "Management",
      data: [
        {
          id: "1",
          icons: icons.iconAdminPanel,
          routerLink: "/admin",
          name: "admin",
        },
        {
          id: "2",
          icons: icons.iconCalendarEvent,
          routerLink: "/banner",
          name: "banner",
        },
        {
          id: "3",
          icons: icons.iconBell,
          routerLink: "/notification",
          name: "notification",
        },
      ],
    },
    {
      id: "33",
      pages: "Setting",
      data: [
        {
          id: "6",
          icons: icons.iconRtl,
          routerLink: "/setting",
          name: "master_setting",
        },
      ],
    },
  ];

  const hasPermission = (menuKey) => {
    return userData.role.permission[menuKey];
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>PNOM Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {dataDashboard.map((item, indexDashboard) => {
          return (
            <Menu.Item className="menu-item-header" key={indexDashboard}>
              <label>{item.pages}</label>
              {item.data.map((itemSub, indexSub) => {
                return (
                  <Menu.Item key={indexSub}>
                    <NavLink to={itemSub.routerLink}>
                      <span
                        className="icon"
                        style={{
                          background: page === itemSub.name ? color : "",
                        }}
                      >
                        {itemSub.icons}
                      </span>
                      <span className="label">{itemSub.name}</span>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu.Item>
          );
        })}
      </Menu>
      <Menu theme="light" mode="inline">
        {dataMenu.map((item, indexMenu) => {
          const hasVisibleMenu = item.data.some((itemSub) => {
            const menuKey = itemSub.name.replace("/", "");
            const hasPermissionMenu = hasPermission(menuKey);
            return hasPermissionMenu;
          });
          return (
            hasVisibleMenu && (
              <Menu.Item className="menu-item-header" key={indexMenu}>
                <label>{item.pages}</label>
                {item.data.map((itemSub, indexSubMenu) => {
                  const menuKey = itemSub.name.replace("/", "");
                  const hasPermissionMenu = hasPermission(menuKey);

                  return (
                    hasPermissionMenu && (
                      <Menu.Item key={indexSubMenu}>
                        <NavLink to={itemSub.routerLink}>
                          <span
                            className="icon"
                            style={{
                              background: page === itemSub.name ? color : "",
                            }}
                          >
                            {itemSub.icons}
                          </span>
                          <span className="label">
                            {itemSub.name.replace(/_/g, " ")}
                          </span>
                        </NavLink>
                      </Menu.Item>
                    )
                  );
                })}
              </Menu.Item>
            )
          );
        })}
      </Menu>
    </>
  );
}

export default Sidenav;
