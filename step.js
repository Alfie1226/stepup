// 기본 변수들
let steps = 0;             // 걸음 수
let lastMag = 0;           // 이전 크기값
let lastStepTime = 0;      // 마지막으로 걸음으로 인정한 시간(ms)

// 안드로이드 크롬 기준: 바로 이벤트 걸기
window.addEventListener('devicemotion', handleMotion);

function handleMotion(event) {
  const ax = event.accelerationIncludingGravity.x || 0;
  const ay = event.accelerationIncludingGravity.y || 0;
  const az = event.accelerationIncludingGravity.z || 0;

  // 가속도의 크기 구하기
  const mag = Math.sqrt(ax*ax + ay*ay + az*az);
  const now = Date.now();

  // 화면에 지금 센서값 찍기
  document.getElementById('log').innerText = `mag: ${mag.toFixed(2)}`;

  // 걸음으로 인정하는 조건
  // mag가 어느 정도 이상이고
  // 이전 값보다 커지는 순간이고
  // 직전 걸음에서 0.3초는 지나야 함
  if (mag > 12 && mag > lastMag && (now - lastStepTime) > 300) {
    steps++;
    lastStepTime = now;
    document.getElementById('steps').innerText = steps;
  }

  lastMag = mag;
}
