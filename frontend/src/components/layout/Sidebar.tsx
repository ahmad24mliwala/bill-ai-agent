import {
  HomeIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  BuildingOfficeIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../../contexts/AuthContext";

import {
  getProfile,
} from "../../api/profile";

import type {
  UserProfile,
} from "../../api/profile";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Invoices",
    path: "/invoices",
    icon: DocumentTextIcon,
  },
  {
    name: "Upload Invoice",
    path: "/upload",
    icon: ArrowUpTrayIcon,
  },
  {
    name: "Firms",
    path: "/firms",
    icon: BuildingOfficeIcon,
  },
  {
    name: "Export",
    path: "/export",
    icon: ArrowDownTrayIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Cog6ToothIcon,
  },
];

export default function Sidebar() {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] =
    useState<UserProfile>();

  useEffect(() => {

    async function loadProfile() {

      try {

        const data =
          await getProfile();

        setProfile(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadProfile();

  }, []);

  function handleLogout() {

    logout();

    navigate("/");

  }

  return (

    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">

            <SparklesIcon className="h-7 w-7 text-white" />

          </div>

          <div>

            <h1 className="text-xl font-bold">

              AI Bill

            </h1>

            <p className="text-sm text-slate-400">

              Processing System

            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">

          Main Menu

        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon className="mr-4 h-6 w-6 flex-shrink-0" />

              {item.name}

            </NavLink>

          );

        })}

      </nav>

      {/* Logged In User */}

      <div className="border-t border-slate-800 p-5">

        <div className="mb-4 rounded-xl bg-slate-900 p-4">

          <p className="text-xs uppercase tracking-wide text-slate-400">

            Logged In

          </p>

          <p className="mt-2 truncate font-semibold">

            {

              profile?.full_name ||

              "Loading..."

            }

          </p>

          <p className="truncate text-sm text-slate-400">

            {

              profile?.email ||

              ""

            }

          </p>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700"
        >

          <ArrowLeftStartOnRectangleIcon className="mr-3 h-5 w-5" />

          Logout

        </button>

      </div>

    </aside>

  );

}
