import { browser, element, by, ElementFinder } from 'protractor';

import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying Page One', () => {
      var item = element(by.className('item'));
      console.log(item.browser_.getTitle());
    });
  })
});