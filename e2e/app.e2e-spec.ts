import { ZhawMoba1Lab8Page } from './app.po';

describe('zhaw-moba1-lab8 App', function() {
  let page: ZhawMoba1Lab8Page;

  beforeEach(() => {
    page = new ZhawMoba1Lab8Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
