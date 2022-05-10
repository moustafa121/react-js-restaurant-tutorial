import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

// func comp we pass the item as an object because the props is an object
function RenderCard({ item, isLoading, errMsg }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMsg) {
    // not loading but error
    return <h4>{errMsg}</h4>;
  } else {
    return (
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <CardGroup className="my-5">
        <RenderCard
          item={props.dish}
          isLoading={props.dishesLoading}
          errMsg={props.dishesErrMsg}
        />
        <RenderCard
          item={props.promotion}
          isLoading={props.promosLoading}
          errMsg={props.promosErrMsg}
        />
        <RenderCard
          item={props.leader}
          isLoading={props.leadersLoading}
          errMsg={props.leadersErrMsg}
        />
      </CardGroup>
    </div>
  );
}

export default Home;
