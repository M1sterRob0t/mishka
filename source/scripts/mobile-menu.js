(function () {
  //Blocks
  const header = document.querySelector(`.header`);
  const menu = header.querySelector(`.menu`);
  const menuButton = header.querySelector(`.header__button`);

  //Classes
  const menuClosedClass = `menu--closed`;
  const buttonMenuClosedClass = `header__button--menu-closed`;
  const headerNoJsClass = `header--no-js`;
  const menuNoJsClass = `menu--no-js`;

  // Instructions
  header.classList.remove(headerNoJsClass);
  menu.classList.remove(menuNoJsClass);

  menuButton.addEventListener(`click`, () => {
    menu.classList.toggle(menuClosedClass);
    menuButton.classList.toggle(buttonMenuClosedClass);
  });
})();

