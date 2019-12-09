import styled from 'styled-components';
import { layout } from '../../../styles';

export const SWrapper = styled.div`
    overflow-x: scroll;
    margin: 0 1rem;
    border: 1px solid var(--grey-light);

    @media ${layout.md} {
        border: none;
    }
    
`;

export const STable = styled.table`
    margin: 0 auto;
    border-collapse: collapse;
    color: var(--black);
`;

export const STableTd = styled.td`
    padding: .75rem;
    border-top: 1px solid var(--grey-light);
    text-align: center;
`;

export const STableTh = styled.th`
    text-align: center;
`;

export const STableHeadThInput = styled(STableTh)`
    padding: 0.2rem;
`;

export const STableHeadTh = styled(STableTh)`
    padding: .75rem;
    border-bottom: 2px solid var(--grey-light);
`;

export const STableBodyTr = styled.tr`
    &:nth-of-type(odd) {
        background-color: rgba(0,0,0,.05);
    }
`;