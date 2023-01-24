const burgerBtn = document.querySelector('.menu-btn');
const menuPopup = document.createElement('div');
const links = document.querySelectorAll('.steps_title');

menuPopup.classList.add('menu-popup');
document.body.appendChild(menuPopup);

links.forEach((item) => {
  menuPopup.innerHTML += `<div class="link-item"><a href="#${item.dataset.title}">${item.innerHTML}</a></div>`;
});

burgerBtn.addEventListener('click', () => {
  menuPopup.classList.add('open');
  document.body.style.overflow = 'hidden';
});

menuPopup.addEventListener('click', () => {
  menuPopup.classList.remove('open');
  document.body.style.overflow = 'auto';
});

Slider();
window.addEventListener('resize', Slider);

function Slider() {
  const carousel = document.querySelector('.project-slider-wr');
  const wrWidth = document.querySelector('.project-slider').clientWidth;
  const itemsVisible = wrWidth >= 640 ? 2 : 1;
  const slItems = document.querySelectorAll(
    '.project-slider-wr .project-slide'
  );
  const BTN_LEFT = document.querySelector('#arr-prev');
  const BTN_RIGHT = document.querySelector('#arr-next');

  let itemWidth;
  let offset = 0;
  let animationIsInProgress = false;
  itemWidth = wrWidth / itemsVisible;

  slItems.forEach((item) => {
    item.style.width = `${itemWidth}px`;
  });
  const maxOffset = slItems.length - itemsVisible;
  const slWidth = itemWidth * slItems.length;
  carousel.style.width = `${slWidth}px`;

  const handleLeftClick = () => {
    if (!animationIsInProgress) {
      const oldOffset = offset;
      const newOffset = offset - 1;
      offset = newOffset >= 0 ? newOffset : 0;

      if (offset != oldOffset) {
        move();
      }
    }
  };

  const handleRightClick = () => {
    if (!animationIsInProgress) {
      const oldOffset = offset;
      const newOffset = offset + 1;
      offset = newOffset <= maxOffset ? newOffset : maxOffset;

      if (offset != oldOffset) {
        move();
      }
    }
  };

  const move = () => {
    animationIsInProgress = true;
    carousel.style.marginLeft = `-${itemWidth * offset}px`;
  };

  BTN_LEFT.addEventListener('click', handleLeftClick);
  BTN_RIGHT.addEventListener('click', handleRightClick);

  carousel.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'margin-left') {
      animationIsInProgress = false;
    }
  });
}
