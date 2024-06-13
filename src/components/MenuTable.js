import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import './MenuTable.css'; 

const MenuTable = ({ items, handleEdit, handleDelete, handleSort, sortDirection }) => {
  const renderSortIcon = (fieldName) => {
    if (sortDirection.field === fieldName) {
      return sortDirection.order === 'asc' ? ' ▲' : ' ▼';
    }
    return null;
  };

  const handleSortClick = (fieldName) => {
    handleSort(fieldName);
  };

  return (
    <Table striped bordered hover className="menu-table">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Category
          </th>
          <th>
            Options
          </th>
          <th onClick={() => handleSortClick('price')}>
            Price
            {renderSortIcon('price')}
          </th>
          <th onClick={() => handleSortClick('cost')}>
            Cost
            {renderSortIcon('cost')}
          </th>
          <th onClick={() => handleSortClick('stock')}>
            Stock
            {renderSortIcon('stock')}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.options}</td>
            <td>{item.price}</td>
            <td>{item.cost}</td>
            <td>{item.stock}</td>
            <td className="actions">
              <Button variant="info" size="sm" onClick={() => handleEdit(item)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

MenuTable.propTypes = {
  items: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortDirection: PropTypes.object.isRequired,
};

export default MenuTable;
