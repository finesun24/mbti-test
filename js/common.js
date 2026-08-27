// MBTI 공부법 연구소 - 공통 스크립트 (공유 버튼 등)

function showToast(message) {
  var toast = document.querySelector('.share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'share-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(function () {
    toast.classList.remove('show');
  }, 2200);
}

function bindShareButtons() {
  var buttons = document.querySelectorAll('[data-share]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var title = btn.getAttribute('data-share-title') || document.title;
      var text = btn.getAttribute('data-share-text') || '';
      var url = btn.getAttribute('data-share-url') || window.location.href;

      if (navigator.share) {
        navigator.share({ title: title, text: text, url: url }).catch(function () {});
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(function () {
            showToast('링크가 복사되었습니다!');
          })
          .catch(function () {
            showToast(url);
          });
      } else {
        window.prompt('아래 링크를 복사해서 친구에게 공유해보세요', url);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', bindShareButtons);
