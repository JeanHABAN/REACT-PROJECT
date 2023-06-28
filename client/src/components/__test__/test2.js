import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import CourseCard from './CourseCard';

jest.mock('axios');

describe('CourseCard', () => {
  it('should render the course cards', async () => {
    const mockCourses = [
      {
        id: 1,
        title: 'Course 1',
        descrip: 'Course 1 description',
        trainer: 'Trainer 1',
        trainerImage: 'trainer1.jpg',
        capacity: 10,
        available: 5
      },
      {
        id: 2,
        title: 'Course 2',
        descrip: 'Course 2 description',
        trainer: 'Trainer 2',
        trainerImage: 'trainer2.jpg',
        capacity: 15,
        available: 8
      }
    ];

    axios.get.mockResolvedValueOnce({ data: mockCourses });

    const { getByText } = render(<CourseCard />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText('Course 1')).toBeInTheDocument();
    expect(getByText('Course 2')).toBeInTheDocument();
  });
});
