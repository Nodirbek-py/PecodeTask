import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  background: #303030;
  box-shadow: 0 3px 15px #404040;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #fff;
`;

const Line = styled.hr`
  width: 100%;
  background-color: #fff;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
  align-items: center;
  justify-content: space-between;
`;
const Cell = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.main`
  padding: 10px 1rem;
`;
export { Navbar, Content, Row, Table, Cell, Line };
