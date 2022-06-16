import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('Card component', () => {
  let component;
  beforeEach(() => {
    const cardData = {
      id: 1,
      title: 'phone',
      links: {
        fa: 'facebookLink',
        tt: 'twitterLink',
        yt: 'youtubeLink',
      },
      description: 'this is a phone',
      imageUrl: 'imageUrl',
    };

    component = render(
      <Card
        id={cardData.id}
        title={cardData.title}
        links={cardData.links}
        description={cardData.description}
        imageUrl={cardData.imageUrl}
      />,
      { wrapper: MemoryRouter },
    );
  });

  test('rendered without crashing', () => {
    expect(component).toBeTruthy();
  });
});
