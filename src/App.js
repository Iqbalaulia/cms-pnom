import { Switch, Route, Redirect } from "react-router-dom";

// import Home from "./components/template/Home";
import Tables from "./components/template/Tables";
import Billing from "./components/template/Billing";
import Rtl from "./components/template/Rtl";
import SignUp from "./components/template/SignUp";
import SignIn from "./components/template/SignIn";
import Main from "./components/layout/Main";

// Dashboard
import Dashboard from './pages/dashboard/pages/Dashboard';

// Management
import ManagementAdmin from './pages/management/admin/pages/Admin'
import ManagementEventBanner from './pages/management/eventBanner/pages/EventBanner'
import ManagementNotification from './pages/management/notification/pages/Notification'

// Setting
import Setting from './pages/setting/pages/Setting'

// Transaction
import TransactionProduct from './pages/transaction/product/pages/Product'
import TransactionCreate from './pages/transaction/product/pages/action/ProductAction'
import TransactionCustomer from './pages/transaction/customer/pages/Customer'
// import TransactionData from './pages/transaction/transaction/pages/Transaction'
import TransactionOrder from './pages/transaction/order/pages/Order'

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import './assets/styles/override.css';
import './assets/styles/loading.css';
import './assets/styles/table.css';
import './assets/styles/button.css';

import './assets/styles/pages/login.css';
import './assets/styles/pages/admin.css';

import { getDataFromLocalStorage } from "utils/function";


function App() {

  const settingMenu = [
    {
      routerLink:'/dashboard',
      component: Dashboard
    },
    {
      routerLink:'/admin',
      component: ManagementAdmin
    },
    {
      routerLink:'/banner',
      component: ManagementEventBanner
    },
    {
      routerLink: '/notification',
      component: ManagementNotification
    },
    {
      routerLink:'/master_setting',
      component: Setting
    },
    {
      routerLink:'/customer',
      component: TransactionCustomer
    },
    {
      routerLink:'/product',
      component: TransactionProduct
    },
    {
      routerLink:'/product/create',
      component: TransactionCreate
    },
    // {
    //   routerLink:'/transaction',
    //   component: TransactionData
    // },
    {
      routerLink:'/order',
      component: TransactionOrder
    }
  ]
  const userData = getDataFromLocalStorage('userData')

  const menuData = (
        <Main>
              <Route exact path="/tables" component={Tables} />
              <Route exact path="/billing" component={Billing} />
              <Route exact path="/rtl" component={Rtl} />
                {
                  settingMenu.map((item, indexMenu) => {
                    return(
                      <Route key={indexMenu} exact path={item.routerLink} component={item.component} />
                    )
                  })
                }
          </Main>
  )

  const redirectMenu = (
    <Redirect from="*" to="/sign-in" />
  )

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
          {
            userData ? (menuData) :  (redirectMenu)
          } 
      </Switch>
    </div>
  );
}

export default App;
