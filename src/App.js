import { Switch, Route } from "react-router-dom";
// import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/template/Home";
import Tables from "./components/template/Tables";
import Billing from "./components/template/Billing";
import Rtl from "./components/template/Rtl";
import SignUp from "./components/template/SignUp";
import SignIn from "./components/template/SignIn";
import Main from "./components/layout/Main";

// Management
import ManagementAdmin from './pages/management/admin/pages/Admin'
import ManagementEventBanner from './pages/management/eventBanner/pages/EventBanner'

// Setting
import Setting from './pages/setting/pages/Setting'

// Transaction
import TransactionCustomer from './pages/transaction/customer/pages/Customer'
import TransactionProduct from './pages/transaction/product/pages/Product'
import TransactionData from './pages/transaction/transaction/pages/Transaction'

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import './assets/styles/override.css';
import './assets/styles/loading.css';

function App() {

  const settingMenu = [
    {
      routerLink:'/dashboard',
      component: Home
    },
    {
      routerLink:'/admin',
      component: ManagementAdmin
    },
    {
      routerLink:'/event-banner',
      component: ManagementEventBanner
    },
    {
      routerLink:'/pengaturan',
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
      routerLink:'/transaction',
      component: TransactionData
    }
  ]

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
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
          {/* <Redirect from="*" to="/sign-in" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
