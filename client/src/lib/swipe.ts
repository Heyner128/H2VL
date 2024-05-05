type SwipeDirection = 'right' | 'left' | 'none';

export default function swipeDetect(element: HTMLElement, callback: (direction: SwipeDirection) => void) {

    const touchSurface = element;
    const threshold: number = 70;
    const restraint: number = 100;
    const allowedTime: number = 300;
    const handleSwipe = callback || function(){}

    let swipeDirection: SwipeDirection = 'none';
    let startX: number = 0;
    let startY: number = 0;
    let startTime: number = 0;
    let distanceX: number = 0;
    let distanceY: number = 0;
    let elapsedTime: number = 0;



    touchSurface.addEventListener('touchstart', function(event){
        const touchObject = event.changedTouches[0];
        startX = touchObject.pageX;
        startY = touchObject.pageY;
        startTime = new Date().getTime();
        event.preventDefault();
    }, false)

    touchSurface.addEventListener('touchmove', function(e){
        e.preventDefault();
    }, false)

    touchSurface.addEventListener('touchend', function(event){
        const touchObject = event.changedTouches[0];
        distanceX = touchObject.pageX - startX;
        distanceY = touchObject.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= restraint){
                swipeDirection = (distanceX < 0)? 'left' : 'right';
            } else {
                swipeDirection = 'none';
            }
        }
        handleSwipe(swipeDirection);
        event.preventDefault();
    }, false)
}