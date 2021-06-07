import React from 'react';
import TicTacToe from '../TicTacToe';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TicTacToe', () => {
  it('should make X appear after clicking in one blank cell', async () => {
    const { getByText } = render(<TicTacToe />);
    const firstCell = document.getElementsByClassName('boardCell')[0];
    fireEvent.click(firstCell);

    await waitFor(() => expect(firstCell).toBe(getByText('X')));
  });

  it('given that X already played, should make O appear after clicking in one blank cell', async () => {
    const { getByText } = render(<TicTacToe />);
    const firstCell = document.getElementsByClassName('boardCell')[0];
    fireEvent.click(firstCell);
    await waitFor(() => getByText('X'));

    const secondCell = document.getElementsByClassName('boardCell')[1];
    fireEvent.click(secondCell);
    const cellWithO = await waitFor(() => getByText('O'));
    expect(secondCell).toBe(cellWithO);
  });

  it('given that O already played, should make X appear after clicking in one blank cell', async () => {
    render(<TicTacToe />);
    const firstCell = document.getElementsByClassName('boardCell')[0];
    fireEvent.click(firstCell);

    const secondCell = document.getElementsByClassName('boardCell')[1];
    fireEvent.click(secondCell);

    const thirdCell = document.getElementsByClassName('boardCell')[2];
    fireEvent.click(thirdCell);

    expect(thirdCell).toHaveTextContent('X');
  });

  it('given that the one row is filled with X, it should make X win', async () => {
    const { findByText } = render(<TicTacToe />);
    fireEvent.click(document.getElementsByClassName('boardCell')[0]); // X
    fireEvent.click(document.getElementsByClassName('boardCell')[3]);
    fireEvent.click(document.getElementsByClassName('boardCell')[1]); // X
    fireEvent.click(document.getElementsByClassName('boardCell')[4]);
    fireEvent.click(document.getElementsByClassName('boardCell')[2]); // X

    const results = await waitFor(() => findByText(/X won/));
    expect(results).toHaveTextContent('X won the game.');
  });

  it('given that the one column is filled with O, it should make O win', async () => {
    const { findByText } = render(<TicTacToe />);
    fireEvent.click(document.getElementsByClassName('boardCell')[1]);
    fireEvent.click(document.getElementsByClassName('boardCell')[0]); // O
    fireEvent.click(document.getElementsByClassName('boardCell')[4]);
    fireEvent.click(document.getElementsByClassName('boardCell')[3]); // O
    fireEvent.click(document.getElementsByClassName('boardCell')[8]);
    fireEvent.click(document.getElementsByClassName('boardCell')[6]); // O

    const results = await waitFor(() => findByText(/O won/));
    expect(results).toHaveTextContent('O won the game.');
  });

  it('given that the one diagonal is filled with X, it should make X win', async () => {
    const { findByText } = render(<TicTacToe />);
    fireEvent.click(document.getElementsByClassName('boardCell')[0]); // X
    fireEvent.click(document.getElementsByClassName('boardCell')[3]);
    fireEvent.click(document.getElementsByClassName('boardCell')[4]); // X
    fireEvent.click(document.getElementsByClassName('boardCell')[2]);
    fireEvent.click(document.getElementsByClassName('boardCell')[8]); // X

    const results = await waitFor(() => findByText(/X won/));
    expect(results).toHaveTextContent('X won the game.');
  });

  it.skip('given that all positions are filled and there is no winner, it should declare it a draw', () => {});

  it.skip('given that not all positions are filled and there is a winner, it should not let the next player play', () => {});
});
