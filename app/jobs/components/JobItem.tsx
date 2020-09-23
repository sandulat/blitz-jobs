import classNames from "classnames"
import { Transition } from "@tailwindui/react"
import React, { PropsWithoutRef } from "react"
import { format } from "date-fns"
import { TooltipReference, Tooltip, useTooltipState } from "reakit/Tooltip"
import { JobType, jobTypeLabelMap } from "../jobType"
import { Tag, tagLabelMap } from "../tags"
import { Dialog, DialogDisclosure, useDialogState } from "reakit/Dialog"
import { ActionDialog } from "app/components/ActionDialog"
import { Badge } from "app/components/Badge"

export interface JobItemProps extends PropsWithoutRef<JSX.IntrinsicElements["a"]> {
  jobId?: number
  withActions?: boolean
  withAdminActions?: boolean
  preview?: boolean
  company?: string
  position?: string
  location?: string
  type: JobType
  date?: Date | null
  tags: Tag[] | null
  onDelete?: () => Promise<any>
  onPublish?: () => Promise<any>
}

const ActionButton = React.forwardRef<
  HTMLAnchorElement,
  PropsWithoutRef<JSX.IntrinsicElements["a"]>
>(({ children, className, ...props }, ref) => (
  <a
    ref={ref}
    {...props}
    className={classNames(
      "flex items-center cursor-pointer px-2 hover:bg-gray-100 transition-colors duration-100 border-gray-200 justify-center py-2 focus:outline-none bg-gray-50",
      className
    )}
  >
    {children}
  </a>
))

const EditIcon = () => (
  <svg className="w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
)

const PublishIcon = () => (
  <svg className="w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const DeleteIcon = () => (
  <svg className="w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

const EditButton = ({ className, jobId }: { className: string; jobId: number }) => (
  <ActionButton className={className} title="Edit" href={`/my-jobs/${jobId}`}>
    <EditIcon />
  </ActionButton>
)

export const JobItem = ({
  id,
  company,
  position,
  type,
  tags,
  location,
  date,
  jobId,
  preview = false,
  withActions = false,
  withAdminActions = false,
  onDelete,
  onPublish,
  ...props
}: JobItemProps) => {
  const tooltip = useTooltipState({ placement: "bottom", animated: 100 })

  const deleteDialog = useDialogState({
    animated: 100,
  })

  const publishDialog = useDialogState({
    animated: 100,
  })

  return (
    <li
      className={classNames("flex list-none md:flex-row", {
        "flex-col-reverse": withAdminActions,
        "flex-col": !withAdminActions,
      })}
    >
      {withAdminActions && jobId && onPublish ? (
        <React.Fragment>
          <Dialog {...publishDialog} aria-label="Publish job">
            <ActionDialog
              hide={publishDialog.hide}
              visible={publishDialog.visible}
              onAction={onPublish}
              title="Publish job"
              variant="primary"
              actionLabel="Publish"
            >
              Are you sure you want to publish this job?
            </ActionDialog>
          </Dialog>
          <DialogDisclosure
            {...publishDialog}
            as={ActionButton}
            className="border-t border-r md:border-t-0"
            title="Publish"
            role="button"
          >
            <PublishIcon />
          </DialogDisclosure>
        </React.Fragment>
      ) : (
        withActions && jobId && <EditButton className="hidden border-r md:flex" jobId={jobId} />
      )}
      <a
        className={classNames(
          "block transition duration-150 ease-in-out flex-grow focus:outline-none",
          {
            "hover:bg-gray-50 focus:bg-gray-50": !preview,
          }
        )}
        target="_blank"
        {...props}
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-indigo-600 truncate">
              {position || "Full-stack Engineer"}
              <span className="hidden text-sm font-normal text-gray-500 sm:inline">
                {" "}
                at {company || "My company"}
              </span>
            </div>
            <div className="flex flex-shrink-0 ml-2">
              <Badge>{jobTypeLabelMap[type]}</Badge>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <div className="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mt-0 sm:hidden">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="truncate">{company || "My company"}</span>
              </div>
              <div className="flex items-center mt-2 mr-6 text-sm leading-5 text-gray-500 sm:mt-0">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {tags &&
                  tags
                    .slice(0, 3)
                    .map((tag) => tagLabelMap[tag])
                    .join(", ")}
                {tags && tags.length > 3 && (
                  <React.Fragment>
                    <TooltipReference {...tooltip} as="span" className="focus:outline-none">
                      <button
                        className="ml-1 italic border-b-2 border-gray-300 border-dotted focus:outline-none"
                        onClick={(e) => e.preventDefault()}
                      >
                        + {tags.length - 3} more
                      </button>
                    </TooltipReference>
                    <Tooltip {...tooltip}>
                      <Transition
                        show={tooltip.visible}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ul className="px-3 py-2 text-sm list-none bg-white rounded-lg shadow">
                          {tags.slice(3).map((tag, index) => (
                            <li key={index}>{tagLabelMap[tag]}</li>
                          ))}
                        </ul>
                      </Transition>
                    </Tooltip>
                  </React.Fragment>
                )}
              </div>
              <div className="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mt-0">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {location || "Location"}
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mt-0">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {date ? (
                  <React.Fragment>
                    Posted on{" "}
                    <time dateTime={format(date, "yyyy-MM-dd")}>
                      {format(date, "MMMM d, yyyy")}
                    </time>
                  </React.Fragment>
                ) : (
                  "Not published yet"
                )}
              </span>
            </div>
          </div>
        </div>
      </a>
      {!withAdminActions && withActions && jobId && onDelete && (
        <div className="flex border-t border-gray-200 md:border-none">
          <Dialog {...deleteDialog} aria-label="Delete Job">
            <ActionDialog
              hide={deleteDialog.hide}
              visible={deleteDialog.visible}
              onAction={onDelete}
              title="Delete job"
              variant="danger"
              actionLabel="Delete"
            >
              Are you sure you want to delete this job? <br />
              This action cannot be undone.
            </ActionDialog>
          </Dialog>
          <EditButton className="w-1/2 border-r md:hidden" jobId={jobId} />
          <DialogDisclosure
            {...deleteDialog}
            as={ActionButton}
            className="w-1/2 md:w-auto md:border-l"
            title="Delete"
            role="button"
          >
            <DeleteIcon />
          </DialogDisclosure>
        </div>
      )}
    </li>
  )
}
