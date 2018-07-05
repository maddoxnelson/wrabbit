import editorHelpers from '../public/javascripts/modules/editorHelpers';

describe('Test the autosize function', () => {

  test('It should teach how to manipulate the dom', () => {

    document.body.innerHTML = `<div id="hello">Hello World!</div>`;

    const div = document.querySelector('#hello');

    div.classList.add('dogs')

    expect(div.classList.contains('dogs')).toBe(true)

  });

})
