import { Transition } from "@tailwindui/react"
import React, { PropsWithoutRef, ReactNode } from "react"

export interface DialogProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  hide: () => void
  visible: boolean
  footer?: ReactNode
}

export const BaseDialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ hide, visible, footer, children }, ref) => (
    <Transition
      show={visible}
      enter="transition-opacity duration-75 delay-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div ref={ref} className="fixed inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <button
            className="fixed inset-0 w-full transition-opacity cursor-default focus:outline-none"
            onClick={hide}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </button>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          <div
            className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="sm:flex sm:items-start">{children}</div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">{footer}</div>
          </div>
        </div>
      </div>
    </Transition>
  )
)
