/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
  Card,
  CardImg,
  //   CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

// componentDidMount() {
//   console.log("DishDetail did mount is invoked");
// }
// componentDidUpdate() {
//   console.log("DishDetail did update is invoked");
// }

// these methods will help us for form validation with redux
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    //Bindings
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  // when we click submit button
  handleComment(values) {
    // i cloned the values object for the specific case when i did not touch the rating select
    // so i tried to edit values to add rating default value but it can't be modified
    let customizedValues = { ...values };
    if (values.rating == null) {
      customizedValues["rating"] = 1;
    }
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      customizedValues.rating,
      customizedValues.author,
      customizedValues.comment
    );
  }

  render() {
    return (
      <div className="row my-3">
        <Col>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-solid fa-pencil"></span> Submit Comment
          </Button>
        </Col>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group my-3">
                <Label htmlFor="rating">Rating</Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group my-3">
                <Label htmlFor="author">Author</Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Author Name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters ",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group my-3">
                <Label htmlFor="comment">Comment</Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    id="comment"
                    name="comment"
                    placeholder="comment"
                    rows="6"
                  />
                </Col>
              </Row>

              <Row className="form-group my-3">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// render dish to create card component gets dish as props
function RenderDish({ dish }) {
  if (dish == null) {
    return <div></div>;
  }
  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

// create comment details
function RenderComments({ comments, postComment, dishId }) {
  if (comments == null) {
    return <div></div>;
  }
  const cmnts = comments.map((cmnt) => {
    return (
      <div key={cmnt.id}>
        <div className="row">{cmnt.comment}</div>
        <div className="row">
          -- {cmnt.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(cmnt.date)))}
        </div>
      </div>
    );
  });
  return (
    <>
      {cmnts}
      <CommentForm postComment={postComment} dishId={dishId} />
    </>
  );
}

function DishDetail(props) {
  if (props.isLoading) {
    // if dishes are loading
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMsg) {
    // not loading but error
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMsg}</h4>
        </div>
      </div>
    );
  }

  const dish = props.dish;
  if (dish == null) {
    return <div></div>;
  }
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={"/menu"}>Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name} Details</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <div>
            <h4>Comments</h4>
          </div>
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={dish.id}
          />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
