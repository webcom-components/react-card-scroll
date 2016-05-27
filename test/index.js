import test from 'tape'
import {getOffset} from '../src/offset'

test('getOffset() all visible', assert => {
    const msg = "no offset for all cards"
    const expected = [0, 0, 0]
    const testGetOffset = index => getOffset({index, firstVisibleIndex:0, lastVisibleIndex:2})
    const actual = [0,1,2].map((e, i) => testGetOffset(i))
    assert.deepEqual(actual, expected, msg)
    assert.end()
})

test('getOffset() 1 hidden on left', assert => {
    const msg = "only first card offset of -2"
    const stackSpace = 2
    const expected = [-stackSpace, 0, 0, 0]
    const testGetOffset = index => getOffset({index, firstVisibleIndex:1, lastVisibleIndex:3, stackSpace})
    const actual = [0,1,2,3].map(i => testGetOffset(i))
    assert.deepEqual(actual, expected, msg)
    assert.end()
})

test('getOffset() 6 hidden on left', assert => {
    const msg = "two most left are on top of each others"
    const stackSpace = 2
    const visibleStack = 3
    const expected = [-4*stackSpace-1, -4*stackSpace-1,-4*stackSpace,-3*stackSpace,-2*stackSpace,-stackSpace, 0, 0, 0]
    const testGetOffset = index => getOffset({index, firstVisibleIndex:6, lastVisibleIndex:8, stackSpace, visibleStack})
    const actual = [0,1,2,3,4,5,6,7,8].map(i => testGetOffset(i))
    assert.deepEqual(actual, expected, msg)
    assert.end()
})

test('getOffset() 1 hidden on each side', assert => {
    const msg = "first and last card offset"
    const stackSpace = 2
    const expected = [-stackSpace, 0, 0, 0, stackSpace]
    const testGetOffset = index => getOffset({index, firstVisibleIndex:1, lastVisibleIndex:3, stackSpace})
    const actual = [0,1,2,3,4].map(i => testGetOffset(i))
    assert.deepEqual(actual, expected, msg)
    assert.end()
})

test('getOffset() 6 hidden on each side', assert => {
    const msg = "offsets"
    const stackSpace = 2
    const visibleStack = 3
    const expected = [-4*stackSpace-1, -4*stackSpace-1,-4*stackSpace,-3*stackSpace,-2*stackSpace,-stackSpace, 0, 0, 0, 
        stackSpace, 2*stackSpace, 3*stackSpace,4*stackSpace, 4*stackSpace+1, 4*stackSpace+1]
    const testGetOffset = index => getOffset({index, firstVisibleIndex:6, lastVisibleIndex:8, stackSpace, visibleStack})
    const actual = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => testGetOffset(i))
    assert.deepEqual(actual, expected, msg)
    assert.end()
})
