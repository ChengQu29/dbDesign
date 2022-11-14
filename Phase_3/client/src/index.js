import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import router from './Router';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Hemkraft</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{marginTop: 30}}>
        <RouterProvider router={router} />
      </Container>
    </Provider>
);
