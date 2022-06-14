import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carousel from './Carousel';

describe('Carousel component', () => {
  let component;
  beforeEach(() => {
    const collection = [
      {
        id: 1,
        title: '3D printer',
        description: 'a 3D printer',
        review: 'https://youtube.com/someVideo',
        dates_reserved: [],
        duration: 13,
        rent_fee: 'time',
        total_amount_payable: 'time',
        created_at: 'date',
        updated_at: 'date',
        image: {
          byte_size: 1234,
          url: 'https://image.qwe',
          name: 'image',
        },
      },
      {
        id: 2,
        title: 'camera',
        description: 'a camera',
        review: 'https://youtube.com/camera',
        dates_reserved: [],
        duration: 45,
        rent_fee: 'time',
        total_amount_payable: 'time',
        created_at: 'date',
        updated_at: 'date',
        image: {
          byte_size: 12345,
          url: 'https://image.qwe',
          name: 'cameraImage',
        },
      },
      {
        id: 3,
        title: 'drone',
        description: 'a drone',
        review: 'https://youtube.com/camera',
        dates_reserved: [],
        duration: 65,
        rent_fee: 'time',
        total_amount_payable: 'time',
        created_at: 'date',
        updated_at: 'date',
        image: {
          byte_size: 12345,
          url: 'https://image.qwe',
          name: 'droneImage',
        },
      },
      {
        id: 4,
        title: 'Ipad',
        description: 'an Ipad',
        review: 'https://youtube.com/camera',
        dates_reserved: [],
        duration: 56,
        rent_fee: 'time',
        total_amount_payable: 'time',
        created_at: 'date',
        updated_at: 'date',
        image: {
          byte_size: 12345,
          url: 'https://image.qwe',
          name: 'Ipad',
        },
      },
      {
        id: 5,
        title: 'Phone',
        description: 'a phone',
        review: 'https://youtube.com/phone',
        dates_reserved: [],
        duration: 34,
        rent_fee: 'time',
        total_amount_payable: 'time',
        created_at: 'date',
        updated_at: 'date',
        image: {
          byte_size: 12345,
          url: 'https://image.qwe',
          name: 'phoneimage',
        },
      },
    ];
    component = render(
      <Carousel collection={collection} />, { wrapper: MemoryRouter },
    );
  });

  test('rendered without crashing', () => {
    expect(component).toBeTruthy();
  });

  test('should not go to previous', () => {
    const previousButton = component.getByTestId('buttonPrevious');

    let title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');

    fireEvent.click(previousButton);

    title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');
  });

  test('should not go to next', () => {
    const buttonNext = component.getByTestId('buttonNext');

    let title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');

    fireEvent.click(buttonNext);

    title = component.getByText('Ipad');
    expect(title).toHaveTextContent('Ipad');
  });

  test('should go to next', () => {
    const buttonNext = component.getByTestId('buttonNext');

    let title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');

    fireEvent.click(buttonNext);

    title = component.getByText('Ipad');
    expect(title).toHaveTextContent('Ipad');
  });

  test('should go to previous', () => {
    const previousButton = component.getByTestId('buttonPrevious');
    const buttonNext = component.getByTestId('buttonNext');

    let title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');

    fireEvent.click(buttonNext);

    title = component.getByText('Ipad');
    expect(title).toHaveTextContent('Ipad');

    fireEvent.click(previousButton);

    title = component.getByText('camera');
    expect(title).toHaveTextContent('camera');
  });
});
