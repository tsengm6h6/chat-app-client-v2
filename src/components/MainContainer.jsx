import PropTypes from 'prop-types';
import styled from 'styled-components';

function MainContainer({ children }) {
  return (
    <OuterContainer>
      <Container>{children}</Container>
    </OuterContainer>
  );
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export const OuterContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  overflow: auto;
`;

export const Container = styled.div`
  width: 100%;
  padding: 2rem 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainContainer;
