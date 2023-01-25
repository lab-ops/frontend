import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react'
import ThirdPartyEmailPassword, { Github } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import Session, { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as reactRouterDom from 'react-router-dom'
import Layout from './pages/Layout'
import { Suspense } from 'react'
import Loading from './components/Loading'
import Dashboard from './pages/Dashboard'
import './App.css'
import { ApolloClient, ApolloProvider, DefaultOptions, InMemoryCache } from '@apollo/client'

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: 'Lab Ops',
    apiDomain: import.meta.env.VITE_SUPERTOKENS_API_DOMAIN || 'https://auth.lab-ops.cloud',
    websiteDomain: import.meta.env.VITE_SUPERTOKENS_WEBSITE_DOMAIN || 'https://app.lab-ops.cloud',
    apiBasePath: '/',
    websiteBasePath: '/login'
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Github.init()]
      },
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.redirectToPath !== undefined) {
            // we are navigating back to where the user was before they authenticated
            return context.redirectToPath
          }
          return '/'
        }
        return undefined
      }
    }),
    Session.init()
  ]
})

const apolloOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

function App() {
  const apolloClient = new ApolloClient({
    uri: `${import.meta.env.VITE_GRAPHQL_URI}`,
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return (
    <SuperTokensWrapper>
      <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>

              {/* Protected Routes */}
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
              </Route>

            {/* Supertokens Login Routes */}
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          </Routes>
        </Suspense>
      </BrowserRouter>
      </ApolloProvider>
    </SuperTokensWrapper>
  )
}

export default App
