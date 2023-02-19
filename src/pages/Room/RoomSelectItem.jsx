import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';

function RoomSelectItem(props) {
  const { selected, avatarImage, name, isOnline, handleItemClick } = props;

  return (
    <ListItem onClick={handleItemClick} selected={selected}>
      <ListContent>
        <AvatarBox>
          <Avatar onlineStyle={isOnline ? 'dotted' : null} src={avatarImage} alt="avatar" />
        </AvatarBox>
        <ContentTitle selected={selected}>{name}</ContentTitle>
      </ListContent>
    </ListItem>
  );
}

RoomSelectItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  avatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  handleItemClick: PropTypes.func.isRequired
};

const ListItem = styled.li`
  width: 100%;
  min-width: none;
  max-width: 480px;
  height: 100px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${(props) => (props.selected ? 'var(--primary)' : 'var(--bg-color-darken)')};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.selected ? 'inset -1px -1px 4px var(--shadow-color-primary)' : '2px 2px 4px var(--shadow-color)'};
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: ${(props) =>
      props.selected ? 'inset -2px -2px 4px var(--shadow-color-primary)' : '2px 2px 4px var(--shadow-color)'};
    filter: contrast(95%);
  }

  &:active {
    bottom: -1px;
  }
`;

const ListContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 4fr;
  gap: 1rem;
`;

const AvatarBox = styled.div`
  justify-self: flex-end;
`;

const ContentTitle = styled.h2`
  font-size: 1.25em;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${(props) => (props.selected ? 'var(--bg-color-main)' : 'var(--main-color)')};
  justify-self: flex-start;
  align-self: center;
`;

export default RoomSelectItem;
