import React, { Suspense } from "react"
import { BlitzPage, GetServerSideProps } from "blitz"
import { AppLayout } from "app/layouts/AppLayout"
import { JobsList } from "app/jobs/components/JobsList"
import { Loading } from "app/components/Loading"
import { ensureHasRole } from "app/guards/ensureHasRole"
import { Role } from "app/users/role"
import getUnpublishedJobs from "app/admin/queries/getUnpublishedJobs"

export const getServerSideProps: GetServerSideProps = async (context) =>
  await ensureHasRole({ ...context, role: Role.ADMIN })

const Admin: BlitzPage = () => {
  return (
    <React.Fragment>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Manage All Jobs</h3>
        <p className="mt-1 text-sm leading-5 text-gray-500">
          Here you can publish all the submitted jobs.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex items-end justify-center h-12">
            <Loading className="w-5 h-5 text-indigo-600" />
          </div>
        }
      >
        <JobsList query={getUnpublishedJobs} withAdminActions />
      </Suspense>
    </React.Fragment>
  )
}

Admin.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>

export default Admin
