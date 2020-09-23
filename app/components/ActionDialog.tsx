import React, { useState } from "react"
import classNames from "classnames"
import { Button } from "./Button"
import { DialogProps, BaseDialog } from "./StyledDialog"

const DangerIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)

const PrimaryIcon = () => (
  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const iconMap = {
  danger: <DangerIcon />,
  primary: <PrimaryIcon />,
}

export const ActionDialog = React.forwardRef<
  HTMLDivElement,
  Omit<DialogProps, "footer"> & {
    title: string
    actionLabel: string
    onAction: () => Promise<any>
    variant: "danger" | "primary"
  }
>(({ hide, onAction, variant, title, actionLabel, children, ...props }, ref) => {
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)

    try {
      await onAction()
    } finally {
      setLoading(false)

      hide()
    }
  }

  return (
    <BaseDialog
      ref={ref}
      footer={
        <React.Fragment>
          <Button
            disabled={loading}
            className="w-full sm:ml-3 sm:w-auto"
            variant={variant}
            onClick={handleAction}
          >
            {loading ? "Please wait" : actionLabel}
          </Button>
          <Button className="w-full mt-3 sm:mt-0 sm:w-auto" variant="white" onClick={hide}>
            Cancel
          </Button>
        </React.Fragment>
      }
      hide={hide}
      {...props}
    >
      <div
        className={classNames(
          "flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full sm:mx-0 sm:h-10 sm:w-10",
          {
            "bg-red-100": variant === "danger",
            "bg-indigo-100": variant === "primary",
          }
        )}
      >
        {iconMap[variant]}
      </div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
          {title}
        </h3>
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-500">{children}</p>
        </div>
      </div>
    </BaseDialog>
  )
})
