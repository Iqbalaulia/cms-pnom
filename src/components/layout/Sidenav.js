
// import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import icons from '../../composables/useIcon'
import logo from "assets/images/svg/logo-pnom.svg";
import { getDataFromLocalStorage } from "utils/function";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const userData = getDataFromLocalStorage('userData');
  const dataDashboard = [
    {
      id:'00',
      pages:'Dashboard',
      data: [
        {
          id:'0',
          icons: icons.iconDashboard,
          routerLink:'/dashboard',
          name:'Dashboard'
        }
      ]
    },
  ]
  const dataMenu = [
    {
      id:'11',
      pages:'Transactional',
      data:[
        {
          id:'1',
          icons: icons.iconProduct,
          routerLink:'/product',
          name:'Produk'
        },
        // {
        //   id:'2',
        //   icons: icons.iconTransaction,
        //   routerLink:'/transaction',
        //   name:'Transaksi'
        // },
        // {
        //   id:'3',
        //   icons: icons.iconOrder,
        //   routerLink:'/order',
        //   name:'Order'
        // },
        // {
        //   id:'4',
        //   icons: icons.iconCustomer,
        //   routerLink:'/customer',
        //   name:'Pelanggan'
        // },
      ]
    },
    {
      id:'22',
      pages:'Management',
      data:[
        {
          id:'1',
          icons: icons.iconAdminPanel,
          routerLink:'/admin',
          name:'Admin'
        },
        {
          id:'2',
          icons: icons.iconCalendarEvent,
          routerLink:'/event-banner',
          name:'Banner Acara'
        },
        {
          id:'3',
          icons: icons.iconBell,
          routerLink:'/notification',
          name:'Notifikasi'
        }
      ]
    },
    {
      id:'33',
      pages:'Pengaturan',
      data:[
        {
          id:'6',
          icons: icons.iconRtl,
          routerLink:'/pengaturan',
          name:'Setting'
        },
      ]
    }
  ]

  const hasPermission = (menuKey) => {
    return userData.role.permission[menuKey]
  }

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>PNOM Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {dataDashboard.map((item) => {
          return (
            <Menu.Item className="menu-item-header" key={item.id}>
              <label>{item.pages}</label>
              {
                item.data.map((itemSub) => {
                  return (
                    <Menu.Item key={itemSub.id}>
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
                  )
                })
              }
            </Menu.Item>
          )
        })}
      </Menu>
      <Menu theme="light" mode="inline">
        {dataMenu.map((item) => {
            const hasVisibleMenu = item.data.some((itemSub) => {
              const menuKey = itemSub.routerLink.replace("/", "");
              const hasPermissionMenu = hasPermission(menuKey)
              return hasPermissionMenu
            });          
            return (
              hasVisibleMenu && (
                <Menu.Item className="menu-item-header" key={item.id}>
                  <label>{item.pages}</label>
                  {
                    item.data.map((itemSub) => {

                      const menuKey = itemSub.routerLink.replace("/", "");
                      const hasPermissionMenu = hasPermission(menuKey)

                      return(
                        (hasPermissionMenu) &&
                        (
                          <Menu.Item key={itemSub.id}>
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
                        )
                      )
                    })
                  }
              </Menu.Item>
              )
            )
          })
        }
      </Menu>
    </>
  );

}

export default Sidenav;
