# react-card-scroll
A React component to horizontally navigate between components of same width (Bootstrap cards for example).  
It is responsive and support card adds and removes with `getCardCount` function.


For example you can have 3 cards on the screen and there is a total of 5 cards, you can navigate right or left to the cards not displayed.  
You resize and you display only 2 cards, you can still navigate to the other cards

## Installation
```bash
npm i -S react-card-scroll
```

## Usage

```jsx
<CardScroll getCardWidth={getCardWidth} getCardCount={getCardCount}>
    <div className="col-sm-6 col-md-4">
    </div>
    
    <div className="col-sm-6 col-md-4">
    </div>
    
    <div className="col-sm-6 col-md-4">
    </div>
    
    <div className="col-sm-6 col-md-4">
    </div>
    
    <div className="col-sm-6 col-md-4">
    </div>
</CardScroll>
```

From parent, trigger navigation when you want (add, remove cards):

```javascript
this.refs.cardScroll.scrollCards({toLeft: true, number:1})
```

## TODO
- [ ] Tests
- [x] Example
- Features
    - [ ] CSS arrows
    - [ ] Disable arrows if unable to navigate
    - [ ] Mouse scroll triggers horizontal scroll
- Fix
    - [ ] Remove horizontal scroll bar
- Technical
    - [x] CSS loader
    - [ ] Improve packaging
