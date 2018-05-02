import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Upload from './Upload';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.state = { files: [] };
  }

  handleDrop(files) {
    console.log(files[0]);
    this.setState({ files });
  }

  render() {
    return (
      <div>
        <Upload onDrop={this.handleDrop} file={this.state.files[0]} />
      </div>
    );
  }
}
storiesOf('Upload Widget', module).add('Renders', () => <Upload />);

storiesOf('Upload Widget', module).add('Takes Props', () => <Wrapper />);
