import React, { useState } from "react"
import { BlitzPage, GetServerSideProps } from "blitz"
import { ensureAuthenticated } from "app/guards/ensureAuthenticated"
import JobForm from "../components/JobForm"
import { AppLayout } from "app/layouts/AppLayout"
import { Alert } from "app/components/Alert"

export const getServerSideProps: GetServerSideProps = ensureAuthenticated

const PostJob: BlitzPage = () => {
  const [submitted, setSubmitted] = useState(false)

  return submitted ? (
    <div className="sm:p-5">
      <Alert variant="success">
        You've successfully submitted your job post.
        <br />
        We will need to review it before it becomes public.
      </Alert>
    </div>
  ) : (
    <JobForm onSuccess={() => setSubmitted(true)} />
  )
}

PostJob.getLayout = (page) => <AppLayout title="Post New Job">{page}</AppLayout>

export default PostJob
