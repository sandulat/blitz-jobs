import { Job } from "@prisma/client"
import publishJob from "app/admin/mutations/publishJob"
import { Button } from "app/components/Button"
import { StyledLink } from "app/components/StyledLink"
import { Link, useInfiniteQuery } from "blitz"
import React from "react"
import { JobType } from "../jobType"
import deleteJob from "../mutations/deleteJob"
import getJobs from "../queries/getJobs"
import { Tag } from "../tags"
import { JobItem, JobItemProps } from "./JobItem"

type JobAction = (options: { groupIndex: number; job: Job }) => Promise<any>

export const JobsList = ({
  query,
  withActions = false,
  withAdminActions = false,
}: {
  query: typeof getJobs
} & Pick<JobItemProps, "withActions" | "withAdminActions">) => {
  const [groupedJobs, { isFetchingMore, fetchMore, canFetchMore, mutate }] = useInfiniteQuery(
    query,
    (page = { take: 100, skip: 0 }) => page,
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
    }
  )

  const removeItemFromCache: JobAction = async ({ groupIndex, job }) =>
    mutate(
      groupedJobs.map((group, index) =>
        index === groupIndex
          ? { ...group, jobs: group.jobs.filter((jobItem) => jobItem.id !== job.id) }
          : group
      ),
      { refetch: false }
    )

  const handleItemDelete: JobAction = async (options) => {
    await deleteJob({ id: options.job.id })

    removeItemFromCache(options)
  }

  const handleItemPublish: JobAction = async (options) => {
    await publishJob({ id: options.job.id })

    removeItemFromCache(options)
  }

  if (!groupedJobs[0] || groupedJobs[0].jobs.length === 0) {
    return (
      <div className="pt-4 mt-4 text-sm text-gray-500 border-t border-gray-200">
        Looks like there is nothing to see here yet. Maybe you want to{" "}
        <Link href="/post-job" passHref>
          <StyledLink>post a new job</StyledLink>
        </Link>
        ?
      </div>
    )
  }

  return (
    <div className="mt-4 -mx-4 border-t border-gray-200 sm:-mx-6">
      <ul className="-mb-5 list-none divide-y divide-gray-200 sm:-mb-6 ">
        {groupedJobs.map((group, groupIndex) => (
          <div key={groupIndex} className="divide-y divide-gray-200">
            {group.jobs.map((job) => (
              <JobItem
                key={job.id}
                jobId={job.id}
                date={job.publishedAt}
                company={job.company}
                position={job.position}
                type={JobType[job.type]}
                location={job.location}
                tags={job.tags as Tag[]}
                href={job.url}
                withActions={withActions}
                withAdminActions={withAdminActions}
                onDelete={() => handleItemDelete({ groupIndex, job })}
                onPublish={() => handleItemPublish({ groupIndex, job })}
              />
            ))}
          </div>
        ))}
      </ul>
      {canFetchMore && (
        <div className="pt-6 mt-6 text-center border-t border-gray-200">
          <Button
            variant="white"
            onClick={() => fetchMore()}
            disabled={!canFetchMore || !!isFetchingMore}
          >
            {isFetchingMore
              ? "Loading more..."
              : canFetchMore
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </div>
      )}
    </div>
  )
}
