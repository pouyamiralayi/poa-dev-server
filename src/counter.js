import React from 'react'
export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count : 0,
        }
    }
    render() {
        return (
            <div
                onClick={this.increment.bind(this)}>
                <h1>Count: {this.state.count}</h1>
            </div>
        )
    }
    increment(){
        this.setState({
            count: this.state.count+1
        })
    }
}
