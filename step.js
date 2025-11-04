const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', async () => {
  // 아이폰일 때 권한 요청
  if (typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function') {
    const res = await DeviceMotionEvent.requestPermission();
    if (res !== 'granted') {
      alert('센서 허용해줘야 돼!');
      return;
    }
  }

  // 여기서부터 진짜로 흔들기 감지
  window.addEventListener('devicemotion', handleMotion);
  alert('시작! 이제 흔들어봐');
});

let lastPower = 0;

function handleMotion(e) {
  const x = e.accelerationIncludingGravity.x || 0;
  const y = e.accelerationIncludingGravity.y || 0;
  const z = e.accelerationIncludingGravity.z || 0;

  const power = Math.sqrt(x*x + y*y + z*z);

  // 이 if 안에다 몬스터 HP 깎는 함수 넣으면 됨
  if (power > 18 && lastPower <= 18) {
    console.log('step!');
    // attackMonster();
  }

  lastPower = power;
}
