import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// FOR ENDPOINT

it('GET API from localhost:3000 should return 200', async()=>{
  const response = await fetch('http://localhost:3000/');
  expect(response.status).toBe(200);
})


