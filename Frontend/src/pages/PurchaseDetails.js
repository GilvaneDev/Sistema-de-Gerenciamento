import React, { useState, useEffect, useContext } from "react";
import AdicionarDetalhesCompra from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function DetalhesCompra() {
  const [mostrarModalCompra, setMostrarModalCompra] = useState(false);
  const [compra, setTodosDadosCompra] = useState([]);
  const [produtos, setTodosProdutos] = useState([]);
  const [atualizarPagina, setAtualizarPagina] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    buscarDadosCompra();
    buscarDadosProdutos();
  }, [atualizarPagina]);

  // Buscar Dados de Todos os Itens de Compra
  const buscarDadosCompra = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((dados) => {
        setTodosDadosCompra(dados);
      })
      .catch((err) => console.log(err));
  };

  // Buscar Dados de Todos os Produtos
  const buscarDadosProdutos = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((dados) => {
        setTodosProdutos(dados);
      })
      .catch((err) => console.log(err));
  };

  // Modal para Adicionar Compra
  const configurarModalCompra = () => {
    setMostrarModalCompra(!mostrarModalCompra);
  };

  // Lidar com Atualização da Página
  const lidarComAtualizacaoPagina = () => {
    setAtualizarPagina(!atualizarPagina);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {mostrarModalCompra && (
          <AdicionarDetalhesCompra
            configurarModalCompra={configurarModalCompra}
            produtos={produtos}
            lidarComAtualizacaoPagina={lidarComAtualizacaoPagina}
            authContext={authContext}
          />
        )}
        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Detalhes da Compra</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={configurarModalCompra}
              >
                Adicionar Compra
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
                  Quantidade Comprada
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Data da Compra
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Valor Total da Compra
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {compra.map((elemento, index) => {
                return (
                  <tr key={elemento._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {elemento.ProductID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {elemento.QuantityPurchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(elemento.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Hoje"
                        : elemento.PurchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ${elemento.TotalPurchaseAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DetalhesCompra;
