import React from 'react';
import {throttle} from 'lodash'
import {Motion, spring} from 'react-motion'
import s from 'style!css?modules!./styles.css'

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
                <div className={s.leftArrow}
                     onClick={this.scrollCardsWrap({toLeft: true})}>{"<"}</div>
                <div className={s.rightArrow}
                     onClick={this.scrollCardsWrap()}>{">"}</div>
                <Motion style={{left: spring(currentLeft)}}>
                    {value => {
                        return (
                            <div className={`row ${s.container}`}
                                 style={value}
                                 ref={c => updateRow(c)}>
                                {this.props.children}
                            </div>)
                    }
                    }
                </Motion>
            </div>
        )
    },

    scrollCardsWrap(params){
        return () => {
            this.scrollCards(params)
        }
    },
    //TODO write TESTS!!!
    scrollCards({toLeft=false, number=1}={}){
        if (toLeft && this.state.currentCard - number < 0) {
            // gonna scroll too much to the left so just scroll to the first card
            number = this.state.currentCard
        }
        const cardWidth = this.props.getCardWidth()
        const visibleCardCount = Math.floor(this._row.clientWidth / cardWidth)
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
        const currentLeft = -currentCard * cardWidth
        this.setState({currentLeft, currentCard})
    }
})

export default CardScroll;
