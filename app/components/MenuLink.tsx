import { Link } from "blitz"
import React, { PropsWithoutRef } from "react"
import classNames from "classnames"

export const MenuLink = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  {
    active?: boolean
    href: string
    disabled?: boolean
    as: typeof Link | "a" | "button"
  } & PropsWithoutRef<JSX.IntrinsicElements["a"]> &
    PropsWithoutRef<JSX.IntrinsicElements["button"]>
>(({ children, active, href, disabled, as, ...props }, ref) => {
  const className = classNames(
    "px-3 py-2 md:text-sm font-medium text-white rounded block md:inline-block focus:outline-none focus:text-white focus:bg-gray-700 transition-colors duration-100",
    {
      "bg-gray-900": active,
      "hover:bg-gray-700": !active,
      "cursor-not-allowed": disabled,
    }
  )

  switch (as) {
    case "a": {
      return (
        <a ref={ref} className={className} aria-disabled={disabled} href={href} {...props}>
          {children}
        </a>
      )
    }
    case "button": {
      return (
        <button ref={ref} className={className} aria-disabled={disabled} {...props}>
          {children}
        </button>
      )
    }
    case Link: {
      return (
        <Link href={href} passHref>
          <a ref={ref} className={className} aria-disabled={disabled} {...props}>
            {children}
          </a>
        </Link>
      )
    }
    default: {
      return null
    }
  }
})
