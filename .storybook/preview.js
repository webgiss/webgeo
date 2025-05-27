import { withRedux } from './withReduxDecorator'

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [withRedux],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;