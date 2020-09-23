import { Card } from "app/components/Card"
import { Nav } from "app/components/Nav"
import { StyledLink } from "app/components/StyledLink"
import React from "react"
import Layout, { LayoutProps } from "./Layout"

export const AppLayout = ({ title, children }: LayoutProps) => (
  <Layout title={title}>
    <div>
      <div className="pb-32 bg-gray-800">
        <Nav />
        <header className="py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-9 text-white">{title}</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Card>{children}</Card>
        </div>
      </main>

      <footer>
        <div className="py-6 text-sm text-center text-gray-600">
          Crafted with {"💜"} by{" "}
          <StyledLink href="https://twitter.com/sandulat" target="_blank">
            @sandulat
          </StyledLink>
        </div>
      </footer>
    </div>
  </Layout>
)
