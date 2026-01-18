// Interactive Triangle Pattern Animation
// Arrows rotate to follow the cursor

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('triangle-pattern');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    const arrows = [];
    const rows = 8;
    const cols = 8;

    // SVG templates
    const outlineSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20L12 4L20 20H4Z" stroke="#0c0c0c" stroke-width="1" fill="none"/></svg>';
    const filledSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="#1a5f5e" xmlns="http://www.w3.org/2000/svg"><path d="M4 20L12 4L20 20H4Z" fill="#1a5f5e"/></svg>';

    // Create arrow elements
    for (var i = 0; i < rows * cols; i++) {
        var arrow = document.createElement('div');
        arrow.className = 'triangle-arrow';
        arrow.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease-out;';

        // Filled arrow at position 45
        var isFilled = (i === 45);
        arrow.innerHTML = isFilled ? filledSvg : outlineSvg;

        var initialRotation = Math.random() * 360;
        arrow.style.transform = 'rotate(' + initialRotation + 'deg)';

        container.appendChild(arrow);
        arrows.push({
            element: arrow,
            initialRotation: initialRotation
        });
    }

    // Update arrows on mouse move
    document.addEventListener('mousemove', function (e) {
        for (var j = 0; j < arrows.length; j++) {
            var arrowData = arrows[j];
            var arrow = arrowData.element;
            var rect = arrow.getBoundingClientRect();
            var arrowCenterX = rect.left + rect.width / 2;
            var arrowCenterY = rect.top + rect.height / 2;

            // Calculate angle to cursor
            var deltaX = e.clientX - arrowCenterX;
            var deltaY = e.clientY - arrowCenterY;
            var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

            arrow.style.transform = 'rotate(' + angle + 'deg)';
        }
    });

    // Reset to random positions when mouse leaves the container
    container.addEventListener('mouseleave', function () {
        for (var k = 0; k < arrows.length; k++) {
            var arrowData = arrows[k];
            arrowData.element.style.transform = 'rotate(' + arrowData.initialRotation + 'deg)';
        }
    });
});
