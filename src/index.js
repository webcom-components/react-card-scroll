import React from 'react';
import {throttle} from 'lodash'
import {Motion, spring} from 'react-motion'
import s from 'style!css?modules!sass!./styles.scss'

let CardScroll = React.createClass({
    getInitialState(){
        return {currentLeft: 0, currentCard: 0}
    },

    componentDidMount() {
        window.addEventListener('resize', throttle(() => this.scrollCards({number: 0})));
    },

    render() {
        const {currentLeft} = this.state
        const updateRow = c => {
            if (c) {
                this._row = c
            }
        }
        return (
            <div className="scroll-container flex-item">
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
                    {value => (
                        <div className={`row ${s.container}`}
                             style={value}
                             ref={c => updateRow(c)}>
                            {this.props.children}
                        </div>
                    )}
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
        const cardCount = this.props.getCardCount()
        if (!toLeft && this.state.currentCard + visibleCardCount + number > cardCount) {
            // gonna scroll too much to the right so scroll so the last card is at the right
            number = -this.state.currentCard + cardCount - visibleCardCount
        }
        let currentCard = this.state.currentCard + (toLeft ? -number : number)
        if (currentCard < 0) {
            // case where we wanna display last card at the right but not enough cards
            currentCard = 0
        }
        const cardWidth = this.props.getCardWidth()
        const currentLeft = -currentCard * cardWidth
        this.setState({currentLeft, currentCard})
    },

    getVisibleCardCount(){
        return this._row?Math.floor(this._row.clientWidth / this.props.getCardWidth()):0
    },

    canScrollRight(){
        return this.state.currentCard + this.getVisibleCardCount() < this.props.getCardCount()
    },

    canScrollLeft(){
        return this.state.currentCard>0
    }
})

export default CardScroll;
