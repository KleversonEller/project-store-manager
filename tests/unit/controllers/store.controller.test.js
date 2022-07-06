const sinon = require('sinon');
const { expect } = require('chai');

const storeService = require('../../../services/storeService');
const storeController = require('../../../controllers/storeController');

describe('Ao chamar o controller de findForId', () => {
  describe('quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeService, 'findForId')
        .resolves({
        id: 1,
        name: "Martelo de Thor",
      });
    });

    after(() => {
      storeService.findForId.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await storeController.findForId(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await storeController.findForId(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de newProduct', () => {
  describe('quando inserir produtos com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'testando'
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeService, 'newProduct')
        .resolves({
          id: 4,
          name: 'testando'
        });
    });

    after(() => {
      storeService.newProduct.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await storeController.newProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await storeController.newProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de newSales', () => {
  describe('quando inserir vendas com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [{
      productId: 1,
      quantity: 4
    }];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeService, 'newSales')
        .resolves([{
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 4
          }
        ]
      }]);
    });

    after(() => {
      storeService.newSales.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await storeController.newSales(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await storeController.newSales(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});