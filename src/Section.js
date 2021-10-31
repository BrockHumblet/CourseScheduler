import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import './App.css'
import Subsection from './Subsection.js'

class Section extends React.Component {
	getSubSections() {
		let subsections = [];
	
		for(const subsection of Object.values(this.props.data.subsections)) {
			
			subsections.push (
			<Subsection key={subsection.number+this.props.courseName+this.props.data.number} data={subsection} cart={this.addSubSection} cartMode = {this.props.cartMode} cartData={this.props.cartData} courseName={this.props.courseName} sectionNumber={this.props.data.number} updateData={this.props.updateData} allData={this.props.allData} courseData={this.props.courseData} completedCourses={this.props.completedCourses}/>
			)
		}
		if(subsections.length !== 0){
			return (
				<AccordionItem className="sectionItems" eventKey={this.props.data.number+this.props.data.subsections}>
					<AccordionHeader><h5>Subsections</h5></AccordionHeader>
					<AccordionBody>{subsections}</AccordionBody>
				</AccordionItem>
			)
		}
		return;
	}

	getMeetingTimes(){
		let time = this.props.data.time;
		let value = []
		if(time.monday){
			value.push(<li>Monday: {time.monday}</li>)
		}
		if(time.tuesday){
			value.push(<li>Tuesday: {time.tuesday}</li>)
		}
		if(time.wednesday){
			value.push(<li>Wednesday: {time.wednesday}</li>)
		}
		if(time.thursday){
			value.push(<li>Thursday: {time.thursday}</li>)
		}
		if(time.friday){
			value.push(<li>Friday: {time.friday}</li>)
		}

		return value;
	}

	addSubSection = (subSection) =>{
		let course = JSON.parse(JSON.stringify(this.props.data));
		course.subsections = [subSection];
		this.addToCart(course);
	}

	addSection(){
		if(this.props.courseData.requisites !== ""){
			for(let i = 0; i < this.props.courseData.requisites.length; i++){
				let met = false;
				for(let n = 0; n < this.props.courseData.requisites[i].length; n++){
					if(this.props.completedCourses.indexOf(this.props.courseData.requisites[i][n]) !== -1)
					met = true;
				}
				if(!met){
				window.alert("Requisites not met for " + this.props.courseData.name + " (" + this.props.courseData.number + ")");
				}
			}
		}
		let courseName = this.props.courseName;
		let cartData = JSON.parse(JSON.stringify(this.props.cartData))
		let allData = JSON.parse(JSON.stringify(this.props.allData))
		let course = {}
		let foundCourse = 0;
		let courseIndex = 0;
		for(let i = 0; i < allData.length; i++){
			if(allData[i].name === courseName)
				courseIndex = i;
		}
		for(let i = 0; i < cartData.length; i++){
			if(cartData[i].name === courseName){
				foundCourse = 1;
				course = JSON.parse(JSON.stringify(cartData[i]));
			}
		}
		if(!foundCourse){
			course = JSON.parse(JSON.stringify(allData[courseIndex]));
			course.sections.splice(0, course.sections.length)
		}
		let foundSection = 0;
		let section = {};
		for(let i = 0; i < course.sections.length; i++){
			if(course.sections[i].number === this.props.data.number){
				return;
			}
		}
		if(!foundSection){
			for(let i = 0; i < allData[courseIndex].sections.length; i++){
				if(allData[courseIndex].sections[i].number === this.props.data.number){
					section = JSON.parse(JSON.stringify(allData[courseIndex].sections[i]));
					section.subsections.splice(0, section.subsections.length)
					course.sections.push(section);
				}
			}
		}
		let inCart = 0;
		for(let i = 0; i < cartData.length; i++){
			if(cartData[i].name === course.name){
				cartData[i] = course;
				inCart = 1;
			}
		}
		if(!inCart){
			cartData.push(course);
		}
		this.props.updateData(cartData);
	}

	removeSection(){
		let courseName = this.props.courseName;
		let sectionNumber = this.props.data.number;
		let cartData = JSON.parse(JSON.stringify(this.props.cartData))
		let course = {};
		let courseIndex = 0;
		for(let i = 0; i < cartData.length; i++){
			if(cartData[i].name === courseName){
				course = cartData[i]
				courseIndex = i;
			}
		}
		for(let i = 0; i < course.sections.length; i++){
			if(course.sections[i].number === sectionNumber)
				course.sections.splice(i,1);
		}
		cartData[courseIndex] = course;
		this.props.updateData(cartData);
	}

	getButton(){
		if(this.props.cartMode === false)
			return(<button className="btn btn-primary button" onClick={() => this.addSection(this.props.data)}>Add Section</button>)
		else
			return(<button className="btn btn-primary button" onClick={() => this.removeSection()}>Remove Section</button>)
	}

	render() {
		return (
			<Row>
				<Col className="col-5">
					<ul>
						<li>{this.props.data.number}</li>
						<ul>
							<li>Instructor: {this.props.data.instructor}</li>
							<li>Location: {this.props.data.location}</li>
						</ul>
					</ul>
				</Col>
				<Col className="mt-1 col-5">
					<ul>
						<ul>
							<li>Meeting Times</li>
							<ul>
								{this.getMeetingTimes()}
							</ul>
						</ul>
					</ul>
				</Col>
				<Col className="mt-3 pt-2">
					{this.getButton()}
				</Col>
				<Row>
				<Accordion className="mb-3">{this.getSubSections()}</Accordion>
				</Row>
			</Row>
		)
	}
}

export default Section;