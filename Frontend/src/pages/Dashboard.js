import React, { useContext, useEffect, useState,useCallback } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const dados = {
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# de Votos",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [valorVendas, setValorVendas] = useState("");
  const [valorCompras, setValorCompras] = useState("");
  const [lojas, setLojas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [grafico, setGrafico] = useState({
    options: {
      chart: {
        id: "barra-basica",
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
      },
    },
    series: [
      {
        name: "série",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  // Atualizar dados do gráfico
  const atualizarDadosGrafico = (dadosVendas) => {
    setGrafico({
      ...grafico,
      series: [
        {
          name: "Valor Mensal de Vendas",
          data: [...dadosVendas],
        },
      ],
    });
  };

  const authContext = useContext(AuthContext);

  const buscarValorTotalVendas = useCallback(() => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`)
      .then((response) => response.json())
      .then((dados) => setValorVendas(dados.totalSaleAmount));
  }, [authContext.user]);
  
  const buscarValorTotalCompras = useCallback(() => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`)
      .then((response) => response.json())
      .then((dados) => setValorCompras(dados.totalPurchaseAmount));
  }, [authContext.user]);
  
  const buscarDadosLojas = useCallback(() => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((dados) => setLojas(dados));
  }, [authContext.user]);
  
  const buscarDadosProdutos = useCallback(() => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((dados) => setProdutos(dados))
      .catch((err) => console.log(err));
  }, [authContext.user]);
  
  const buscarDadosVendasMensais = useCallback(() => {
    fetch(`http://localhost:4000/api/sales/getmonthly`)
      .then((response) => response.json())
      .then((dados) => atualizarDadosGrafico(dados.salesAmount))
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    buscarValorTotalVendas();
    buscarValorTotalCompras();
    buscarDadosLojas();
    buscarDadosProdutos();
    buscarDadosVendasMensais();
  }, [buscarValorTotalVendas, buscarValorTotalCompras, buscarDadosLojas, buscarDadosProdutos, buscarDadosVendasMensais]);
  
  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Vendas
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                ${valorVendas}
              </span>

              <span className="text-xs text-gray-500"> de $240.94 </span>
            </p>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Compras
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                ${valorCompras}{" "}
              </span>

              <span className="text-xs text-gray-500"> de $404.32 </span>
            </p>
          </div>
        </article>
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total de Produtos
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {produtos.length}{" "}
              </span>
            </p>
          </div>
        </article>
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total de Lojas
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {lojas.length}{" "}
              </span>
            </p>
          </div>
        </article>
        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div>
            <Chart
              options={grafico.options}
              series={grafico.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <Doughnut data={dados} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
