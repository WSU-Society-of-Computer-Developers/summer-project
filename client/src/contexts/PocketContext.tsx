// https://dev.to/franciscomendes10866/how-to-use-pocketbase-authentication-with-react-context-11be
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo
} from 'react'
import PocketBase, { BaseAuthStore } from 'pocketbase'
import { useInterval } from 'usehooks-ts'
import jwtDecode from 'jwt-decode'
import ms from 'ms'

export const PB_URL = 'http://workstation.zav:8090'

const PocketContext = createContext<PocketContextType>({
  register: function (email: string, password: string): Promise<any> {
    throw new Error('Function not implemented.')
  },
  login: function (email: string, password: string): Promise<any> {
    throw new Error('Function not implemented.')
  },
  logout: function (): void {
    throw new Error('Function not implemented.')
  },
  user: null,
  token: null,
  pb: new PocketBase('')
})

interface PocketContextProps {
  children: JSX.Element | JSX.Element[]
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace LoginData {
  export type email = string
  export type password = string
}

export const PocketProvider = ({ children }: PocketContextProps) => {
  const pb = useMemo(
    () => new PocketBase(PB_URL || 'http://localhost:8090'),
    []
  )

  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
    })
  }, [])

  const register = useCallback(
    async (email: LoginData.email, password: LoginData.password) => {
      return await pb
        .collection('users')
        .create({ email, password, passwordConfirm: password })
    },
    []
  )

  const login = useCallback(
    async (email: LoginData.email, password: LoginData.password) => {
      return await pb.collection('users').authWithPassword(email, password)
    },
    []
  )

  const logout = useCallback(() => {
    pb.authStore.clear()
  }, [])

  // proactively refresh token
  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return
    const decoded = jwtDecode(token) as { exp: number }
    const tokenExpiration = decoded.exp
    const expirationWithBuffer = (decoded.exp + ms('5 minutes')) / 1000
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection('users').authRefresh()
    }
  }, [token])

  useInterval(refreshSession, token ? ms('2 minutes') : null)
  return (
    <PocketContext.Provider
      value={{ register, login, logout, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  )
}

interface PocketContextType {
  // write type def here for all the functions you want to expose
  register: (
    email: LoginData.email,
    password: LoginData.password
  ) => Promise<any>
  login: (email: LoginData.email, password: LoginData.password) => Promise<any>
  logout: () => void
  user: BaseAuthStore['model'] | null
  token: string | null
  pb: PocketBase
}

export const usePocket = () => useContext<PocketContextType>(PocketContext)
