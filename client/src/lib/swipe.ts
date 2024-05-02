type SwipeDirection = 'right' | 'left' | 'up' | 'down' | 'none';

export default function swipeDetect(element: HTMLElement, callback: (direction: SwipeDirection) => void) {

    const touchSurface = element;
    const threshold: number = 150;
    const restraint: number = 100;
    const allowedTime: number = 300;
    const handleSwipe = callback || function(swipeDirection){}

    let swipeDirection: SwipeDirection = 'none';
    let startX: number = 0;
    let startY: number = 0;
    let startTime: number = 0;
    let distanceX: number = 0;
    let distanceY: number = 0;
    let elapsedTime: number = 0;



    touchSurface.addEventListener('touchstart', function(e){
        const touchObject = e.changedTouches[0]
        startX = touchObject.pageX
        startY = touchObject.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchSurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchSurface.addEventListener('touchend', function(e){
        const touchObject = e.changedTouches[0]
        distanceX = touchObject.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distanceY = touchObject.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= restraint){ // 2nd condition for horizontal swipe met
                swipeDirection = (distanceX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distanceY) >= threshold && Math.abs(distanceX) <= restraint){ // 2nd condition for vertical swipe met
                swipeDirection = (distanceY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleSwipe(swipeDirection)
        e.preventDefault()
    }, false)
}