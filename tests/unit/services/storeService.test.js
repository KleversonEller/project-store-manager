const { expect } = require('chai');
const sion = require('sinon');

const storeModel = require('../../../models/storeModel');
const storeService = require('../../../services/storeService');

describe('Insere um novo produto no DB', () => {
    describe('quando é inserido com sucesso', () => {
        const payload = {
            name: 'test'
        };

        before(() => {
            sion.stub(storeModel, 'newProduct').resolves(payload);
        });

        after(() => {
            storeModel.newProduct.restore();
        });

        it('retorna um objeto', async () => {
            const response = await storeService.newProduct(payload);

            expect(response).to.be.a('object');
        });

        it('tal objeto possui o "name" do novo filme inserido', async () => {
            const response = await storeService.newProduct(payload);

            expect(response).to.be.a.property('name');
        });
    });
});

describe('Insere uma nova venda no DB', () => {
    describe('quando é inserido com sucesso', () => {
        const payload = [{
      productId: 1,
      quantity: 4
    }];

        before(() => {
            sion.stub(storeModel, 'newSales').resolves(payload);
        });

        after(() => {
            storeModel.newSales.restore();
        });

        it('retorna um array', async () => {
            const response = await storeService.newSales(payload);

            expect(response).to.be.a('array');
        });
    });
});

describe('Busca um produto pelo ID', () => {
    describe('quando é encontrado o produto', () => {
      const payload = {
            id: 1,
            name: "Martelo de Thor",
          };

        before(() => {
            sion.stub(storeModel, 'findForId').resolves(payload);
        });

        after(() => {
            storeModel.findForId.restore();
        });

        it('retorna um objeto', async () => {
            const response = await storeService.findForId(1);

            expect(response).to.be.a('object');
        });
      
        it('tal objeto possui a propriedade: "name"', async () => {
        const item = await storeModel.findForId(1);

        expect(item).to.include.all.keys('name', 'id');
      });
    });
});