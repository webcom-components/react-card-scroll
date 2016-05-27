import React from 'react'
import ReactDOM from 'react-dom'
import {throttle} from 'lodash'
import s from './styles.scss'
import {getOffset, getMaxOffset} from './offset'

const defaultWidths = {
    card: 0,
    container: 0
}

let CardScroll = React.createClass({
    getInitialState(){
        return {currentCard: 0}
    },

    componentWillMount() {
        this.maxOffset = getMaxOffset()
        this.widths = defaultWidths
        this.children = {}
    },

    componentDidMount() {
        this.widths = this.computeWidths()
        this.setState(this.getInitialState())
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
        // anticipate the margin that we will add
        const container = this._container.getBoundingClientRect().width-this.maxOffset*2
        // get first child as all children should be of equal width
        const card = ReactDOM.findDOMNode(this._child).getBoundingClientRect().width*container/this._container.getBoundingClientRect().width
        return {
            card,
            container
        }
    },

    render() {
        const {currentCard} = this.state
        const lastCard = this.lastVisibleCardIndex()
        const updateContainer = c => c && (this._container = c)
        const updateChild = c => c && (this._child= c)
        let first = true
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
                    <div className={s.container}
                         style={{marginLeft: this.maxOffset, marginRight: this.maxOffset}}
                         ref={updateContainer}>
                        {React.Children.map(this.props.children, (child, index) => {
                            let props = {className: s.stack}

                            if(first){
                                first = false
                                props.ref= updateChild
                            }

                            const offset = getOffset({index, firstVisibleIndex:currentCard, lastVisibleIndex:lastCard})
                            let position = offset
                            let zIndex = 0
                            let className = "rcs-left-stack"
                            if(offset==0){
                                position = (index-currentCard)*this.widths.card
                                if(index == lastCard && currentCard != lastCard){
                                    zIndex = -1
                                }
                                className = "rcs-center"
                            } else if(offset>0){
                                position = offset + (lastCard-currentCard)*this.widths.card
                                zIndex = lastCard-index-1
                                className = "rcs-right-stack"
                            }
                            props.style = {left: position, zIndex}
                            props.className = `${className} ${s.stack}`

                            return React.cloneElement(child, props);
                        })}
                    </div>
            </div>
        )
    },

    scrollCardsWrap(params){
        return () => this.scrollCards(params)
    },

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
        return this.widths.card?Math.floor(this.widths.container / this.widths.card):1
    },

    lastVisibleCardIndex(){
        return this.state.currentCard + this.getVisibleCardCount()-1
    },

    canScrollRight(){
        return this.props.showArrows && this.lastVisibleCardIndex()+1 < React.Children.count(this.props.children)
    },

    canScrollLeft(){
        return this.props.showArrows && this.state.currentCard>0
    },

    /**
     * Get card offset
     * @param index
     * return negative number if card is on left stack, 0 if visible, positive number if card is on right stack
     */
    getCardOffset(index){
        return getOffset({index, firstVisibleIndex:this.state.currentCard, lastVisibleIndex:this.lastVisibleCardIndex()})
    }
})

export default CardScroll;
