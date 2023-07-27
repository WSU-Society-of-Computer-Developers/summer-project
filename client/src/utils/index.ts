import { UserType } from 'types/User'
import { pbURL } from './api'
import { Admin, Record } from 'pocketbase'

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
