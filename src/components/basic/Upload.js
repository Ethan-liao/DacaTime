import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Button from './Button';

let dropzoneRef;
const styles = {
  dropZone: {
    width: '500px',
    height: '75px',
    borderRadius: '5px',
    border: '#dfe3e8 solid 1px',
    padding: '20px 40px',
    marginRight: '20px',
  },
  fileName: {
    padding: '3px 5px',
    border: '1px solid black',
    marginRight: '20px',
    display: 'inline-block',
    width: '150px',
    overflow: 'scroll',
    verticalAlign: 'middle',
    minHeight: '28px',
  },
  text: {
    fontSize: '18px',
    marginRight: '10px',
    verticalAlign: 'middle',
  },
};

const Upload = props =>
  <div>
    <Dropzone
      disableClick
      style={styles.dropZone}
      ref={node => {
        dropzoneRef = node;
      }}
      onDrop={props.onDrop}
    >
      <div style={{ margin: 'auto', width: '320px' }}>
        <span style={styles.text}>File:</span>
        <span style={styles.fileName}>
          {props.file ? './' + props.file.name : ''}
        </span>
        <Button
          type="button"
          onClick={e => {
            dropzoneRef.open();
            e.stopPropagation();
          }}
        >
          Open
        </Button>
      </div>
    </Dropzone>
  </div>;

export default Upload;
