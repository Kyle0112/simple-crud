import React, { useState, useEffect } from 'react';
import { ref, push, update, remove, orderByChild, query, onValue } from 'firebase/database';
import { database } from './firebaseConfig';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import MenuForm from './components/MenuForm';
import MenuTable from './components/MenuTable';
import './MenuManager.css';

const MenuManager = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    category: '',
    name: '',
    options: '',
    price: '',
    cost: '',
    stock: ''
  });
  const [show, setShow] = useState(false);
  const [sortDirection, setSortDirection] = useState({ field: '', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const itemsRef = ref(database, 'items');
    onValue(itemsRef, (snapshot) => {
      const itemsData = snapshot.val();
      const itemsList = itemsData ? Object.keys(itemsData).map(key => ({ id: key, ...itemsData[key] })) : [];
      setItems(itemsList);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...item };

    if (!item.id) {
      const itemsRef = ref(database, 'items');
      push(itemsRef, newItem)
        .then((newItemRef) => {
          const newItemId = newItemRef.key;
          console.log(`New item added with ID: ${newItemId}`);
          handleClose();
        })
        .catch((error) => {
          console.error(`Error adding new item: ${error.message}`);
        });
    } else {
      const itemRef = ref(database, `items/${item.id}`);
      update(itemRef, newItem)
        .then(() => {
          console.log(`Item with ID ${item.id} updated successfully.`);
          handleClose();
        })
        .catch((error) => {
          console.error(`Error updating item: ${error.message}`);
        });
    }
  };

  const handleEdit = (item) => {
    setItem(item);
    handleShow();
  };

  const handleDelete = (id) => {
    const itemRef = ref(database, `items/${id}`);
    remove(itemRef)
      .then(() => {
        console.log(`Item with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error removing item: ${error.message}`);
      });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setItem({
      category: '',
      name: '',
      options: '',
      price: '',
      cost: '',
      stock: ''
    });
  };

  const handleSort = (field) => {
    const order = sortDirection.field === field && sortDirection.order === 'asc' ? 'desc' : 'asc';
    setSortDirection({ field, order });
    const itemsRef = ref(database, 'items');
    const sortedQuery = query(itemsRef, orderByChild(field));
    onValue(sortedQuery, (snapshot) => {
      const itemsData = snapshot.val();
      let sortedItems = itemsData ? Object.keys(itemsData).map(key => ({ id: key, ...itemsData[key] })) : [];
      
      
      if (['price', 'cost', 'stock'].includes(field)) {
        sortedItems.sort((a, b) => {
          const aValue = parseFloat(a[field]);
          const bValue = parseFloat(b[field]);
          if (order === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });
      } else {
        sortedItems.sort((a, b) => {
          if (order === 'asc') {
            return a[field] > b[field] ? 1 : -1;
          } else {
            return a[field] < b[field] ? 1 : -1;
          }
        });
      }

      setItems(sortedItems);
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setItems(filteredItems);
  };

  return (
    <Container className="menu-manager">
      <h1 className="mt-4 mb-4">Menu Manager</h1>
      <Form className="search-form">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          onChange={handleSearch}
          value={searchTerm}
        />
      </Form>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.id ? 'Edit Item' : 'Add Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MenuForm
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            item={item}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <MenuTable
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSort={handleSort}
        sortDirection={sortDirection}
      />
    </Container>
  );
};

export default MenuManager;
