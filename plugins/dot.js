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
        this.pixelsPerSecond = 550;
        this.currentPosition = { x: 0, y: 0 };
        this.isRunning = false;
        this.movementMode = 'emdr-linear'
    }

    // Set the speed of movement in Pixels per Second.
    Dot.prototype.setMovementMode = function(mode) {
        this.movementMode = mode;
    }

    // Set the speed of movement in Pixels per Second.
    Dot.prototype.setSpeed = function(pxPerSec) {
        this.pixelsPerSecond = pxPerSec;
    }
    
    Dot.prototype._getContainerSize = function() {
       if (this.$dotContainer === window) {
           return { 'height' : this.$dotContainer.innerHeight, 'width' : this.$dotContainer.innerWidth };
       } else {
            return { 'height' : this.$dotContainer.clientHeight, 'width' : this.$dotContainer.clientWidth };
       }
    }
    
    Dot.prototype._getNewLocation = function() {
    
        // Get container dimensions minus div size
        const containerSize = this._getContainerSize();
        const availableHeight = containerSize.height - this.$dot.clientHeight;
        const availableWidth = containerSize.width - this.$dot.clientHeight;
        // Pick a place in the space
        let x,y = 0
        if(this.movementMode === 'emdr-linear'){
            y = Math.floor(availableHeight/2)
            x = this.currentPosition.x >= availableWidth ? 5 : availableWidth
        }else if(this.movementMode === 'random'){
            y = Math.floor(randomIntFromInterval(1,availableHeight));
            x = Math.floor(randomIntFromInterval(1,availableWidth));
        }
        console.log('movementMode',this.movementMode)
        return { x, y };    
    }
    
    Dot.prototype._calcDelta = function(a, b) {
        const dx   = a.x - b.x;         
        const dy   = a.y - b.y;         
        const dist = Math.sqrt( dx*dx + dy*dy ); 
        return dist;
    }
    
    Dot.prototype._moveOnce = function() {
        // Pick a new spot on the page
        const next = this._getNewLocation();
        
        // How far do we have to move?
        const delta = this._calcDelta(this.currentPosition, next);
        
        // Speed of this transition, rounded to 2DP
        const speed = Math.round((delta / this.pixelsPerSecond) * 100) / 100;
        
        //console.log(this.currentPosition, next, delta, speed);
              
        this.$dot.style.transition='transform '+speed+'s linear';
        this.$dot.style.transform='translate3d('+next.x+'px, '+next.y+'px, 0)';
        
        // Save this new position ready for the next call.
        this.currentPosition = next;
      
    };
    
    Dot.prototype.start = function() {
    
        if (this.isRunning) {
            return;
        }
    
        // Make sure our object has the right css set
        this.$dot.willChange = 'transform';
        this.$dot.pointerEvents = 'auto';
            
        this.boundEvent = this._moveOnce.bind(this)
        
        // Bind callback to keep things moving
        this.$dot.addEventListener('transitionend', this.boundEvent);
        
        // Start it moving
        this._moveOnce();
        
        this.isRunning = true;
    }
    
    Dot.prototype.stop = function() {
    
        if (!this.isRunning) {
            return;
        }
      
        this.$dot.removeEventListener('transitionend', this.boundEvent);
      
        this.isRunning = false;
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
}