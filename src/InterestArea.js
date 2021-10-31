import React from "react";
import { Form } from "react-bootstrap";

class InterestArea extends React.Component{
    
    getKeywordOptions(){
        let keywordOptions = [];

        for(const keyword of this.props.keywords) {
            keywordOptions.push(<option key={keyword}>{keyword}</option>);
        }

        return keywordOptions;
    }

    setCourses(){
        this.props.getKeyword(this.props.keyword);
    }


    render(){
        return(
            <Form.Group controlId="formKeyword">
                <Form.Label>Interest Area</Form.Label>
                <Form.Control as="select" ref={this.props.keyword} onChange={() => this.setCourses()}>
                    {this.getKeywordOptions()}
                </Form.Control>
            </Form.Group>
        )
    }
}

export default InterestArea