import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import EcommerceDash from './dashboards/EcommerceDash';
import Layout from './layout/Layout';
import Alerts from './ui-components/ui-elements/Alerts';
import Accordions from './ui-components/ui-elements/Accordions';
import Avatar from './ui-components/ui-elements/Avatar';
import Badges from './ui-components/ui-elements/Badges';
import Buttons from './ui-components/ui-elements/Buttons';
import Cards from './ui-components/ui-elements/Cards';
import Carousels from './ui-components/ui-elements/Carousels';
import Dropdowns from './ui-components/ui-elements/Dropdowns';
import ListGroups from './ui-components/ui-elements/ListGroups';
import Modals from './ui-components/ui-elements/Modals';
import ProgressBars from './ui-components/ui-elements/ProgressBars';
import Spinners from './ui-components/ui-elements/Spinners';
import BasicInputs from './ui-components/forms/BasicInputs';
import InputGroups from './ui-components/forms/InputGroups';
import InputLayouts from './ui-components/forms/InputLayouts';
import FloatingLabels from './ui-components/forms/FloatingLabels';
import FormValidation from './ui-components/forms/FormValidation';
import BasicTables from './ui-components/tables/BasicTables';
import BootstrapIcons from './ui-components/icons/BootstrapIcons';
import RemixIcons from './ui-components/icons/RemixIcons';
import DataTable from './ui-components/tables/DataTable';
import SaasDash from './dashboards/SaasDash';
import Rechart from './rechart/Rechart';
import Apexchart from './apexchart/Apexchart';
import Events from './dashboards/Events';
import Management from './dashboards/Management';
import Chat from './chat/Chat';
import Calender from './calender/Calender';
import Email from './email/Email';
import Products from './e-commerce/Products';
import ProductDetails from './e-commerce/ProductDetails';
import OrderList from './e-commerce/OrderList';
import CheckOut from './e-commerce/CheckOut';
import Invoice from './e-commerce/Invoice';
import EventList from './event-details/EventList';
import EventDetails from './event-details/EventDetails';
import Starter from './pages/Starter';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Verification from './auth/Verification';
import Error404 from './error/Error404';
import Error500 from './error/Error500';
import Widgets from './ui-components/widgets/Widgets';

const ScrollToTop = () => {
  // Scroll to top on route change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Back to top button
const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when scrolling past 10px
      if (window.scrollY > 10) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <Button variant="soft-primary" onClick={scrollToTop} className="avatar avatar-sm p-0 blur position-fixed bottom-0 end-0 me-3 mb-5"><i className="ri-arrow-up-fill"></i></Button>
      )}
    </>
  );
};

export default function AppRoute() {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<EcommerceDash />} />
              <Route path="dash-saas" element={<SaasDash />} />
              <Route path="dash-event" element={<Events />} />
              <Route path="dash-management" element={<Management />} />

              {/* Apps Routes */}
              <Route path="apps/chat" element={<Chat />} />
              <Route path="apps/calender" element={<Calender />} />
              <Route path="apps/email" element={<Email />} />

              {/* E-commerce Routes */}
              <Route path="ecommerce/product" element={<Products />} />
              <Route path="ecommerce/product_details" element={<ProductDetails />} />
              <Route path="ecommerce/product_details/:id" element={<ProductDetails />} />
              <Route path="ecommerce/order_list" element={<OrderList />} />
              <Route path="ecommerce/checkout" element={<CheckOut />} />
              <Route path="ecommerce/invoice" element={<Invoice />} />

              {/* Event Routes */}
              <Route path="event/event_list" element={<EventList />} />
              {/* Dynamic details route to open a specific event */}
              <Route path="event/event_details/:id" element={<EventDetails />} />
              {/* Fallback without id (optional) */}
              <Route path="event/event_details" element={<EventDetails />} />

              {/* Pages Routes */}
              <Route path="pages/stater" element={<Starter />} />
              <Route path="pages/pricing" element={<Pricing />} />
              <Route path="pages/gallery" element={<Gallery />} />

              {/* Components Routes */}
              <Route path="elements/accordions" element={<Accordions />} />
              <Route path="elements/avatars" element={<Avatar />} />
              <Route path="elements/alerts" element={<Alerts />} />
              <Route path="elements/badges" element={<Badges />} />
              <Route path="elements/buttons" element={<Buttons />} />
              <Route path="elements/cards" element={<Cards />} />
              <Route path="elements/carousels" element={<Carousels />} />
              <Route path="elements/dropdowns" element={<Dropdowns />} />
              <Route path="elements/list_groups" element={<ListGroups />} />
              <Route path="elements/modals" element={<Modals />} />
              <Route path="elements/progress_bars" element={<ProgressBars />} />
              <Route path="elements/spinners" element={<Spinners />} />

              {/* Charts */}
              <Route path='charts/recharts' element={<Rechart />} />
              <Route path='charts/apexcharts' element={<Apexchart />} />

              {/* Forms */}
              <Route path="forms/basic_inputs" element={<BasicInputs />} />
              <Route path="forms/input_groups" element={<InputGroups />} />
              <Route path="forms/layouts" element={<InputLayouts />} />
              <Route path="forms/floating_labels" element={<FloatingLabels />} />
              <Route path="forms/form_validation" element={<FormValidation />} />

              {/* Tables */}
              <Route path="tables/basic_tables" element={<BasicTables />} />
              <Route path="tables/data_tables" element={<DataTable />} />

              {/* Widgets */}
              <Route path="widgets" element={<Widgets />} />

              {/* Icons */}
              <Route path="icons/bootstrap_icons" element={<BootstrapIcons />} />
              <Route path="icons/remix_icons" element={<RemixIcons />} />
            </Route>

            {/* Auth Routes */}
            <Route path="auth/sign_in" element={<SignIn />} />
            <Route path="auth/sign_up" element={<SignUp />} />
            <Route path="auth/forgot_password" element={<ForgotPassword />} />
            <Route path="auth/verification" element={<Verification />} />
            <Route path="auth/reset_password" element={<ResetPassword />} />

            {/* Error Routes */}
            <Route path="error/error_404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
            <Route path="error/error_500" element={<Error500 />} />
          </Routes>
        </Router>

        {/* Button Scroll to top */}
        <BackToTopButton />
      </div>
    </>
  )
}
