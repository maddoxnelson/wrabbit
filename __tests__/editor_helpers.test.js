import { sizeTextAreaOnResize, autosize, sizeTextAreaOnKeydown } from '../public/javascripts/modules/editorHelpers';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Test the autosize functions', () => {
  beforeEach(() => {
      const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
      global.document = new JSDOM(documentHTML);
      global.window = document.parentWindow;
      global.document.body.innerHTML = `<textarea id="textarea"></textarea>`;
      const textArea = global.document.querySelector('textarea');
      textArea.style.height = '500px';
      global.textArea = textArea;
  });

  test('It should should autosize an element to the scrollHeight of it', () => {
    autosize(textArea)
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  })

  test('It should call the autosize method when the window is resized', () => {
    sizeTextAreaOnResize(textArea)
    window.resizeTo = (width, height) => {
      window.innerWidth = width || window.innerWidth;
      window.innerHeight = width || window.innerHeight;
      window.dispatchEvent(new Event('resize'));
    };
    window.resizeTo(500, 600)
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  });

  test('It should resize the text area on keydown', () => {
    sizeTextAreaOnKeydown(textArea)
    textArea.dispatchEvent(new Event('keydown'))
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  })

})
