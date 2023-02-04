import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
function Avatar({ onlineStyle, size, ...otherProps }) {
  return (
    <StyledAvatar onlineStyle={onlineStyle} size={size}>
      <AvatarImage {...otherProps} />
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  onlineStyle: PropTypes.string,
  size: PropTypes.string
};

export function MultiAvatar({ size, ...otherProps }) {
  return (
    <StyledMultiAvatar size={size}>
      <AvatarImage {...otherProps} />
    </StyledMultiAvatar>
  );
}

MultiAvatar.propTypes = {
  size: PropTypes.string
};

const StyledAvatar = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 0.9rem;
    height: 0.9rem;
    background-color: ${(props) => (props.onlineStyle === 'dotted' ? 'var(--warning)' : 'transparent')};
    filter: contrast(150%) brightness(105%);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          min-width: 35px;
          min-height: 35px;
          width: 35px;
          height: 35px;
        `;
      case 'medium':
        return css`
          min-width: 50px;
          min-height: 50px;
          width: 50px;
          height: 50px;
        `;
      default:
        return css`
          min-width: 60px;
          min-height: 60px;
          width: 60px;
          height: 60px;
        `;
    }
  }}
`;
const AvatarImage = styled.img`
  object-fit: cover;
  object-position: center;
  filter: saturate(75%);
  border-radius: 50%;
`;

const StyledMultiAvatar = styled(StyledAvatar)`
  transform: scale(1);

  &:not(:first-child) {
    margin-left: -8px;
  }
`;

export default Avatar;
