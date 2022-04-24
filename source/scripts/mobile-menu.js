(function () {
  //Blocks
  const menu = document.querySelector(`.menu`);
  const menuButton = document.querySelector(`.header__button`);

  //Classes
  const menuHiddenClass = `menu--closed`;

  // Events
  menuButton.addEventListener(`click`, () => {
    menu.classList.toggle(menuHiddenClass);
  })
})();

