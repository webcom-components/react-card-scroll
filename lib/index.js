'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _styles = {
    "container": "_1H7C65wd8WJqBtCRmAfokb",
    "rightArrow": "_22yQcZhJvmCSA52vE9VrUe",
    "arrow": "_1y88-b9gQ_tGRfPBQpxMfo",
    "leftArrow": "_1bIeR72ojeoWY-MxcIhjT-"
};

var _styles2 = _interopRequireDefault(_styles);

var _offset = require('./offset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultWidths = {
    card: 0,
    container: 0
};

var CardScroll = _react2.default.createClass({
    displayName: 'CardScroll',
    getDefaultProps: function getDefaultProps() {
        return {
            visibleStack: 3,
            stackSpace: 5
        };
    },
    getInitialState: function getInitialState() {
        return { currentCard: 0 };
    },
    componentWillMount: function componentWillMount() {
        this.maxOffset = (0, _offset.getMaxOffset)({ visibleStack: this.props.visibleStack, stackSpace: this.props.stackSpace });
        this.widths = defaultWidths;
        this.children = {};
    },
    componentDidMount: function componentDidMount() {
        this.widths = this.computeWidths();
        this.setState(this.getInitialState());
        window.addEventListener('resize', this.handleResize);
    },
    componentDidUpdate: function componentDidUpdate() {
        // case children were removed
        if (this.canScrollLeft() && this.lastVisibleCardIndex() >= _react2.default.Children.count(this.props.children)) {
            this.scrollCards({ number: 0 });
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    handleResize: function handleResize() {
        var _this = this;

        if (!this._handleResize) {
            this._handleResize = (0, _lodash.throttle)(function () {
                _this.widths = _this.computeWidths();
                _this.scrollCards({ number: 0 });
            });
        }
        this._handleResize();
    },
    computeWidths: function computeWidths() {
        var childrenCount = _react2.default.Children.count(this.props.children);
        if (childrenCount == 0) {
            return defaultWidths;
        }
        var container = this._container.getBoundingClientRect().width;
        // get first child as all children should be of equal width
        var card = _reactDom2.default.findDOMNode(this._child).getBoundingClientRect().width;
        return {
            card: card,
            container: container
        };
    },
    render: function render() {
        var _this2 = this;

        var currentCard = this.state.currentCard;
        var childrenClass = this.props.childrenClass;

        var lastCard = this.lastVisibleCardIndex();
        var updateContainer = function updateContainer(c) {
            return c && (_this2._container = c);
        };
        var updateChild = function updateChild(c) {
            return c && (_this2._child = c);
        };
        return _react2.default.createElement(
            'div',
            null,
            this.showArrows() && this.canScrollLeft() ? _react2.default.createElement(
                'div',
                { className: _styles2.default.leftArrow,
                    onClick: this.scrollCardsWrap({ toLeft: true }) },
                _react2.default.createElement('div', { className: _styles2.default.arrow })
            ) : null,
            this.showArrows() && this.canScrollRight() ? _react2.default.createElement(
                'div',
                { className: _styles2.default.rightArrow,
                    onClick: this.scrollCardsWrap() },
                _react2.default.createElement('div', { className: _styles2.default.arrow })
            ) : null,
            _react2.default.createElement(
                'div',
                { className: _styles2.default.container,
                    style: { marginLeft: this.maxOffset, marginRight: this.maxOffset },
                    ref: updateContainer },
                _react2.default.Children.map(this.props.children, function (child, index) {
                    var offset = (0, _offset.getOffset)({
                        index: index,
                        firstVisibleIndex: currentCard,
                        lastVisibleIndex: lastCard,
                        visibleStack: _this2.props.visibleStack,
                        stackSpace: _this2.props.stackSpace
                    });
                    var position = offset;
                    var zIndex = -currentCard + index;
                    var className = "rcs-left-stack";
                    if (offset == 0) {
                        position = (index - currentCard) * _this2.widths.card;
                        if (index == lastCard && currentCard != lastCard) {
                            zIndex = 0;
                        }
                        className = "rcs-center";
                    } else if (offset > 0) {
                        position = offset + (lastCard - currentCard) * _this2.widths.card;
                        zIndex = lastCard - index - 1;
                        className = "rcs-right-stack";
                    }
                    var style = { left: position, zIndex: zIndex };
                    return _react2.default.createElement(
                        'div',
                        { className: className + ' ' + childrenClass, style: style, ref: index == 0 && updateChild },
                        child
                    );
                })
            )
        );
    },
    scrollCardsWrap: function scrollCardsWrap(params) {
        var _this3 = this;

        return function () {
            return _this3.scrollCards(params);
        };
    },
    scrollCards: function scrollCards() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref$toLeft = _ref.toLeft;
        var toLeft = _ref$toLeft === undefined ? false : _ref$toLeft;
        var _ref$number = _ref.number;
        var number = _ref$number === undefined ? 1 : _ref$number;

        if (toLeft && this.state.currentCard - number < 0) {
            // gonna scroll too much to the left so just scroll to the first card
            number = this.state.currentCard;
        }
        var visibleCardCount = this.getVisibleCardCount();
        var cardCount = _react2.default.Children.count(this.props.children);
        if (!toLeft && this.state.currentCard + visibleCardCount + number > cardCount) {
            // gonna scroll too much to the right so scroll so the last card is at the right
            number = -this.state.currentCard + cardCount - visibleCardCount;
        }
        var currentCard = this.state.currentCard + (toLeft ? -number : number);
        if (currentCard < 0) {
            // case where we wanna display last card at the right but not enough cards
            currentCard = 0;
        }
        var cardWidth = this.widths.card;
        var currentLeft = -currentCard * cardWidth;
        this.setState({ currentLeft: currentLeft, currentCard: currentCard });
    },
    getVisibleCardCount: function getVisibleCardCount() {
        return this.widths.card ? Math.floor(this.widths.container / this.widths.card) : 1;
    },
    lastVisibleCardIndex: function lastVisibleCardIndex() {
        return this.state.currentCard + this.getVisibleCardCount() - 1;
    },
    canScrollRight: function canScrollRight() {
        return this.lastVisibleCardIndex() + 1 < _react2.default.Children.count(this.props.children);
    },
    canScrollLeft: function canScrollLeft() {
        return this.state.currentCard > 0;
    },
    showArrows: function showArrows() {
        return this.props.showArrows;
    },


    /**
     * Get card offset
     * @param index
     * return negative number if card is on left stack, 0 if visible, positive number if card is on right stack
     */
    getCardOffset: function getCardOffset(index) {
        return (0, _offset.getOffset)({
            index: index,
            firstVisibleIndex: this.state.currentCard,
            lastVisibleIndex: this.lastVisibleCardIndex(),
            visibleStack: this.props.visibleStack,
            stackSpace: this.props.stackSpace
        });
    }
});

exports.default = CardScroll;