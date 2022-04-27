(function () {
  //Blocks
  const menu = document.querySelector(`.menu`);
  const menuButton = document.querySelector(`.header__button`);

  //Classes
  const menuClosedClass = `menu--closed`;
  const buttonMenuClosedClass = `header__button--menu-closed`;

  // Events
  menuButton.addEventListener(`click`, () => {
    menu.classList.toggle(menuClosedClass);
    menuButton.classList.toggle(buttonMenuClosedClass);
  });
})();

