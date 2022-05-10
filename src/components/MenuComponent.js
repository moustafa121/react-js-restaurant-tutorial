// no need to import {component} here
import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

// instead of using classes and render methods and constructor etc...
// we can use functional components instead to obtain well organized code
// func comp starts with capital
// dish and onclick were written as an object because props is an object
function RenderMenuItem({ dish }) {
  return (
    <Card>
      {/* passing parameters through link by using `` */}
      <Link to={`/menu/${dish.id}`}>
        {/* the src with baseurl will fetch first the image from server */}
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}
// this is the main functional component that will be used in MainComponent file
// props are passed as attributes within the other file
const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    // for each element in dishes we create a react element array
    return (
      //   key is required, to recognize each element for updating component
      <div key={dish.id} className="col-12 col-md-5 m-1">
        {/* use the onClick function passed by props */}
        {/* pass the parameter of RenderMenuItem (functional component) as props */}
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (props.dishes.isLoading) {
    // if dishes are loading
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMsg) {
    // not loading but error
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMsg}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={"/home"}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row">{menu}</div>
      </div>
    );
};

// required to import this component from another file
export default Menu;
