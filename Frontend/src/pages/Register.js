import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function Register() {
  // Estado do formulário
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  // Hook para navegação
  const navigate = useNavigate();

  // Manipula as mudanças nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Envia os dados do formulário para o backend
  const registerUser = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Resposta da API:", result);
        alert("Cadastro realizado com sucesso. Agora faça login com seus detalhes.");
        navigate('/login');
      })
      .catch((err) => {
        console.log("Erro ao registrar:", err);
        alert("Ocorreu um erro ao registrar o usuário.");
      });
  };

  // Envia a imagem para o Cloudinary e atualiza o estado com a URL da imagem
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setForm((prevForm) => ({ ...prevForm, imageUrl: result.url }));
      alert("Imagem carregada com sucesso");
    } catch (error) {
      console.log("Erro ao carregar imagem:", error);
      alert("Ocorreu um erro ao carregar a imagem.");
    }
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
      <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={require("../assets/logo.png")}
            alt="Sua Empresa"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Registre sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div className="flex gap-4">
              <input
                name="firstName"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Nome"
                value={form.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Sobrenome"
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Endereço de e-mail"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Senha"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Número de Telefone"
                value={form.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <UploadImage uploadImage={uploadImage} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked
                required
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Aceito os Termos e Condições
              </label>
            </div>

            <div className="text-sm">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Esqueceu sua senha?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Ícone pode ser adicionado aqui */}
              </span>
              Inscrever-se
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{" "}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Já tem uma conta? <Link to="/login">Faça login agora</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-center order-first sm:order-last">
        <img src={require("../assets/Login.png")} alt="Login" />
      </div>
    </div>
  );
}

export default Register;
