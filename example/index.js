import React from 'react'
import ReactDOM from 'react-dom'
import CardScroll from '../lib'

const ScrollableTitleCard = React.createClass({
    componentDidMount() {
        this.refs.title.addEventListener('wheel', event => {
            this.props.scrollCards({toLeft:event.wheelDelta>0})
            event.preventDefault()
        })
    },
    render() {
        const {title, children, className, style} = this.props
        const onClick = ev => {
            const offset = this.props.getCardOffset()
            if(offset!=0){
                ev.preventDefault()
                this.props.scrollCards({toLeft:offset<0})
            }
        }
        return (
            <div className={"col rcs-col-sm-6 rcs-col-md-4 rcs-col-lg-3 "+className} style={style}>
                <div onClick={onClick} className="card">
                    <div ref="title" className="card-header">
                        {title}
                    </div>
                    <div className="card-block">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
})

const Example = React.createClass({
    getInitialState(){
        return {cards: [
            <ScrollableTitleCard title="Card 1" key="card1" />,
            <ScrollableTitleCard title="Card 2" key="card2" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                <br/>
                <br/>
                <br/>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </ScrollableTitleCard>,
            <ScrollableTitleCard title="Card 3" key="card3" />,
            <ScrollableTitleCard title="Card 4" key="card4" />
        ]}
    },

    addCard(){
        const index = this.state.cards.length+1
        let cards = this.state.cards.slice()
        cards.push(<ScrollableTitleCard title={`Card ${index}`} key={`card${index}`} />)
        this.setState({cards})
    },

    removeCard(){
        let cards = this.state.cards.slice()
        if(cards.length>0){
            cards.splice(cards.length-1)
            this.setState({cards})
        }
    },

    componentDidUpdate(prevProps, {cards}){
        if(cards.length<this.state.cards.length){
            this.refs.cardScroll.scrollCards({number:1000})
        }
    },
    
    render() {
        const scrollCards = params => this.refs.cardScroll.scrollCards(params)
        const getCardOffset = index => () => this.refs.cardScroll.getCardOffset(index)
        return (
            <div>
                <button onClick={this.addCard}>Add card</button>
                <button onClick={this.removeCard}>Remove last card</button>
                <CardScroll ref="cardScroll">
                    {this.state.cards.map((el, index) => React.cloneElement(el, {scrollCards, getCardOffset:getCardOffset(index)}))}
                </CardScroll>
            </div>
        )
    }
})

ReactDOM.render(
    <Example/>,
    document.getElementById('example')
)