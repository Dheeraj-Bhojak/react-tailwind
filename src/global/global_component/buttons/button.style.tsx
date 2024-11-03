import styled from "styled-components";

export const SideLeftBounceYellow = styled.button`
  color: white;
  outline: none;
  background: transparent;
  letter-spacing: 0.0625em;
  padding: 8px 10px;
  text-transform: uppercase;
  line-height: 2;
  position: relative;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.5s;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: #fdc100;
    z-index: -1;
    border: none;
    transition: all 0.5s;
  }

  &:before {
    background: none;
    z-index: -2;
    transform: translate3D(0, 0, 0);
  }

  &:hover {
    color: black;
  }

  &:hover:after {
    transform: translate3D(0, 0, 0);
    transition: all 0.5s;
  }

  /* Bounce effect */
  &:hover:before,
  &:hover:after {
    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66) !important;
  }

  /* Slide Left effect */
  &:after {
    top: 0;
    z-index: -1;
    transform: translate3D(-101%, 0, 0);
  }

  &:hover:after {
    transform: translate3D(0, 0, 0);
    transition: all 0.5s;
  }
`;
export const SideLeftBounceBlue = styled.button`
  color: black;
  outline: none;
  background: transparent;
  letter-spacing: 0.0625em;
  padding: 8px 10px;
  text-transform: uppercase;
  line-height: 2;
  position: relative;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.5s;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: #4267b2;
    z-index: -1;
    border: none;
    transition: all 0.5s;
  }

  &:before {
    background: none;
    z-index: -2;
    transform: translate3D(0, 0, 0);
  }

  &:hover {
    color: white;
  }

  &:hover:after {
    transform: translate3D(0, 0, 0);
    transition: all 0.5s;
  }

  /* Bounce effect */
  &:hover:before,
  &:hover:after {
    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66) !important;
  }

  /* Slide Left effect */
  &:after {
    top: 0;
    z-index: -1;
    transform: translate3D(-101%, 0, 0);
  }

  &:hover:after {
    transform: translate3D(0, 0, 0);
    transition: all 0.5s;
  }
`;

export const PressButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  display: block;
  position: relative;
  background-color: #4267b2;
  font-size: 16px;
  font-weight: 300;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 25px 80px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 4px 6px #2b406b;

  &:active {
    box-shadow: none;
    top: 6px;
  }
`;
