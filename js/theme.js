// MBTI 공부법 연구소 - 다크/라이트 모드 토글

function getEffectiveTheme() {
  var attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateToggleButton(btn, theme) {
  if (!btn) return;
  if (theme === 'dark') {
    btn.textContent = '☀️';
    btn.setAttribute('aria-label', '라이트 모드로 전환');
  } else {
    btn.textContent = '🌙';
    btn.setAttribute('aria-label', '다크 모드로 전환');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('theme-toggle');
  updateToggleButton(btn, getEffectiveTheme());

  if (!btn) return;

  btn.addEventListener('click', function () {
    var next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('mbti-theme', next);
    } catch (e) {}
    updateToggleButton(btn, next);
  });
});
