import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TodoListPage } from './pages/TodoListPage';
import { TodoDetailPage } from './pages/TodoDetailPage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todo" element={<TodoDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
