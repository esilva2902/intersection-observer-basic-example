let prevRatio = 0.0;
let increasingColor = 'rgba(40, 40, 190, ratio)';
let decreasingColor = 'rgba(190, 40, 40, ratio)';

window.addEventListener('load', (event) => {
    let intersectionRoot = document.querySelector('main');
    let elements = document.querySelectorAll("#box");
    let thresholds = buildThresholdList(4);

    console.log(`thresholds: `, thresholds);

    createObserver({
        root: intersectionRoot,
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholds

    }, elements);

}, false);
  
let createObserver = (options, observedElements) => {
    let observer = new IntersectionObserver(handleIntersect, options);

    observedElements.forEach(el => {
        observer.observe(el);
    });
}

let buildThresholdList = (numSteps) => {
    let thresholds = [ ];

    for (let i=1.0; i<=numSteps; i++) {
        let ratio = i/numSteps;
        thresholds.push(ratio);
    }
  
    thresholds.push(0);

    return thresholds;
  };
  
let handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
        console.log(`entry: `, entry);
        // console.log(`entry.intersectionRatio: `, entry.intersectionRatio);

        if (entry.intersectionRatio > prevRatio) {
            entry.target.style.backgroundColor = increasingColor.replace('ratio', entry.intersectionRatio);

        } else {
            entry.target.style.backgroundColor = decreasingColor.replace('ratio', entry.intersectionRatio);
        }
  
        prevRatio = entry.intersectionRatio;

    });
}