const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const storeModel = require('../../../models/storeModel');

describe('Insere um novo produto no DB', () => {
    const payload = {
        name: 'Test',
    }

    before(async () => {
        const execute = [{ insertId: 1}];

        sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
        connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
            const response = await storeModel.newProduct(payload);

            expect(response).to.be.a('object');
        })
        
        it('tal objeto possui o "name" do novo produto inserido', async () => {
            const response = await storeModel.newProduct(payload);
            
            expect(response).to.have.a.property('name');
        });
    });
});

describe('Insere uma nova venda no DB', () => {
    const payload = [{
      productId: 1,
      quantity: 4
    }]

    before(async () => {
        const execute = [{ insertId: 1}];

        sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
        connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
            const response = await storeModel.newSales(payload);

            expect(response).to.be.a('object');
        })
        
        it('tal objeto possui "id" e "itemsSold" da nova venda inserido', async () => {
            const response = await storeModel.newSales(payload);
            
          expect(response).to.include.all.keys('id', 'itemsSold');
        });
    });
});

describe('Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna null', async () => {
      const response = await storeModel.findForId();
      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o ID informado', () => {

    before(() => {
      sinon.stub(storeModel, 'findForId')
        .resolves(
          {
            id: 1,
            name: "Martelo de Thor",
          }
        );
    });

    after(() => {
      storeModel.findForId.restore();
    });

    it('retorna um objeto', async () => {
      const response = await storeModel.findForId(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await storeModel.findForId(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id" e "name"', async () => {
      const item = await storeModel.findForId(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});
