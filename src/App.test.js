import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App'; // Adjust the path according to your project structure
import '@testing-library/jest-dom';

it('GET API from http://localhost:3000/ should return 200', async()=>{
const response = await fetch('http://localhost:3000/');
//set the time of operation to be longer than default to be able to receive back data
jest.setTimeout(100000);
expect(response.status).toBe(200);
})

// Mock Axios
jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('fetches poems on initial load', async () => {
    const mockPoems = [
      { id: 1, date: '2024-06-07T12:00:00Z', poem: 'Line 1\nLine 2\nLine 3' },
      { id: 2, date: '2024-06-08T12:00:00Z', poem: 'Another line\nMore lines\nFinal line' },
    ];

    axios.get.mockResolvedValueOnce({
      data: mockPoems,
    });

    const { getByText } = render(<App />);

    // Wait for the component to update after fetching poems
    await waitFor(() => expect(getByText(/Poem 1/i)).toBeInTheDocument());

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/');
  });

  it('generates and saves a poem when the button is clicked', async () => {
    // Mocking window.alert to avoid actual alerts during testing
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const mockPoemData = { data: { poem: 'Generated poem text' } };
    axios.get.mockResolvedValueOnce(mockPoemData); // Mock for the generate poem endpoint

    const mockFetchPoemsData = [
      { id: 1, date: '2024-06-07T12:00:00Z', poem: 'Line 1\nLine 2\nLine 3' },
      { id: 2, date: '2024-06-08T12:00:00Z', poem: 'Another line\nMore lines\nFinal line' },
      { id: 3, date: '2024-06-09T12:00:00Z', poem: 'Generated poem text' }, // The newly generated poem
    ];
    axios.get.mockResolvedValueOnce({ data: mockFetchPoemsData }); // Mock for the fetch poems endpoint after generating a poem

    const { getByText } = render(<App />);
    const generateButton = getByText('Generate & Save Poem');

    fireEvent.click(generateButton);

    // Wait for the alert to be dismissed and the component to re-render
    await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Poem saved successfully and image generated'));

    // Ensure axios.get is called thrice: once for initial fetch, once for generating poem, once for fetching poems again
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenNthCalledWith(1, 'http://localhost:8080/');
    expect(axios.get).toHaveBeenNthCalledWith(2, 'http://localhost:8080/generate-poem');
    expect(axios.get).toHaveBeenNthCalledWith(3, 'http://localhost:8080/');
  });
});
