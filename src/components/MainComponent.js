import React, { Component } from "react";
// import the presentational components to this container component where we do the logic
// and pass the data  through props to other components
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetail from "./DishdetailComponent";
// i was not able to download the older version of react-router-dom
// so i used Routes instead of Switch and Navigate instead of Redirect
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

// import this to connect to our redux store
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchPromos,
  fetchComments,
  fetchLeaders,
  postComment,
  postFeedback,
} from "../redux/ActionCreators";
// actions of forms reducers already exist in the react redux form
import { actions } from "react-redux-form";

// used for animation
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    // state is given by parameter
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

// method used to dispatch action to store, should be connected and used as a props
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    // dispatch will takes the action returned by postComment (from actiontypes) and pass it to be used
    // inside our component
    dispatch(postComment(dishId, rating, author, comment)),

  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  postFeedback: (feedback) => {
    dispatch(postFeedback(feedback));
  },
});

// i created this custom function because the withRouter is not supported anymore
const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }

  render() {
    // Creates our HomePage Comp
    const HomePage = () => {
      return (
        <Home
          // we used twice the dishes keyword because in the state we add
          // more properties in the dishesReducer
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errMsg}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMsg={this.props.leaders.errMsg}
        />
      );
    };

    // i didn't use match because it is no longer supported
    // i used useParams that gives us the value of the key we need
    const DishWithId = () => {
      // this returns the value of key dishId
      const { dishId } = useParams();
      return (
        // dishId the key presented in url
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMsg}
          comments={this.props.comments.comments.filter(
            (cmnt) => cmnt.dishId === parseInt(dishId, 10)
          )}
          commentsErrMsg={this.props.comments.errMsg}
          // use this in dishdetail to dispatch the action
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        {/* call header */}
        <Header />

        {/* animation component to specifies where to apply css transition */}
        <TransitionGroup>
          {/* i did not put a key because it doesnt work */}
          {/* key={this.props.location.key} */}
          <CSSTransition classNames="page" timeout={300}>
            {/* i used routes instead of Switch because it is not supported  */}
            {/* in the latest version */}
            <Routes location={this.props.location}>
              {/* route is the url we type and it land us to a specific component */}
              {/* i used element instead of component because component is not supported */}
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/menu"
                element={<Menu dishes={this.props.dishes} />}
              />
              <Route
                path="/contact-us"
                element={
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                }
              />
              <Route
                path="/about-us"
                element={
                  <About
                    leaders={this.props.leaders.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMsg={this.props.leaders.errMsg}
                  />
                }
              />
              <Route path="/menu/:dishId" element={<DishWithId />} />
              {/* any other urls will lead to home */}
              {/* i used this format because Redirect is not supported in the latest version */}
              {/* we put `*` that means any url but react js take the first match of Routes */}
              {/* so it will not reach this Route if there is a previous match for the url */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        {/* call footer */}
        <Footer />
      </div>
    );
  }
}

// we used the connect here with the function we created to connect the components with the store
// so now the values of the store behave like they are passed by props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
