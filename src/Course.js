import React from 'react';
import { Accordion, AccordionButton, Col, Row } from 'react-bootstrap';
import './App.css';
import Section from './Section'
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';


class Course extends React.Component {
  getSections() {
    let sections = [];


    for(const section of Object.values(this.props.data.sections)) {
      if(!section.number)
        return null;
      sections.push (
        <Section key={section.number+this.props.data.name} data={section} cart={this.addSection} cartMode={this.props.cartMode} cartData={this.props.cartData} courseName={this.props.data.name} updateData={this.props.updateData} allData={this.props.allData} courseData={this.props.data} completedCourses={this.props.completedCourses}/>
      )
    }

    if(sections.length !== 0){
			return (
				<AccordionItem className="accordionItem sectionItems" eventKey={this.props.data.name+this.props.data.sections}>
					<AccordionHeader className="accordionButton"><h5>Sections</h5></AccordionHeader>
					<AccordionBody className="sectionBody">{<div className="innerBody">{sections}</div>}</AccordionBody>
        </AccordionItem>
			)
		}

    return sections;
  }

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

  addSection = (section) =>{
    let course = JSON.parse(JSON.stringify(this.props.data));
    course.sections = [section];
    console.log(course);
    this.props.cart(course);
  }

  addToCart(){
    if(this.props.data.requisites !== ""){
      for(let i = 0; i < this.props.data.requisites.length; i++){
        let met = false;
        for(let n = 0; n < this.props.data.requisites[i].length; n++){
          if(this.props.completedCourses.indexOf(this.props.data.requisites[i][n]) !== -1)
            met = true;
        }
        if(!met){
          window.alert("Requisites not met for " + this.props.data.name + " (" + this.props.data.number + ")");
        }
      }
    }
    this.props.cart(this.props.data);
  }

  removeCourse(){
    let cartData = JSON.parse(JSON.stringify(this.props.cartData))
    for(let i = 0; i < cartData.length; i++){
			if(cartData[i].name === this.props.data.name){
				cartData.splice(i,1);
			}
		}
		this.props.updateData(cartData);
	}

  getButton(){
    if(this.props.cartMode === false)
      return( <button className="btn btn-primary button" id={this.props.data.number} onClick={() => this.addToCart()}>Add Course</button>)
    else
      return( <button className="btn btn-primary button" onClick={() => this.removeCourse()}>Remove Course</button>)
  } 

  render() {
    return (
      
      <AccordionItem className="accordionItem" eventKey={this.props.data.name}>
        <AccordionButton className="accordionButton">
          <Row>
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
            <Col className="col">
              {this.getButton()}
            </Col>
          </Row>
        </AccordionButton>
        <AccordionBody className="accordionBody">
          <p>{this.props.data.description}</p>
          <p><strong>Requisites:</strong> {this.getRequisites()}</p>
          <p><u>Keywords:</u> {this.getKeywords()}</p>
          <Accordion>{this.getSections()}</Accordion>
          <br/>
        </AccordionBody>
      </AccordionItem>
    )
  }
}

export default Course;
