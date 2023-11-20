import React, { lazy, Suspense } from 'react';
/// Components
import Index from "./jsx";
import { connect } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Login from "./components/Login";
import { getNotificationsAction } from './store/actions/AuthActions';

/// Style
// import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}



function App({ isAuthenticated, user , getNotificationsAction }) {
  const interval = React.useRef()
  React.useEffect(() => {

    if (user && user.id && !interval.current) {
      const id = user.user_type_id == 1 ? 0 : user.id
      interval.current = setInterval(() => reCallGetNotifications(id),10000)
      reCallGetNotifications(id)
    }
  }, [user])

  const reCallGetNotifications = (userId) => {
    getNotificationsAction(userId)
  }
  let routeblog = (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );
  if (isAuthenticated) {
    return (
      <>
        <Suspense fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
        >
          <Index />
        </Suspense>
      </>
    );

  } else {
    return (
      <div className="vh-100">
        <Suspense fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
        >
          {routeblog}
        </Suspense>
      </div>
    );
  }
};

const mapDispatchToProps = {
  getNotificationsAction
}

const mapStateToProps = (state) => {
  const { user } = state.authData
  return {
    user: user,
    isAuthenticated: Boolean(user),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); 