import React, { Suspense } from "react"
import { BlitzPage, Link } from "blitz"
import { Button } from "app/components/Button"
import { AppLayout } from "app/layouts/AppLayout"
import { JobsList } from "app/jobs/components/JobsList"
import getJobs from "app/jobs/queries/getJobs"
import { Loading } from "app/components/Loading"

const Home: BlitzPage = () => {
  return (
    <React.Fragment>
      <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-no-wrap">
        <div className="mt-4 ml-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Post jobs for free</h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">The first-ever Blitz.js job board.</p>
        </div>
        <div className="flex-shrink-0 mt-4 ml-4">
          <Link href="/post-job">
            <Button>Post new job</Button>
          </Link>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-end justify-center h-12">
            <Loading className="w-5 h-5 text-indigo-600" />
          </div>
        }
      >
        <JobsList query={getJobs} />
      </Suspense>
    </React.Fragment>
  )
}

Home.getLayout = (page) => <AppLayout title="Blitz.js Jobs">{page}</AppLayout>

export default Home
