import PropTypes from 'prop-types';

let messageId = 0;

export const getNextId = () => {
  messageId = messageId +1;
  return messageId;
};

export const messageFactory = (type, value) => {
  let message = {
    id: getNextId(),
    type
  };

  switch(type){
    case 'text':
      message['text'] = value;
      break;
    case 'image':
      message['uri'] = value;
      break;
    case 'location':
      message['coordinate'] = value;
      break;
    default:
      throw new Error(`Invalid message type ${type}`)
  }

  return message;
};

export const MessageShape = PropTypes.shape({
  id        : PropTypes.number.isRequired,
  type      : PropTypes.oneOf(['text', 'image', 'location']),
  text      : PropTypes.string,
  uri       : PropTypes.string,
  coordinate: PropTypes.shape({
    latitude : PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
});
