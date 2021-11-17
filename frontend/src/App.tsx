import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { OpenAPI } from './api';
import './App.css';
import Editor from './components/editor/MarkdownEditor';
import { Layout } from './components/Layouts';
import { Page } from './components/pageView/Page';
import AuthContext, { AuthUser } from './contexts/AuthContext';

const { origin } = window.location;
OpenAPI.BASE = origin;

const Container = styled.section`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-content: stretch;
`;
function App() {
  const [auth, setAuth] = useState(new AuthUser());
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/page/edit/:id' element={<Editor />} />
            <Route path='/page/:id' element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
