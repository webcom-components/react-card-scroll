# react-card-scroll  

[![Travis](https://img.shields.io/travis/webcom-components/react-card-scroll.svg?style=flat-square)](https://travis-ci.org/webcom-components/react-card-scroll)
[![Codecov](https://img.shields.io/codecov/c/github/webcom-components/react-card-scroll.svg?style=flat-square)](https://codecov.io/gh/webcom-components/react-card-scroll)
[![npm](https://img.shields.io/npm/v/react-card-scroll.svg?style=flat-square)](https://www.npmjs.com/package/react-card-scroll)  


A React component to horizontally navigate between components of same width (Bootstrap cards for example).  
It is responsive and support dynamic card adds and removes.

You decide how many cards will be simultaneously visible depending on screen size, in the bootstrap style. You can then navigate to the other cards depending on how you want to implement it. If you don't want to implement anything, you can use default arrows.

Visually you have a left stack of cards, visible cards in the middle, and a right stack.

## New in 2.x

**New in 2.1:** expose stacks parameters  
Using stacks instead of sliding cards out of the screen  
Pass children CSS class as props  
Doesn't use react-motion anymore  

## Installation
```bash
npm i -S react-card-scroll
```

## Usage

Import css either in sass ```~react-card-scroll/lib/assets/styles.css``` or in javascript with webpack

Use bootstrap style to decide how many cards will be visible at a give screen size (just add ```rcs-```): ```rcs-col-*-*```. You don't have to include bootstrap.

Choose how you want to implement the navigation by using ```scrollCards({toLeft: true/false, number:*})```.For example, you can scroll when you click on a stack or when you wheel your mouse with the pointer on a card title.
See the example: ```npm run example``` and open ```localhost:8081```. And get inspiration from the source code.

You can know where a card is with the ```getCardOffset``` function in JavaScript, or with the CSS classes ```rcs-left-stack rcs-center rcs-right-stack```

Use default navigation arrows with props ```showArrows={true}```

You can change the default parameters ```visibleStack``` et ```stackSpace```, which determine how many cards of the stacks are shifted on the sides, and by how many pixels.

## Example demo
![react-card-scroll](https://cloud.githubusercontent.com/assets/11945259/15610699/db52c656-2426-11e6-9228-dd622dadfb86.gif)

## Some (very) basic usage
```jsx
<CardScroll 
    ref="cardScroll" 
    childrenClass="rcs-col-sm-6 rcs-col-md-4"
    visibleStack={1}
    stackSpace={25}>
    <div>
        Hello
    </div>
    
    <div>
        World
    </div>
    
    <div>
        Foo
    </div>
    
    <div>
        Bar
    </div>
</CardScroll>
```

From parent, trigger navigation when you want (add or remove cards, click somewhere, mouse wheel, ...):

```javascript
this.refs.cardScroll.scrollCards({toLeft: true, number:1})
```

## TODO
- [ ] Improve margin stack algorithm
