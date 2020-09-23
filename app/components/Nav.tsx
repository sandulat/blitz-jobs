import { Link, useRouter, useSession } from "blitz"
import React, { useState } from "react"
import classNames from "classnames"
import { Logo } from "./Logo"
import { AuthNav } from "./AuthNav"
import { MenuLink } from "./MenuLink"

const NavItems = () => {
  const router = useRouter()

  return (
    <React.Fragment>
      <MenuLink as={Link} active={["/", "/post-job"].includes(router.pathname)} href="/">
        Listings
      </MenuLink>
      <MenuLink as="a" target="_blank" href="https://blitzjs.com/">
        Blitz.js
      </MenuLink>
      <MenuLink as="a" target="_blank" href="https://github.com/blitz-js/blitz">
        GitHub
      </MenuLink>
      <MenuLink as="a" target="_blank" href="https://github.com/sponsors/blitz-js">
        Sponsor
      </MenuLink>
    </React.Fragment>
  )
}

export const Nav = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const toggleMobileMenuVisible = () => setMobileMenuVisible(!mobileMenuVisible)

  const session = useSession()

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex items-center flex-shrink-0">
                <Link href="/" passHref>
                  <a>
                    <Logo className="h-9" />
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <NavItems />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <AuthNav authenticated={session.userId} />
                </div>
              </div>
            </div>
            <div className="flex -mr-2 md:hidden">
              <button
                onClick={toggleMobileMenuVisible}
                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                <svg
                  className="block w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames("border-b border-gray-700 md:hidden", {
          hidden: !mobileMenuVisible,
        })}
      >
        <div className="px-2 py-3 space-y-1 sm:px-3">
          <NavItems />
        </div>
        <div className="px-2 pt-3 pb-3 border-t border-gray-700">
          <AuthNav authenticated={session.userId} />
        </div>
      </div>
    </nav>
  )
}
