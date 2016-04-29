import React from 'react'
import ReactDOM from 'react-dom'
import {throttle} from 'lodash'
import {Motion, spring} from 'react-motion'
import s from './styles.scss'

const defaultWidths = {
    card: 0,
    container: 0
}

let CardScroll = React.createClass({
    getInitialState(){
        return {currentLeft: 0, currentCard: 0}
    },

    componentWillMount() {
        this.widths = defaultWidths
        this.children = {}
    },

    componentDidMount() {
        this.widths = this.computeWidths()
        window.addEventListener('resize', this.handleResize);
    },

    componentDidUpdate(){
        // case children were removed
        if(this.canScrollLeft() && this.lastVisibleCardIndex()>=React.Children.count(this.props.children)){
            this.scrollCards({number:0})
        }
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    },

    handleResize() {
        if(!this._handleResize){
            this._handleResize = throttle(() => {
                this.widths = this.computeWidths()
                this.scrollCards({number: 0})
            })
        }
        this._handleResize()
    },

    computeWidths() {
        const childrenCount = React.Children.count(this.props.children)
        if(childrenCount==0){
            return defaultWidths
        }
        // get first child as all children should be of equal width
        const card = ReactDOM.findDOMNode(this._child).getBoundingClientRect().width
        const container = this._container.clientWidth
        return {
            card,
            container
        }
    },

    render() {
        const {currentLeft} = this.state
        const updateContainer = c => c && (this._container = c)
        const updateChild = c => c && (this._child= c)
        return (
            <div>
                {this.canScrollLeft()?
                    <div className={s.leftArrow}
                         onClick={this.scrollCardsWrap({toLeft: true})}>
                        <div className={s.arrow}></div>
                    </div>
                        :null}
                {this.canScrollRight()?
                    <div className={s.rightArrow}
                         onClick={this.scrollCardsWrap()}>
                        <div className={s.arrow}></div>
                    </div>
                        :null}
                <Motion style={{left: spring(currentLeft)}}>
                    {value => {
                        let first = true
                        return (<div className={`row ${s.container}`}
                             style={value}
                             ref={updateContainer}>
                            {React.Children.map(this.props.children, child => {
                                if(first){
                                    first = false
                                    return React.cloneElement(child, {
                                        ref: updateChild
                                    });
                                } else {
                                    return child
                                }
                                
                            })}

                        </div>)
                    }}
                </Motion>
            </div>
        )
    },

    scrollCardsWrap(params){
        return () => this.scrollCards(params)
    },
    //TODO write TESTS!!!
    scrollCards({toLeft=false, number=1}={}){
        if (toLeft && this.state.currentCard - number < 0) {
            // gonna scroll too much to the left so just scroll to the first card
            number = this.state.currentCard
        }
        const visibleCardCount = this.getVisibleCardCount()
        const cardCount = React.Children.count(this.props.children)
        if (!toLeft && this.state.currentCard + visibleCardCount + number > cardCount) {
            // gonna scroll too much to the right so scroll so the last card is at the right
            number = -this.state.currentCard + cardCount - visibleCardCount
        }
        let currentCard = this.state.currentCard + (toLeft ? -number : number)
        if (currentCard < 0) {
            // case where we wanna display last card at the right but not enough cards
            currentCard = 0
        }
        const cardWidth = this.widths.card
        const currentLeft = -currentCard * cardWidth
        this.setState({currentLeft, currentCard})
    },

    getVisibleCardCount(){
        return Math.floor(this.widths.container / this.widths.card)
    },

    lastVisibleCardIndex(){
        return this.state.currentCard + this.getVisibleCardCount()-1
    },

    canScrollRight(){
        return this.lastVisibleCardIndex()+1 < React.Children.count(this.props.children)
    },

    canScrollLeft(){
        return this.state.currentCard>0
    }
})

export default CardScroll;
