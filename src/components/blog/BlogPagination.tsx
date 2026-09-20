import Link from 'next/link'
import type { ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type BlogPaginationProps = {
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function blogPageHref(page: number): string {
  return page <= 1 ? '/blog' : `/blog?page=${page}`
}

export function BlogPagination(props: BlogPaginationProps): ReactElement | null {
  const { page, totalPages, hasNextPage, hasPrevPage } = props

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      data-slot="blog-pagination"
      aria-label="Blog pagination"
      className="mt-10 flex flex-col items-stretch justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center"
    >
      {hasPrevPage ? (
        <Button as={Link} href={blogPageHref(page - 1)} variant="outline" className="self-start">
          Previous
        </Button>
      ) : (
        <span className="hidden sm:block sm:min-w-[7.5rem]" aria-hidden />
      )}

      <Typography className="text-center text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
        Page {page} of {totalPages}
      </Typography>

      {hasNextPage ? (
        <Button as={Link} href={blogPageHref(page + 1)} variant="outline" className="self-start sm:self-end">
          Next
        </Button>
      ) : (
        <span className="hidden sm:block sm:min-w-[7.5rem]" aria-hidden />
      )}
    </nav>
  )
}
