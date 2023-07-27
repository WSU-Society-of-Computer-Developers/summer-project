import { UserType } from 'types/User'
import { pbURL } from './api'
import { Admin, ClientResponseError, Record } from 'pocketbase'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const getFileURL = (
  collectionId: string,
  recordId: string,
  fileName: string,
  options?: string
) =>
  `${pbURL}/api/files/${collectionId}/${recordId}/${fileName}${
    options ? `?${options}` : ''
  }`

export const getAvatarURL = (
  user:
    | UserType
    | { avatar: string; collectionId: string; id: string; email: string }
    | Record
    | Admin
) =>
  user.avatar
    ? getFileURL(user.collectionId, user.id, user.avatar, 'w=200&h=200')
    : `https://api.dicebear.com/6.x/identicon/png?seed=${user.email}`

/**
 * parses pocketbase error response OR just normal error
 * @param error
 */
export const parseError = (error: Error | ClientResponseError) => {
  if (error instanceof ClientResponseError) {
    return {
      issues: Object.entries((error as ClientResponseError).data.data).map(
        ([key, value]) => `${key}: ${(value as any).message}`
        //`${key}: ${(value as any).message}`
        //({ [key as string]: (value as any).message })
        // when we have proper err handing, we can do this
      ),
      ...error
    }
  }
  return { ...error, issues: [] }
}
