import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders text', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('copyright,@2023 jean miu'))
      .toBeInTheDocument();
  });
});