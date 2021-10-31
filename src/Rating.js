import React from "react";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";



class Rating extends React.Component{

    getRating(){
        for(let i = 0; i < this.props.ratings.length; i++){
            if(this.props.ratings[i].number === this.props.number){
                return this.props.ratings[i].rating;
            }
        }
    }

    updateRating(rating){
        for(let i = 0; i < this.props.ratings.length; i++){
            if(this.props.ratings[i].number === this.props.number){
                this.props.ratings[i].rating = rating;
            }
        }
        this.props.updateRatings(this.props.ratings)
    }

    render() {
        return(
            <DropdownButton onSelect={(e) => this.updateRating(e)} title={this.getRating()}>
                <Dropdown.Item eventKey="No Rating">No Rating</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                <Dropdown.Item eventKey="5">5</Dropdown.Item>
            </DropdownButton>
        )
    }
}

export default Rating