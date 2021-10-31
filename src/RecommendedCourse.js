import React from "react";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { Row, Col } from "react-bootstrap";
import { AccordionButton } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

class RecommendedCourse extends React.Component{

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

    render(){
        return(
            <div>
                <AccordionItem className="accordionItem" eventKey={this.props.data.name}>
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
                    <AccordionBody className="accordionBody">
                        <p>{this.props.data.description}</p>
                        <p><strong>Requisites:</strong> {this.getRequisites()}</p>
                        <p><u>Keywords:</u> {this.getKeywords()}</p>
                    </AccordionBody>
                </AccordionItem>
            </div>
        )
    }

}

export default RecommendedCourse