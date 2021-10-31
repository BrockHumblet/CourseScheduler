import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cartCourses: [],
      completedCourses: {},
      ratings: [],
      keywords: [],
      reccomendedCourses: [],
    };
  }

  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:53706/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
          keywords: this.getKeywords(data),
        })
      );
    
    fetch("http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          completedCourses: data,
          ratings: this.getRatings(data.data),
        })
      );
  }

  getKeywords(data){
    let keywords = [];
    keywords.push("All");

    for (const course of Object.values(data)) {
      for(let i = 0; i < course.keywords.length; i++){
        if (keywords.indexOf(course.keywords[i]) === -1)
          keywords.push(course.keywords[i]);
      }
    }
    return keywords;
  }

  getRatings(data) {
    let ratings = []
    for(const courseNumber of Object.values(data)) {
      ratings.push({"number":courseNumber, "rating":"No Rating"});
    }
    return ratings;
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  addToCart = (cartData) =>{
    let found = 0;
    let cartCoursesCopy = JSON.parse(JSON.stringify(this.state.cartCourses))
    for(let i = 0; i < cartCoursesCopy.length; i++){
      if(cartCoursesCopy[i].number === cartData.number){
        cartCoursesCopy[i] = cartData;
        this.setState({cartCourses: cartCoursesCopy});
        found = 1;
      }
    }
    if(!found)
      this.setState({cartCourses: [...this.state.cartCourses, cartData]});
  }

  updateCart = (updateData) =>{
    this.setState({cartCourses: updateData});
  }

  updateRatings = (ratingsData) =>{
    this.setState({ratings: ratingsData});
  }

  render() {
    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "#be030f",
          }}
        >
          <Tab eventKey="search" title="Search" style={{ paddingTop: "6vh", backgroundColor: "#424242"}}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
              keywords={this.state.keywords}
            />
            <div style={{ marginLeft: "20vw", paddingBottom: "1vh"}}>
              <CourseArea 
                cartData={this.state.cartCourses}
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cart={this.addToCart}
                cartMode={false}
                updateData={this.updateCart}
                completedCourses={this.state.completedCourses.data}
              />
            </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh", backgroundColor: "#424242" }}>
            <div style={{ marginLeft: "5vw", backgroundColor: "#424242"  }}></div>
              <CourseArea
                cartData={this.state.cartCourses}
                data={this.state.cartCourses}
                cart={this.addToCart}
                cartMode={true}
                updateData={this.updateCart}
                />
          </Tab>
        
          <Tab eventKey="completedCourses" title="Completed Courses" style={{ paddingTop: "5vh"}}>
            <div style={{ marginLeft: "5vw", backgroundColor: "#424242"  }}></div>
            <CourseArea 
              completedCourses={this.state.completedCourses.data}
              data = {this.state.allCourses}
              ratings = {this.state.ratings}
              updateRatings = {this.updateRatings}
              completedMode={true}
              />
          </Tab>

          <Tab eventKey="RecommendedCourses" title="Recommended Courses" style={{ paddingTop: "5vh"}}>
            <div style={{ marginLeft: "5vw", backgroundColor: "#424242"  }}></div>
            <CourseArea
              recomendedMode={true}
              ratings = {this.state.ratings}
              data = {this.state.allCourses}
              completedCourses={this.state.completedCourses.data}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
