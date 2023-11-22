
// import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import icons from '../../composables/useIcon'
import logo from "assets/images/svg/logo-pnom.svg";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const dataMenu = [
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
        {
          id:'2',
          icons: icons.iconTransaction,
          routerLink:'/transaction',
          name:'Transaksi'
        },
        {
          id:'3',
          icons: icons.iconOrder,
          routerLink:'/order',
          name:'Order'
        },
        {
          id:'4',
          icons: icons.iconCustomer,
          routerLink:'/customer',
          name:'Pelanggan'
        },
      ]
    },
    {
      id:'22',
      pages:'Management',
      data:[
        {
          id:'4',
          icons: icons.iconAdminPanel,
          routerLink:'/admin',
          name:'Admin'
        },
        {
          id:'5',
          icons: icons.iconCalendarEvent,
          routerLink:'/event-banner',
          name:'Banner Acara'
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

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>PNOM Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {dataMenu.map((item) => {
            return (
              <Menu.Item className="menu-item-header" key={item.id}>
                <label>{item.pages}</label>
                  {
                    item.data.map((itemSub) => {
                      return(
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
          })
        }
      </Menu>
    </>
  );

}

export default Sidenav;
