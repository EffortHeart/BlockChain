import styled from 'styled-components'

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  background: #7b6fa0;
  border-radius: 14px;
  color: white;
  font-size: 16px;
  width: 100%;
  border-spacing: 0px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    table-layout: fixed;
    width: 1000px;
  `}
`

export const Th = styled.th`
  /* border-bottom: 2.5px solid ${({ theme }) => theme.secondary4}; */
  padding: 23px 22px;
  font-weight: 500;

  :nth-child(1) {
    padding-left: 25px;
  }
`

export const TBodyTr = styled.tr`
  :hover {
    background-color: ${({ theme }) => theme.black};
    cursor: pointer;
  }
`

export const Tr = styled.tr`
  :hover {
    background-color: ${({ theme }) => theme.black};
    cursor: pointer;
  }
`

export const TBodyTd = styled.td`
  padding: 12px 20px;
  border-bottom: 2.75px solid black;
`
