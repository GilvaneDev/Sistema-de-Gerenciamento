import React, { useState, useEffect, useContext } from "react";
import AdicionarVenda from "../components/AddSale";
import AuthContext from "../AuthContext";

function Vendas() {
  const [mostrarModalVenda, setMostrarModalVenda] = useState(false);
  const [vendas, setDadosTodasVendas] = useState([]);
  const [produtos, setTodosProdutos] = useState([]);
  const [lojas, setTodasLojas] = useState([]);
  const [atualizarPagina, setAtualizarPagina] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    buscarDadosVendas();
    buscarDadosProdutos();
    buscarDadosLojas();
  }, [atualizarPagina]);

  // Buscar dados de todas as vendas
  const buscarDadosVendas = () => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setDadosTodasVendas(data);
      })
      .catch((err) => console.log(err));
  };

  // Buscar dados de todos os produtos
  const buscarDadosProdutos = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setTodosProdutos(data);
      })
      .catch((err) => console.log(err));
  };

  // Buscar dados de todas as lojas
  const buscarDadosLojas = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setTodasLojas(data);
      });
  };

  // Modal para adicionar venda
  const configurarModalVenda = () => {
    setMostrarModalVenda(!mostrarModalVenda);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {mostrarModalVenda && (
          <AdicionarVenda
            configurarModalVenda={configurarModalVenda}
            produtos={produtos}
            lojas={lojas}
            atualizarPagina={() => setAtualizarPagina(!atualizarPagina)}
            authContext={authContext}
          />
        )}
        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Vendas</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={configurarModalVenda}
              >
                Adicionar Venda
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Nome do Produto
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Nome da Loja
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Estoque Vendido
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Data da Venda
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Valor Total da Venda
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {vendas.map((element, index) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.ProductID?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.StoreID?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.StockSold}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.SaleDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${element.TotalSaleAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vendas;
