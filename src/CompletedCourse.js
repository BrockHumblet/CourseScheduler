import React from "react";
import './App.css';
import { Row, Col } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionButton from "react-bootstrap/esm/AccordionHeader";
import Rating from "./Rating";

class CompletedCourse extends React.Component{
    
    getRequisites(){
        let requisites = "";
        let arrayLength = this.props.data.requisites.length;
    
    
        for(let i = 0; i < arrayLength; i++){
            let innerLength = this.props.data.requisites[i].length;
            requisites += "(";
            for(let n = 0; n < innerLength -1; n++){
            requisites += this.props.data.requisites[i][n] + " OR ";
            }
            requisites += this.props.data.requisites[i][innerLength -1] + ")";
            if(i !== arrayLength-1){
                requisites += " AND ";
            }
        }
    
        if(requisites === ""){
            return "None";
        }
        return requisites;
        }
    
        getKeywords(){
            let keywords = "";
            let length = this.props.data.keywords.length;
    
            for(let i = 0; i < length -1; i++){
                keywords += this.props.data.keywords[i] + ", ";
            }
            keywords += this.props.data.keywords[length -1];
    
            return keywords;
        }

    render() {
        if(!this.props.data)
            return null;
        return(
            <div>
                <AccordionItem className="accordionItem" eventKey={this.props.data.name}>
                    
                    <Row>
                        <AccordionButton className="accordionButtonCompleted">
                        <Col className="col-12" >
                        <Row>
                            <h5>{this.props.data.name} | ({this.props.data.credits} Credits)</h5>
                        </Row>
                        <Row >
                            <h6> Subject: {this.props.data.subject}</h6>
                        </Row>
                        <Row>
                            <h6>({this.props.data.number})</h6>
                        </Row>
                        </Col>
                        </AccordionButton>
                    </Row>
                    <AccordionBody className="accordionBody">
                        <Row className="row mb-3">
                            <Col className="col-1 mt-1">Rating:</Col> 
                            <Col className="col"><Rating number={this.props.number} ratings={this.props.ratings} updateRatings={this.props.updateRatings}/></Col>
                        </Row>
                        <p>{this.props.data.description}</p>
                        <p><strong>Requisites:</strong> {this.getRequisites()}</p>
                        <p><u>Keywords:</u> {this.getKeywords()}</p>
                    </AccordionBody>
                </AccordionItem>
            </div>
        )
    }
}

export default CompletedCourse