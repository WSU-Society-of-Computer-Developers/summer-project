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
import Spinner from 'components/Spinner'
import { Route, Routes } from 'react-router-dom'
import { pbURL, vagueFetcher, posts as PostActions } from 'utils/api'
import useSWR from 'swr'

interface PocketContextType {
  // write type def here for all the functions you want to expose
  register: (
    email: LoginData.email,
    password: LoginData.password
  ) => Promise<any>
  login: (email: LoginData.email, password: LoginData.password) => Promise<any>
  logout: () => void
  api: {
    posts: PostActions
  }
  user: BaseAuthStore['model'] | null
  token: string | null
  pb: PocketBase
}

const PocketContext = createContext<PocketContextType>({
  register: function (
    email: LoginData.email,
    password: LoginData.password
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  login: function (
    email: LoginData.email,
    password: LoginData.password
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  logout: function (): void {
    throw new Error('Function not implemented.')
  },
  api: {
    posts: new PostActions(new PocketBase())
  },
  user: null,
  token: null,
  pb: new PocketBase('')
}) // placeholder default values

interface PocketContextProps {
  children: JSX.Element | JSX.Element[]
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace LoginData {
  export type email = string
  export type password = string
}

export const PocketProvider = ({ children }: PocketContextProps) => {
  // useMemo is used to caching the value of the pb instance itself
  const pb = useMemo(() => new PocketBase(pbURL), [])

  const isDev = useMemo(() => import.meta.env.MODE === 'development', [])
  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)
  const { data, error, isLoading } = useSWR(
    (import.meta.env.VITE_PB_URL || 'http://localhost:8090') + '/api/health',
    vagueFetcher
  )
  // TODO: do we want blocking behavior for waiting on the backend on initial load? (landing page like fb?)

  useEffect(() => {
    // pb.collection('users').authWithPassword('test@test.n', 'test123456')
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
    })
  }, [])

  // user actions
  const register = useCallback(
    async (email: LoginData.email, password: LoginData.password) => {
      return await pb
        .collection('users')
        .create({ email, password, passwordConfirm: password })
    },
    []
  )

  // useCallback is used to caching the function itself
  const login = useCallback(
    async (email: LoginData.email, password: LoginData.password) => {
      return await pb.collection('users').authWithPassword(email, password)
    },
    []
  )

  const logout = useCallback(() => {
    pb.authStore.clear()
  }, [])

  const api = useMemo(() => {
    return { posts: new PostActions(pb) }
  }, [pb])

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
      value={{ register, login, logout, api, user, token, pb }}
    >
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Routes>
          <Route
            path="*"
            element={
              <div className="m-5 text-center">
                <h1 className="text-5xl ">Uh oh.</h1>
                <br />
                <p>
                  {isDev
                    ? 'Cannot connect to backend. Make sure you are running the pocketbase server with the correct VITE_PB_URL env variable set (check readme)'
                    : 'Something went wrong :('}
                </p>
              </div>
            }
          />
        </Routes>
      ) : (
        children
      )}
    </PocketContext.Provider>
  )
}

export const usePocket = () => useContext<PocketContextType>(PocketContext)
