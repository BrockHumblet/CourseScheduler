import React from 'react';
import './App.css';
import Course from './Course';
import { Accordion } from 'react-bootstrap';
import CompletedCourse from './CompletedCourse';
import RecommendedCourse from './RecommendedCourse';


class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    if(!this.props.completedMode && !this.props.recomendedMode){
      for(const course of Object.values(this.props.data)) {
        courses.push (
          <Course key={course.name} data={course} cart={this.props.cart} cartMode={this.props.cartMode} cartData={this.props.cartData} updateData={this.props.updateData} allData={this.props.allData} completedCourses={this.props.completedCourses}/>
        )
      }
    } 
    else if(this.props.recomendedMode){
      let recommendedCourses = []
      let recommendedNumbers = []
      let data = JSON.parse(JSON.stringify(this.props.data))
      for(let i = 5; i > 0; i--){
        for(let n = 0; n < this.props.ratings.length; n++){
          if(this.props.ratings[n].rating === i + ""){
            let keywords = null;
            for(let j = 0; j < data.length; j++){
              if(keywords != null){
                let merge = keywords.filter(element => data[j].keywords.includes(element));
                if(merge.length > 0 && this.props.completedCourses.indexOf(data[j].number) === -1 && recommendedNumbers.indexOf(data[j].number) === -1){
                  recommendedCourses.push(data[j]);
                  recommendedNumbers.push(data[j].number);
                }
              }
              else if(this.props.ratings[n].number === data[j].number){
                keywords = data[j].keywords
                j = -1;
              }
            }
          }
        }
      }
      for(const recommendedCourse of Object.values(recommendedCourses)){
        courses.push(
          <RecommendedCourse data={recommendedCourse}/>
        )
      }
    }
    else {
      if(this.props.completedCourses) {
        let data = Object.values(this.props.data);
        for(const completedCourse of Object.values(this.props.completedCourses)) {
          let course = null;
          for(let i = 0; i < data.length; i++){
            if(data[i].number === completedCourse){
              course = data[i];
              break;
            }
          }
          courses.push (
            <CompletedCourse data={course} number={completedCourse} ratings={this.props.ratings} updateRatings={this.props.updateRatings}/>
          )
        }
      }
    }
    return courses;
  }

  

  render() {
    return (
      <div style={{margin: '5px'}}>
        <Accordion>
          {this.getCourses()}
        </Accordion>
      </div>
      
    )
  }
}

export default CourseArea;
