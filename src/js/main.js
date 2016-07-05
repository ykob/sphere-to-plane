import initIndex from './init/index.js'

const { pathname } = window.location;

const init = () => {
  switch (pathname.replace('index.html', '')) {
    case '/':
      initIndex();
      break;
    default:
  }
}
init();
