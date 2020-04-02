import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,CardImgOverlay } from 'reactstrap';
    import { 
        Button, Row, Col, Label } from 'reactstrap';
    import { Control, LocalForm} from 'react-redux-form';
    import {Modal,ModalBody,ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    handleSubmit(values)
    {
     this.toggleModal();
      alert('json oject is '+JSON.stringify(values));
      console.log(values.author)
      this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
    }
    render()
    {
        return(
            <div>
            <Button outline onClick={this.toggleModal}> FEEDBACK </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>COMMENT HERE</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>AUTHOR</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="authors"
                                        placeholder="saikiran"
                                        className="form-control"
                                         />
                                </Col>
                            
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>RATING</Label>
                                <Col md={10}>
                                    <Control.text model=".rating" id="rating" name="rating"
                                        placeholder="5"
                                        className="form-control"
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>COMMENT</Label>
                                <Col md={10}>
                                    <Control.text model=".comment" id="comment" name="comment"
                                        placeholder=""
                                        className="form-control"
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
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


function RenderDish({dish}) {
    
    return (
        <Card>
    
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
           
        </Card>
    );

  }

  function RenderComments({comments, addComment, dishId}) {
    const c= comments.map((item)=>{
        return(
        <div>
            <h6>{item.comment}</h6>
            <p>{item.author}</p>
        </div>)});
        if(comments.length!=0)
    return (
        <>
        {c}
        <CommentForm dishId={dishId} addComment={addComment} />
        </>
    );
    else{
        return(<div><CommentForm dishId={dishId} addComment={addComment} /></div>)
    };
    
  }

  const DishDetail = (props)=>{
       return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
            </div>
        </div>
        </div>
    )
            }
export default DishDetail;
