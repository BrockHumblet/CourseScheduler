import React from 'react'
import './App.css'
import { Col, Row } from 'react-bootstrap';


class Subsection extends React.Component {
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


	addSubsection(){
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
		let sectionNumber = this.props.sectionNumber;
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
		let sectionIndex = 0
		let foundSection = 0;
		let section = {};
		for(let i = 0; i < course.sections.length; i++){
			if(course.sections[i].number === sectionNumber){
				foundSection = 1;
				sectionIndex = i;
			}
		}
		if(!foundSection){
			for(let i = 0; i < allData[courseIndex].sections.length; i++){
				if(allData[courseIndex].sections[i].number === sectionNumber){
					section = JSON.parse(JSON.stringify(allData[courseIndex].sections[i]));
					for(let n = 0; n < section.subsections.length; n++){
						if(section.subsections[n].number === this.props.data.number)
							sectionIndex = [n];
					}
					section.subsections = [section.subsections[sectionIndex]]
					course.sections.push(section);
				}
			}
		} else{
			let foundSubsection = 0;
			if(course.sections[sectionIndex]){
				for(let i = 0; i < course.sections[sectionIndex].subsections.length; i++){
					if(course.sections[sectionIndex].subsections[i].number === this.props.data.number)
						foundSubsection = 1;
				}
			} else{
				course.sections[sectionIndex].subsections = [];
			}
			if(!foundSubsection){
				course.sections[sectionIndex].subsections.push(this.props.data)
			} else{
				return;
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

	removeSubsection(){
		let courseName = this.props.courseName;
		let sectionNumber = this.props.sectionNumber;
		let cartData = JSON.parse(JSON.stringify(this.props.cartData))
		let course = {};
		let courseIndex = 0;
		for(let i = 0; i < cartData.length; i++){
			if(cartData[i].name === courseName){
				course = cartData[i]
			}
		}
		let section = {};
		for(let i = 0; i < course.sections.length; i++){
			if(course.sections[i].number === sectionNumber)
				section = course.sections[i]
		}
		for(let i = 0; i < section.subsections.length; i++){
			if(section.subsections[i].number === this.props.data.number)
				section.subsections.splice(i,1);
		}
		cartData[courseIndex] = course;
		this.props.updateData(cartData);
	}

	getButton(){
		if(this.props.cartMode === false)
			return(<button className="btn btn-primary button" onClick={() => this.addSubsection()}>Add Subsection</button>)
		else
			return(<button className="btn btn-primary button" onClick={() => this.removeSubsection()}>Remove Subsection</button>)
	}

	render() {
		if(!this.props.data)
			return null;
		return (
			<Row>
				<Col className="col-4">
					<ul>
						<li>{this.props.data.number}</li>
						<ul>
							<li>{this.props.data.location}</li>
						</ul>
					</ul>
				</Col>
				<Col className="col-5">
					<ul>
						<ul>
							<li>Meeting Times</li>
							<ul>
								{this.getMeetingTimes()}
							</ul>
						</ul>
					</ul>
				</Col>
				<Col className="mt-2 text-center">
					{this.getButton()}
				</Col>
			</Row>
		)
	}
}

export default Subsection;