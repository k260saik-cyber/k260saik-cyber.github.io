// HTMLのDOMが完全に読み込まれるのを待つ、おまじない
document.addEventListener('DOMContentLoaded', () => {

  // --- スクロールアニメーションのコード（これはそのまま） ---
  const animatedItems = document.querySelectorAll('.lesson-card, .goal-item');
  const checkAnimation = () => {
    animatedItems.forEach(item => {
      const triggerBottom = window.innerHeight * 0.9;
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        item.classList.add('is-visible');
      } else {
        item.classList.remove('is-visible');
      }
    });
  };
  window.addEventListener('load', checkAnimation);
  window.addEventListener('scroll', checkAnimation);


  // --- ここからが、新しい「動的モーダルシステム」のコード ---

  // 1. 必要なHTML要素を変数に入れる
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalOpenTriggers = document.querySelectorAll('.lesson-card');

  // 2. モーダルを開くための、進化した魔法
  const openModal = (content) => {
    modalBody.innerHTML = content;
    modalOverlay.classList.remove('is-hidden');
  };

  // 3. モーダルを閉じるための魔法
  const closeModal = () => {
    modalOverlay.classList.add('is-hidden');
  };

  // 4. すべてのカードに対して、「クリックされたら」という監視をセットする
  modalOpenTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      // ★ここがシステムの心臓部！★（修正済み）
      const targetCard = trigger;
      // lesson-cardではない、-cardで終わるクラスを探す
      const targetId = Array.from(targetCard.classList).find(c => c.endsWith('-card') && c !== 'lesson-card');
      
      if (targetId) {
        const dataWarehouse = document.querySelector(`#modal-data-warehouse [data-modal-target="${targetId}"]`);
        
        if (dataWarehouse) {
          const contentToDisplay = dataWarehouse.innerHTML;
          openModal(contentToDisplay);
        }
      }
    });
  });

  // 5. 「×」ボタンや背景クリックで、モーダルを閉じる
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

});