import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

const navegacao = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inventário", href: "/inventory", current: false },
  { name: "Detalhes de Compra", href: "/purchase-details", current: false },
  { name: "Vendas", href: "/sales", current: false },
  { name: "Gerenciar Loja", href: "/manage-store", current: false },
];

const navegacaoUsuario = [{ name: "Sair", href: "./login" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Cabecalho() {
  const authContext = useContext(AuthContext);
  const dadosLocalStorage = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          className="h-8 w-8"
                          src={require("../assets/logo.png")}
                          alt="Sistema de Gestão de Estoque"
                        />
                        <span className="font-bold text-white italic">
                          Gestão de Estoque
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Tooltip para o ícone de notificações */}
                      <div className="relative">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">Ver notificações</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          Notificações
                        </div>
                      </div>

                      {/* Menu do perfil */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Abrir menu do usuário</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={dadosLocalStorage.imageUrl}
                              alt="perfil"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 py-2 text-sm text-gray-700">
                              <div className="text-base font-medium leading-none text-gray-900">
                                {dadosLocalStorage.firstName +
                                  " " +
                                  dadosLocalStorage.lastName}
                              </div>
                              <div className="text-sm font-medium leading-none text-gray-500">
                                {dadosLocalStorage.email}
                              </div>
                            </div>
                            {navegacaoUsuario.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    <span onClick={() => authContext.signout()}>
                                      {item.name}
                                    </span>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Botão do menu móvel */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Abrir menu principal</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navegacao.map((item) => (
                    <Link to={item.href} key={item.name}>
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={dadosLocalStorage.imageUrl}
                        alt="perfil"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {dadosLocalStorage.firstName +
                          " " +
                          dadosLocalStorage.lastName}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {dadosLocalStorage.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">Ver notificações</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {navegacaoUsuario.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <span onClick={() => authContext.signout()}>
                          {item.name}
                        </span>
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
