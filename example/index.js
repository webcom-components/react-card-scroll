import React from 'react'
import ReactDOM from 'react-dom'
import CardScroll from '../dist/bundle'

const ScrollableTitleCard = React.createClass({
    componentDidMount() {
        this.refs.title.addEventListener('wheel', event => {
            this.props.onScrollTitle({toLeft:event.wheelDelta>0})
            event.preventDefault()
        })
    },
    render() {
        const {title, children} = this.props
        return (
            <div className="col-sm-6 col-md-4">
                <div className="card">
                    <div ref="title" className="card-header">
                        {title}
                    </div>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
})

const Example = React.createClass({
    render() {
        const getCardWidth = () => ReactDOM.findDOMNode(this.refs.modelCard).getBoundingClientRect().width
        const onScrollTitle = (params) => this.refs.cardScroll.scrollCards(params)
        return (
            <CardScroll getCardWidth={getCardWidth} getCardCount={() => 5} ref="cardScroll">
                <ScrollableTitleCard title="Card 1" onScrollTitle={onScrollTitle} ref="modelCard"/>

                <ScrollableTitleCard title="Card 2" onScrollTitle={onScrollTitle} >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    <br/>
                    <br/>
                    <br/>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </ScrollableTitleCard>

                <ScrollableTitleCard title="Card 3" onScrollTitle={onScrollTitle} />

                <ScrollableTitleCard title="Card 4" onScrollTitle={onScrollTitle} />

                <ScrollableTitleCard title="Card 5" onScrollTitle={onScrollTitle} />
            </CardScroll>
        )
    }
})

ReactDOM.render(
    <Example/>,
    document.getElementById('example')
)