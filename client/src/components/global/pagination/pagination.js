import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import * as styles from '../../../styles/pagination/pagination'

export default class PaginationNumbers extends React.Component {
    render() {
        const { itemsPerPage, items, currentPage } = this.props;
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <PaginationItem key={number} active={number === currentPage ? true : false}>
                <PaginationLink id={number} onClick={(e)=>this.props.handleClick(e)}>
                    {number}
                </PaginationLink>
            </PaginationItem>
          );
        });

        return (
            <Pagination className={'mt-3 ' + styles.pagination}>
                {renderPageNumbers}
            </Pagination>
        );
    }
}