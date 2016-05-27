import React from 'react'
import ReactDOM from 'react-dom'
import CardScroll from '../lib'

const texts = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus vel dui tristique, vitae suscipit libero ullamcorper. Phasellus ultrices ultricies gravida. Sed ut euismod tortor, et consectetur lectus. Etiam sollicitudin ligula metus, eget rhoncus velit scelerisque a. Sed ac varius ipsum. Etiam vel suscipit arcu, vel sagittis eros. Integer luctus urna quis malesuada maximus. Quisque ut gravida erat. Sed vestibulum neque eu ligula posuere, a dapibus augue tempus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec lobortis luctus lectus, a fringilla nulla vehicula eu. Cras mollis ullamcorper ornare. In hac habitasse platea dictumst. Ut pretium mauris id nunc finibus, at elementum lorem tristique. In hac habitasse platea dictumst. Donec commodo risus at lacinia porta.",
    "Aliquam lectus metus, tincidunt non diam non, rutrum pellentesque tortor. Nam at pulvinar nunc. Integer nisi diam, semper a nisi sed, mattis aliquet magna. Integer purus nulla, mollis eget enim eget, lobortis aliquam dui. Aenean sit amet libero id augue lacinia lacinia et vel mauris. Suspendisse consectetur a erat sit amet suscipit. Mauris a maximus nisi, vel sagittis nisi. Suspendisse sed consectetur nulla. Integer ut erat et tortor sodales suscipit pharetra ut nibh. Suspendisse cursus suscipit justo, sed consequat ipsum blandit id. Nullam ut risus mauris. Proin suscipit id sapien gravida ultricies. Duis sit amet nibh fringilla, viverra odio et, rhoncus mauris. Curabitur ac tellus nibh. In cursus, sem id iaculis lacinia, odio ante fermentum odio, at ullamcorper urna dui et purus. Cras dictum augue et dolor facilisis ornare. ",
    "Nam molestie ex molestie massa feugiat accumsan. Nulla facilisi. Cras libero neque, tristique nec eros non, venenatis sollicitudin sem. Nunc et turpis et orci aliquam congue. Maecenas hendrerit odio congue erat ultricies lobortis nec ut sem. Sed tristique purus in sapien dapibus luctus. Vivamus sed tempus purus, in ultricies diam. Nulla fermentum massa nec congue vestibulum. Vivamus gravida lacinia tempus. Nunc efficitur sit amet justo in fringilla. Nam bibendum est elit, in porta est iaculis nec. Praesent tempor blandit hendrerit. Donec hendrerit tortor elementum odio hendrerit, ac consequat sapien tristique.",
    "Suspendisse non lobortis ex. Nunc sagittis sapien ac ipsum accumsan dapibus. Proin efficitur non urna sed tempus. Pellentesque cursus nibh sed nisi porttitor, ut porttitor augue tempus. Donec et consequat quam. Praesent fringilla malesuada elit, at finibus nibh ullamcorper eu. Proin a consectetur sem, nec sagittis sapien. Suspendisse maximus, ligula vitae faucibus fermentum, orci mi sagittis lorem, vitae mattis urna tellus ut sem."]

const ScrollableTitleCard = React.createClass({
    componentDidMount() {
        this.refs.title.addEventListener('wheel', event => {
            this.props.scrollCards({toLeft: event.wheelDelta > 0})
            event.preventDefault()
        })
    },
    render() {
        const {title, children, className, style} = this.props
        const onClick = ev => {
            const offset = this.props.getCardOffset()
            if (offset != 0) {
                ev.preventDefault()
                this.props.scrollCards({toLeft: offset < 0})
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
        return {
            cards: [
                <ScrollableTitleCard title="Card 1" key="card1">
                    {texts[0]}
                </ScrollableTitleCard>,
                <ScrollableTitleCard title="Card 2" key="card2">
                    {texts[1]}
                </ScrollableTitleCard>,
                <ScrollableTitleCard title="Card 3" key="card3">
                    {texts[2]}
                </ScrollableTitleCard>,
                <ScrollableTitleCard title="Card 4" key="card4">
                    {texts[3]}
                </ScrollableTitleCard>
            ]
        }
    },

    addCard(){
        const index = this.state.cards.length + 1
        let cards = this.state.cards.slice()
        cards.push(
            <ScrollableTitleCard title={`Card ${index}`}
                                 key={`card${index}`}>{texts[index % 4]}
            </ScrollableTitleCard>)
        this.setState({cards})
    },

    removeCard(){
        let cards = this.state.cards.slice()
        if (cards.length > 0) {
            cards.splice(cards.length - 1)
            this.setState({cards})
        }
    },

    componentDidUpdate(prevProps, {cards}){
        if (cards.length < this.state.cards.length) {
            this.refs.cardScroll.scrollCards({number: 1000})
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
                    {this.state.cards.map((el, index) => React.cloneElement(el, {
                        scrollCards,
                        getCardOffset: getCardOffset(index)
                    }))}
                </CardScroll>
            </div>
        )
    }
})

ReactDOM.render(
    <Example/>,
    document.getElementById('example')
)