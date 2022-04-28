function PageCss(name, env) {
  if (env !== 3000) {
    this.css = `https://eruc-english-card.herokuapp.com/stylesheets/${name}.css`
  } else {
    this.css = `https://localhost:3000/stylesheets/${name}.css`
  }
}

module.exports = {
  PageCss
}