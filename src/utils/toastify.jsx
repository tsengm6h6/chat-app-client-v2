import React from 'react';
import { toast } from 'react-toastify';
import {
  BsFillCheckCircleFill,
  BsFillInfoCircleFill,
  BsExclamationOctagonFill,
  BsExclamationTriangleFill
} from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledIcon = styled.div`
  width: 30px;
  height: 30px;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDefault = styled(StyledIcon)`
  color: var(--primary);
`;

const StyledInfo = styled(StyledIcon)`
  color: var(--secondary);
`;

const StyledError = styled(StyledIcon)`
  color: var(--danger);
`;

const StyledWarning = styled(StyledIcon)`
  color: var(--warning);
`;

function DefaultIcon() {
  return (
    <StyledDefault>
      <BsFillCheckCircleFill />
    </StyledDefault>
  );
}

function InfoIcon() {
  return (
    <StyledInfo>
      <BsFillInfoCircleFill />
    </StyledInfo>
  );
}

function ErrorIcon() {
  return (
    <StyledError>
      <BsExclamationOctagonFill />
    </StyledError>
  );
}

function WarningIcon() {
  return (
    <StyledWarning>
      <BsExclamationTriangleFill />
    </StyledWarning>
  );
}

export const defaultToast = (text) =>
  toast.success(text, {
    icon: DefaultIcon
  });

export const infoToast = (text) =>
  toast.info(text, {
    icon: InfoIcon
  });

export const errorToast = (text) =>
  toast.error(text, {
    icon: ErrorIcon
  });

export const warningToast = (text) =>
  toast.warn(text, {
    icon: WarningIcon
  });
