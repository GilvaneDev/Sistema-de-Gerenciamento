import React, { useState, useEffect, useContext } from "react";
import AdicionarLoja from "../components/AddStore";
import AuthContext from "../AuthContext";

function Loja() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [lojas, setTodasLojas] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    buscarDados();
  }, []);

  // Buscar dados de todas as lojas
  const buscarDados = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((dados) => {
        setTodasLojas(dados);
      });
  };

  const configurarModal = () => {
    setMostrarModal(!mostrarModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between">
          <span className="font-bold">Gerenciar Loja</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            onClick={configurarModal}
          >
            Adicionar Loja
          </button>
        </div>
        {mostrarModal && <AdicionarLoja />}
        {lojas.map((elemento, index) => {
          return (
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4"
              key={elemento._id}
            >
              <div>
                <img
                  alt="loja"
                  className="h-60 w-full object-cover"
                  src={elemento.image}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{elemento.name}</span>
                <div className="flex">
                  <img
                    alt="ícone-localização"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <span>{elemento.address + ", " + elemento.city}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Loja;
