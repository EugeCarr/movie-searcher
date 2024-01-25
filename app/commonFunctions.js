export const convertVwToPx = (viewWidth) =>{
    const viewPortWidth = document.documentElement.clientWidth;
    return Math.round(viewPortWidth * viewWidth/ 100);
};