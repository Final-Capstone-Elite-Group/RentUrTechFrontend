import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('rendered without crashing', () => {
    const component = render(<Button />);
    expect(component).toBeTruthy();
  });

  test('rendered to the right', () => {
    const component = render(<Button isRight>button</Button>);
    const button = component.getByText('button');
    expect(button.classList).toContain('right');
  });

  test('renders style', () => {
    const component = render(<Button style={{ position: 'absolute' }}>button</Button>);
    const button = component.getByText('button');
    expect(button).toHaveStyle('position: absolute');
  });

  test('mockHandler onClick', () => {
    const mockHandler = jest.fn();
    const component = render(<Button onClick={mockHandler}>button</Button>);
    const button = component.getByText('button');

    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('button should be desabled', () => {
    const component = render(<Button disabled>button</Button>);
    const button = component.getByText('button');
    expect(button.attributes).toHaveProperty('disabled');
  });
});
