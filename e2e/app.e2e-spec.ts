import { ProteinExpressionFrontEndPage } from './app.po';

describe('protein-expression-front-end App', () => {
  let page: ProteinExpressionFrontEndPage;

  beforeEach(() => {
    page = new ProteinExpressionFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
