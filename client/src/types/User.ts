export interface UserType {
  id: string
  collectionId: string
  collectionName: string
  created: string | Date
  updated: string | Date
  verified: boolean
  email: string
  name: string | null
  username: string
  emailVisibility: boolean
  avatar: string
}
