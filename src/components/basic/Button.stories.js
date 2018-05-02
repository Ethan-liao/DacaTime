import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from './Button';

storiesOf('Button', module)
  .add('standard', () => <Button to="/">Click me</Button>)
  .add('inverted', () =>
    <Button to="/" inverted>
      Click me
    </Button>,
  );
