import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoomSelectItem from './RoomSelectItem';
import { PrimaryButton } from '../../components/Button';
import { IoArrowRedo } from 'react-icons/io5';

function RoomSelectList({ toggleShow, options, handleSelected }) {
  const renderedOptions = options.map((option) => {
    const { _id, isSelected, avatarImage, ...other } = option;
    return (
      <RoomSelectItem
        key={_id}
        selected={isSelected}
        avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
        handleItemClick={() => handleSelected(_id)}
        {...other}
      />
    );
  });

  return (
    <SelectContainer>
      <GroupTitle>Select your room members</GroupTitle>
      <List>
        <ListItem>{renderedOptions}</ListItem>
      </List>
      <ButtonWrapper onClick={toggleShow}>
        <PrimaryButton>
          Next
          <IconWrapper>
            <IoArrowRedo />
          </IconWrapper>
        </PrimaryButton>
      </ButtonWrapper>
    </SelectContainer>
  );
}

RoomSelectList.propTypes = {
  toggleShow: PropTypes.func,
  options: PropTypes.array.isRequired,
  handleSelected: PropTypes.func
};

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 480px;
  display: grid;
  grid-template-rows: repeat(1fr, 1fr, 1fr);

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const GroupTitle = styled.h3`
  grid-row: 1/ 2;
  align-self: flex-end;
  padding-left: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--main-color);
  text-transform: capitalize;

  @media screen and (min-width: 768px) {
    align-self: flex-start;
  }
`;

const List = styled.div`
  grid-row: 2/ 3;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  grid-row: 3/ 4;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.ul`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.span`
  position: relative;
  top: 2px;
  margin-left: 0.5rem;
`;

export default RoomSelectList;
