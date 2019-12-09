import styled from 'styled-components';

export const SPagination = styled.ul`
    display: flex;
    padding-left: 0;
    justify-content: center;
    list-style: none;
`;

export const SPaginationItem = styled.li`
    padding: 0.2rem;

    &:first-of-type {
        padding-left: 0;
    }

    &:last-of-type {
        padding-right: 0;
    }
`;

export const SCurrentPage = styled.span`
    display: flex;
    padding: 0.6rem 0.8rem;
    border: 1px solid var(--blue);
    background-color: var(--blue);
    font-weight: var(--font-weight-bold);
    color: var(--white);
`;

export const SPaginationButton = styled.button`
    padding: 0.6rem 0.8rem;
    border: 1px solid transparent;
    background-color: transparent;
    transition-property: background-color, border-color;
    transition-duration: 300ms;
    cursor: pointer;

    &:hover {
        border-color: var(--grey);
        background-color: var(--grey);
    }
`;

export const SPaginationButtonPrevNext = styled(SPaginationButton)`
    background-color: var(--grey);
`;