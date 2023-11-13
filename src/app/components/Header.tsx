"use client"
import React, { useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { PiListBold } from "react-icons/pi"
import { IoIosArrowDown } from "react-icons/io"
import { HiUserCircle } from "react-icons/hi"

const Header = () => {
  // Buat toogle dropdown hamburger list
  const handleClick = () => {
    const element = document.getElementById("navbar-search")
    if (element && element.classList.contains("hidden")) {
      element.classList.remove("hidden")
      element.classList.add("block")
    } else if (element) {
      element.classList.remove("block")
      element.classList.add("hidden")
    }
  }

  // Buat toggle dropdown profile
  const dropdown = () => {
    const element = document.getElementById("dropdownNavbar")
    if (element && element.classList.contains("hidden")) {
      element.classList.remove("hidden")
      element.classList.add("block")
    } else if (element) {
      element.classList.remove("block")
      element.classList.add("hidden")
    }
  }

  // Buat close dropdown profile ketika klik diluar dropdown profile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownNavbar = document.getElementById("dropdownNavbar")
      const dropdownNavbarLink = document.getElementById("dropdownNavbarLink")

      if (
        dropdownNavbar &&
        dropdownNavbarLink &&
        !dropdownNavbar.contains(event.target as Node) &&
        !dropdownNavbarLink.contains(event.target as Node)
      ) {
        dropdownNavbar.classList.add("hidden")
        dropdownNavbar.classList.remove("block")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 mb-6 border-gray-200 bg-white drop-shadow-xl dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            MyNotes
          </span>
        </a>
        <div className="flex md:order-1">
          <div className="relative hidden w-96 md:block">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <BiSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <button
            onClick={handleClick}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <PiListBold className="h-6 w-6" />
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <BiSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <button
                onClick={dropdown}
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                <HiUserCircle className="me-2 h-8 w-8" />
                Eren Jaeger
                <IoIosArrowDown className="ms-2.5" />
              </button>
              <div
                id="dropdownNavbar"
                className="absolute z-10 mt-1 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
