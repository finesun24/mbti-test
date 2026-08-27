// MBTI 공부법 연구소 - 공부습관 자가진단 채점 로직

var GROUPS = {
  NT: { label: 'NT 분석가형', emoji: '🧠', url: 'nt.html', desc: '원리를 이해하고 전략적으로 계획하는 학습자예요.' },
  NF: { label: 'NF 외교관형', emoji: '🌸', url: 'nf.html', desc: '의미와 스토리로 연결해 배우는 학습자예요.' },
  SJ: { label: 'SJ 관리자형', emoji: '📘', url: 'sj.html', desc: '체계적인 계획과 반복으로 다지는 학습자예요.' },
  SP: { label: 'SP 탐험가형', emoji: '⚡', url: 'sp.html', desc: '직접 부딪히며 몸으로 익히는 학습자예요.' }
};

var TOTAL_QUESTIONS = 10;

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('quiz-form');
  var warning = document.getElementById('quiz-warning');
  var resultBox = document.getElementById('result-box');

  form.addEventListener('change', function (e) {
    if (e.target.name && e.target.name.indexOf('q') === 0) {
      var labels = form.querySelectorAll('input[name="' + e.target.name + '"]');
      labels.forEach(function (input) {
        input.closest('.option-label').classList.toggle('checked', input.checked);
      });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var scores = { NT: 0, NF: 0, SJ: 0, SP: 0 };
    var answeredCount = 0;

    for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
      var selected = form.querySelector('input[name="q' + i + '"]:checked');
      if (selected) {
        answeredCount++;
        scores[selected.value]++;
      }
    }

    if (answeredCount < TOTAL_QUESTIONS) {
      warning.textContent =
        '아직 ' + (TOTAL_QUESTIONS - answeredCount) + '개 문항에 답하지 않았어요. 모든 문항에 답해주세요.';
      return;
    }

    warning.textContent = '';
    renderResult(scores);
  });

  function renderResult(scores) {
    var sortedKeys = Object.keys(scores).sort(function (a, b) {
      return scores[b] - scores[a];
    });
    var topKey = sortedKeys[0];
    var top = GROUPS[topKey];

    document.getElementById('result-emoji').textContent = top.emoji;
    document.getElementById('result-title').textContent = top.label;
    document.getElementById('result-desc').textContent = top.desc;

    var barsWrap = document.getElementById('result-bars');
    barsWrap.innerHTML = '';
    sortedKeys.forEach(function (key) {
      var row = document.createElement('div');
      row.className = 'bar-row' + (key === topKey ? ' top' : '');
      row.innerHTML =
        '<span>' + GROUPS[key].emoji + ' ' + key + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' +
        (scores[key] / TOTAL_QUESTIONS) * 100 +
        '%"></span></span>' +
        '<span>' + scores[key] + '점</span>';
      barsWrap.appendChild(row);
    });

    var goBtn = document.getElementById('go-group-btn');
    goBtn.href = top.url;
    goBtn.textContent = top.label + ' 공부법 보러가기';

    var shareBtn = document.getElementById('share-result-btn');
    shareBtn.setAttribute('data-share-title', 'MBTI 공부법 자가진단 결과');
    shareBtn.setAttribute(
      'data-share-text',
      '나의 공부 유형은 ' + top.label + '! 너의 공부 유형도 확인해봐 🙌'
    );
    shareBtn.setAttribute('data-share-url', window.location.origin + window.location.pathname.replace(/study\.html$/, 'study.html'));

    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
