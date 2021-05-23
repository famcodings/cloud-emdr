export default ({ app, store }, inject) => {
    let dot = null
    inject('instantiateDot', (obj, container) => {
        dot = new Dot(obj, container)
    })
    inject('getDot', () => dot)
    function Dot(obj, container) {
        this.$dot = obj;
        this.$dotContainer = container;
        this.containerIsWindow = container === window;
        this.dotSpeed = 250;
        this.currentPosition = { x: 0, y: 20 };
        this.isRunning = false;
        this.movementMode = 'emdr-linear'
        this.jQueryAnimation = null
        this.directionDuringLinearMovement = 'right'
    }

    // Set the speed of movement in Pixels per Second.
    Dot.prototype.setMovementMode = function(mode) {
        this.movementMode = mode;
        this.resetPosition()
    }

    Dot.prototype.resetPosition = function() {
        // const { availableHeight, availableWidth} = this._getContainerDimensions()
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        if(this.movementMode === 'emdr-non-linear' || this.movementMode === 'diagonal-flipped'){
            this.currentPosition = {x: 20, y: 20}
        }else if(this.movementMode === 'diamond'){
            this.currentPosition = {x: Math.floor(availableWidth/2), y: 20}
        }else if(this.movementMode === 'diagonal'){
            this.currentPosition = {x: 20, y: availableHeight}
        }else if(this.movementMode === 'emdr-linear'){
            this.currentPosition = {x: 20, y: Math.floor(availableHeight/2)}
        }
        $(this.$dot).css({left:`${this.currentPosition.x}px`, top: `${this.currentPosition.y}px`})
    }

    Dot.prototype._getContainerDimensions = function() {
        const containerSize = this._getContainerSize();
        const availableHeight = containerSize.height - this.$dot.clientHeight - 20;
        const availableWidth = containerSize.width - this.$dot.clientHeight - 20;
        return {
            availableHeight,
            availableWidth,
        }
    }

    // Set the speed of movement in Pixels per Second.
    Dot.prototype.setSpeed = function(pxPerSec) {
        this.dotSpeed = pxPerSec;
    }
    
    Dot.prototype._getContainerSize = function() {
       if (this.$dotContainer === window) {
           return { 'height' : this.$dotContainer.innerHeight, 'width' : this.$dotContainer.innerWidth };
       } else {
            return { 'height' : this.$dotContainer.clientHeight, 'width' : this.$dotContainer.clientWidth };
       }
    }

    Dot.prototype._getNext8ShapeLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        if(this.currentPosition.x === 20){
            if(this.currentPosition.y === 20){
                x = availableWidth
                y = availableHeight
            }
            if(this.currentPosition.y === availableHeight){
                x = 20
                y = 20
            }
        }
        if(this.currentPosition.x === availableWidth){
            if(this.currentPosition.y === availableHeight){
                x = availableWidth
                y = 20
            }
            if(this.currentPosition.y === 20){
                x = 20
                y = availableHeight
            }
        }
        
        if(x === undefined || y === undefined){
            x = availableWidth
            y = availableHeight
        }
        return {x,y}
    }

    Dot.prototype._getNextRandomLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        y = Math.floor(randomIntFromInterval(1,availableHeight));
        x = Math.floor(randomIntFromInterval(1,availableWidth));
        return {x,y}
    }

    Dot.prototype._getNextLinearLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        y = Math.floor(availableHeight/2)
        x = this.currentPosition.x >= availableWidth ? 20 : availableWidth
        return {x,y}
    }

    Dot.prototype._getNextDiagonalLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        if(this.currentPosition.x === 20 && this.currentPosition.y === availableHeight){
            x = availableWidth
            y = 20
        }
        if(this.currentPosition.x === availableWidth && this.currentPosition.y === 20){
            x = 20
            y = availableHeight
        }
        if(x === undefined || y === undefined){
            x = 20
            y = availableHeight
        }
        return {x,y}
    }

    Dot.prototype._getNextDiagonalFlippedLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        if(this.currentPosition.x === 20 && this.currentPosition.y === 20){
            x = availableWidth
            y = availableHeight
        }
        if(this.currentPosition.x === availableWidth && this.currentPosition.y === availableHeight){
            x = 20
            y = 20
        }
        if(x === undefined || y === undefined){
            x = 20
            y = 20
        }
        return {x,y}
    }

    Dot.prototype._getNextDiamondLocation = function() {
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        let x,y = 0
        const midY = Math.floor(availableHeight/2)
        const midX = Math.floor(availableWidth/2)
        if(this.currentPosition.x === midX && this.currentPosition.y === 20){
            x = availableWidth
            y = midY
        }
        if(this.currentPosition.x === availableWidth && this.currentPosition.y === midY){
            x = midX
            y = availableHeight
        }
        if(this.currentPosition.x === midX && this.currentPosition.y === availableHeight){
            x = 20
            y = midY
        }
        if(this.currentPosition.x === 20 && this.currentPosition.y === midY){
            x = midX
            y = 20
        }
        if(x === undefined || y === undefined){
            x = midX
            y = 20
        }
        return {x,y}
    }
    
    Dot.prototype._getNewLocation = function() {
        // Get container dimensions minus div size
        const { availableHeight, availableWidth} = this._getContainerDimensions()
        // Pick a place in the space
        let newLocation = {x:0,y: Math.floor(availableHeight/2)}
        if(this.movementMode === 'emdr-linear'){
            newLocation = this._getNextLinearLocation()
        }else if(this.movementMode === 'random'){
           newLocation = this._getNextRandomLocation()
        }else if(this.movementMode === 'emdr-non-linear'){
            newLocation = this._getNext8ShapeLocation()
        }else if(this.movementMode === 'diamond'){
            newLocation = this._getNextDiamondLocation()
        }else if(this.movementMode === 'diagonal'){
            newLocation = this._getNextDiagonalLocation()
        }else if(this.movementMode === 'diagonal-flipped'){
            newLocation = this._getNextDiagonalFlippedLocation()
        }
        return newLocation
    }
    
    Dot.prototype._moveOnce = function() {
        // Pick a new spot on the page
        const next = this._getNewLocation();
        const speed = (1200 - this.dotSpeed)
        // $(this.$dot).css({
        //     transition: `transform ${speed}s ease-in-out`,
        //     transform: `translateX(${next.x}px) translateY(${next.y}px) translateZ(0px)`,
        // })
        $(this.$dot).animate(
            {left:`${next.x}px`, top: `${next.y}px`},
            {
                duration: speed, //speed in milliseconds 
                easing: 'swing', //easing
                start: (animation) => {
                    this.jQueryAnimation = animation
                },
                step: (now, tween) => {
                    const newSpeed = 1200 - (this.dotSpeed)
                    const reducerPercentage = 0.25
                    this.jQueryAnimation.duration =  newSpeed - (this.dotSpeed*reducerPercentage)

                    const { availableWidth } = this._getContainerDimensions()
                    if(tween.prop === 'left'){
                        if(tween.end > availableWidth){
                            tween.end = availableWidth-20
                        }
                        if(tween.end < availableWidth){
                            if(this.movementMode !== 'random' && this.movementMode !== 'diamond' && next.x !== 20 && next.x < availableWidth){
                                this.jQueryAnimation.duration = 0//this.jQueryAnimation.duration - 500
                                tween.end = availableWidth // -20-20
                            }
                        }
                    }
                },
                done: () => {
                    this._moveOnce()
                    if(this.movementMode === 'emdr-linear')
                        this.directionDuringLinearMovement = this.directionDuringLinearMovement === 'left'? 'right' : 'left'
                },
            }
        )
        // Save this new position ready for the next call.
        this.currentPosition = next;
      
    };
    
    Dot.prototype.start = function() {
    
        if (this.isRunning) {
            return;
        }
        
        this._moveOnce();
        
        // $(this.$dot).on('transitionend webkitTransitionEnd oTransitionEnd', () => {
        //     this._moveOnce();
        // });

        this.isRunning = true;
    }
    
    Dot.prototype.stop = function() {
    
        if (!this.isRunning) {
            return;
        }
      
        this.isRunning = false;

        // const matrix = $(this.$dot).css('-webkit-transform')
        // const translate_val = matrix.match(/-?[\d\.]+/g)
        // this.currentPosition = {x: translate_val[4], y: translate_val[5] }
        // $(this.$dot).css({
        //     transform: `translateX(${this.currentPosition.x}px) translateY(${this.currentPosition.y}px) translateZ(0px)`,
        // })
        // $(this.$dot).off('transitionend webkitTransitionEnd oTransitionEnd')

        $(this.$dot).clearQueue();
        $(this.$dot).stop();
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
}