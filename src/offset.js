

export const getOffset = ({index, firstVisibleIndex, lastVisibleIndex, visibleStack=3, stackSpace=5}) => {
    if(index >= firstVisibleIndex && index <=lastVisibleIndex){
        return 0
    }
    let offset = index - firstVisibleIndex
    if(offset>0){
        offset = index - lastVisibleIndex
    }
    if(Math.abs(offset) > visibleStack +1){
        return Math.sign(offset)*((visibleStack+1)*stackSpace+1)
    }
    return offset*stackSpace
}

export const getMaxOffset = ({visibleStack=3, stackSpace=5}={}) => ((visibleStack+1)*stackSpace+1)
