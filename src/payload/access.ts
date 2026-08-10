import type { Access } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const anyone: Access = () => true

/** Authenticated users see all; public sees published only. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
