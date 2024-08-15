import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [mostrarModalProduto, setMostrarModalProduto] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
  const [produtoAtualizar, setProdutoAtualizar] = useState([]);
  const [produtos, setTodosProdutos] = useState([]);
  const [termoBusca, setTermoBusca] = useState();
  const [atualizarPagina, setAtualizarPagina] = useState(true);
  const [lojas, setTodasLojas] = useState([]);

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect(() => {
    buscarDadosProdutos();
    buscarDadosVendas();
  }, [atualizarPagina]);

  // Buscar dados de todos os produtos
  const buscarDadosProdutos = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setTodosProdutos(data);
      })
      .catch((err) => console.log(err));
  };

  // Buscar dados dos produtos pesquisados
  const buscarDadosPesquisa = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${termoBusca}`)
      .then((response) => response.json())
      .then((data) => {
        setTodosProdutos(data);
      })
      .catch((err) => console.log(err));
  };

  // Buscar dados de todas as lojas
  const buscarDadosVendas = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setTodasLojas(data);
      });
  };

  // Modal para adicionar produto
  const configurarModalAdicionarProduto = () => {
    setMostrarModalProduto(!mostrarModalProduto);
  };

  // Modal para atualizar produto
  const configurarModalAtualizarProduto = (dadosProdutoSelecionado) => {
    console.log("Clicado: editar");
    setProdutoAtualizar(dadosProdutoSelecionado);
    setMostrarModalAtualizar(!mostrarModalAtualizar);
  };

  // Deletar item
  const deletarItem = (id) => {
    console.log("ID do produto: ", id);
    console.log(`http://localhost:4000/api/product/delete/${id}`);
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAtualizarPagina(!atualizarPagina);
      });
  };

  // Atualizar página
  const handleAtualizarPagina = () => {
    setAtualizarPagina(!atualizarPagina);
  };

  // Atualizar termo de busca
  const handleTermoBusca = (e) => {
    setTermoBusca(e.target.value);
    buscarDadosPesquisa();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Inventário Geral</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total de Produtos
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {produtos.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Últimos 7 dias
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Lojas
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {lojas.length}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Últimos 7 dias
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $2000
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Receita
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Mais Vendidos
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Últimos 7 dias
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $1500
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Custo
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Estoques Baixos
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    12
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Encomendado
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    2
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Fora de Estoque
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mostrarModalProduto && (
          <AddProduct
            addProductModalSetting={configurarModalAdicionarProduto}
            handlePageUpdate={handleAtualizarPagina}
          />
        )}
        {mostrarModalAtualizar && (
          <UpdateProduct
            updateProductData={produtoAtualizar}
            updateModalSetting={configurarModalAtualizarProduto}
          />
        )}

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Produtos</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Busque aqui"
                  value={termoBusca}
                  onChange={handleTermoBusca}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={configurarModalAdicionarProduto}
              >
                Adicionar Produto
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Produtos
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Fabricante
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Estoque
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Descrição
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Disponibilidade
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Mais
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {produtos.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.manufacturer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock > 0 ? "Em Estoque" : "Fora de Estoque"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => configurarModalAtualizarProduto(element)}
                      >
                        Editar
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deletarItem(element._id)}
                      >
                        Deletar
                      </span>
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

export default Inventory;
