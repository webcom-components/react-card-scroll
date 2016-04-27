import React from 'react'
import ReactDOM from 'react-dom'
import CardScroll from '../dist/bundle'

const Example = React.createClass({
    
    render() {
        const getCardWidth = () => this.refs.modelCard.getBoundingClientRect().width
        return (
            <CardScroll getCardWidth={getCardWidth} getCardCount={() => 5}>
                <div className="col-sm-6 col-md-4"r ref="modelCard">
                    <div className="card">
                        <div className="card-header">
                            Card 1
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Card 2
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Card 3
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Card 4
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Card 5
                        </div>
                    </div>
                </div>
            </CardScroll>
        )
    }
})


ReactDOM.render(
    <Example/>,
    document.getElementById('example')
)