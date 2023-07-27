export interface UserType {
  id: string
  created: string | Date
  updated: string | Date
  verified: boolean
  email: string
  name: string | null
  username: string
  emailVisibility: boolean
  avatar: string
}
