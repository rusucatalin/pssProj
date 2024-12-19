import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import FixedPlugin from "../../components/fixedPlugin/FixedPLugin";
import routes from "../../routes";

export default function HomeLayout() {
  const getRoutes = (routes: any[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div className="relative flex h-full min-h-screen w-full bg-white dark:bg-gray-800">
        <div className="w-[250px] bg-gray-800 text-white p-4">
          <h2 className="text-xl font-semibold mb-6">Home Layout</h2>
          <ul>
            {routes
              .filter((route) => route.layout === "/home")
              .map((route, index) => (
                <li key={index}>
                  <Link
                    to={`/${route.layout}/${route.path}`}
                    className="block py-2 px-4 hover:bg-gray-800"
                  >
                    {route.icon && <span className="mr-2">{route.icon}</span>}
                    {route.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <FixedPlugin />

          {/* Main Content Area */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              A
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">V</p>
          </div>

          <Routes>
            {getRoutes(routes)}

            <Route
              path="/"
              element={<Navigate to="/home/homePage" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
