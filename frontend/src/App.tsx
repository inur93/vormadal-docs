import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { OpenAPI } from './api';
import './App.css';
import Editor from './components/editor/MarkdownEditor';
import { Layout } from './components/Layouts';
import { Page } from './components/pageView/Page';
import AuthContext, { AuthUser } from './contexts/AuthContext';
import { add401interceptor } from './utils/interceptors';
import {routes} from './utils/routes';

const { origin } = window.location;
OpenAPI.BASE = origin;

function App() {
  const [auth, setAuth] = useState(new AuthUser());
  useEffect(() => {
    add401interceptor(setAuth);
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <HashRouter>
        <Routes>
          <Route path={routes.root()} element={<Layout />}>
            <Route path={routes.editPage()} element={<Editor />} />
            <Route path={routes.page()} element={<Page />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
