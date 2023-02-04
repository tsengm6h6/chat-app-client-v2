import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { HiOutlineRefresh } from 'react-icons/hi';

function AvatarUploader({ error, isLoading, avatar, onGenerate }) {
  return (
    <Wrapper>
      <AvatarBox>
        {avatar ? (
          <AvatarImage
            error={error}
            isLoading={isLoading}
            src={`data:image/svg+xml;base64,${avatar}`}
            alt="user-avatar"
          />
        ) : null}
      </AvatarBox>
      <GenerateButton onClick={onGenerate}>
        <IconWrapper isLoading={isLoading}>
          <HiOutlineRefresh />
        </IconWrapper>
        <ButtonText>{error ? 'Please try again later' : isLoading ? 'Generating...' : 'Generate Avatar'}</ButtonText>
      </GenerateButton>
    </Wrapper>
  );
}

AvatarUploader.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  avatar: PropTypes.string,
  onGenerate: PropTypes.func
};

const Wrapper = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  width: 80%;
  gap: 1rem;
`;

const AvatarBox = styled.div`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: var(--bg-color-darken);
  padding: 0.5rem;
`;

const fadeout = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const AvatarImage = styled.img`
  animation: ${(props) => (props.isLoading ? fadeout : null)} 2s ease-out;
  animation-fill-mode: ${(props) => (props.error ? 'backwards' : 'forwards')};
`;

const GenerateButton = styled.button`
  flex: 1;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: var(--bg-color-main);
  border-radius: 4px;
  border: 1.5px solid var(--primary);
  padding: 0.5rem;
  cursor: pointer;
  filter: saturate(90%);

  &:hover {
    background-color: var(--bg-color-darken);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 0.5rem;
  color: var(--primary);
  font-weight: 900;
  animation: ${(props) => (props.isLoading ? rotate : null)} 2s linear infinite;
`;

const ButtonText = styled.p`
  text-align: start;
  color: var(--main-color);
`;

export default AvatarUploader;
