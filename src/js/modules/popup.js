export default class Popup {
  constructor($elm, name, width, height) {
    this.$elm = $elm;
    this.href = $elm.attr('href');

    if (name) {
      this.name = name;
    } else {
      this.name = '';
    }
    if (width) {
      this.width = width;
    } else {
      this.width = 600;
    }
    if (height) {
      this.height = height;
    } else {
      this.height = 400;
    }

    this.$elm.on('click', () => {
      this.open();
      return false;
    });
  };
  open() {
    window.open(
      this.href,
      this.name,
      `width=${this.width},height=${this.height}`
    );
  };
};
