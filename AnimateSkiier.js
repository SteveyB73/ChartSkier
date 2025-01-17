function animateSkier(data) {
  const skier = document.getElementById('skier');
  const numPoints = data.getNumberOfRows();
  let currentPoint = 0;

  function moveSkier() {
    if (currentPoint >= numPoints - 1) return;

    const x1 = chartLayout.getXLocation(data.getValue(currentPoint, 0));
    const y1 = chartLayout.getYLocation(data.getValue(currentPoint, 1));
    const x2 = chartLayout.getXLocation(data.getValue(currentPoint + 1, 0));
    const y2 = chartLayout.getYLocation(data.getValue(currentPoint + 1, 1));

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    let step = 0;
    const steps = 100;

    function stepMove() {
      if (step > steps) {
        currentPoint++;
        moveSkier();
        return;
      }

      const progress = step / steps;
      const x = x1 + progress * deltaX;
      const y = y1 + progress * deltaY;

      skier.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

      step++;
      requestAnimationFrame(stepMove);
    }

    stepMove();
  }

  moveSkier();
}
