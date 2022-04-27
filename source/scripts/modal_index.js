(function () {
  //Blocks
  const mainProductButton = document.querySelector(`.main-product__button`);
  const modal = document.querySelector(`.modal`);
  const modalButton = modal.querySelector(`.modal__button`);
  const overlay = document.querySelector(`.page__overlay`);
  console.log(modalButton);

  //Classes
  const showModalClass = `page__modal--shown`;
  const showOverlayClass = `page__overlay--shown`;

  //Functions
  const toggleModalVisibility = () => {
    modal.classList.toggle(showModalClass);
    overlay.classList.toggle(showOverlayClass);
  }

  // Events
  // open modal
  mainProductButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleModalVisibility();
  });

  // close modal
  modalButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleModalVisibility();

  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      toggleModalVisibility();
    }
  });

  overlay.addEventListener(`click`, () => {
    toggleModalVisibility();
  })
})();



