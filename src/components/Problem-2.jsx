import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Problem2 = () => {
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUSContactsModal, setShowUSContactsModal] = useState(false);
  const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from the provided API
    fetch('https://contact.mediusware.com/api/contacts/')
      .then(response => response.json())
      .then(data => setContacts(data.results))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const openAllContactsModal = () => {
    setShowAllContactsModal(true);
    setShowUSContactsModal(false);
    setShowContactDetailsModal(false);
    // navigate('/problem-2/all-contacts');
  };

  const openUSContactsModal = () => {
    setShowUSContactsModal(true);
    setShowAllContactsModal(false);
    setShowContactDetailsModal(false);
    // navigate('/problem-2/us-contacts'); 
  };

  const closeAllModals = () => {
    setShowAllContactsModal(false);
    setShowUSContactsModal(false);
    setShowContactDetailsModal(false);
  };

  const openContactDetailsModal = (contact) => {
    setSelectedContact(contact);
    setShowContactDetailsModal(true);
  };

  const filteredContacts = onlyEven ? contacts.filter(contact => contact.id % 2 === 0) : contacts.filter(contact =>
    contact.phone.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    (contact.country && contact.country.name.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const usContacts = contacts.filter(contact => contact.country && contact.country.name.toLowerCase() === 'united states');

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Button
            className="btn btn-lg btn-outline-primary"
            onClick={openAllContactsModal}
            style={{ backgroundColor: '#46139f' }}
          >
            All Contacts
          </Button>
          <Button
            className="btn btn-lg btn-outline-warning"
            onClick={openUSContactsModal}
            style={{ backgroundColor: '#ff7f50' }}
          >
            US Contacts
          </Button>
        </div>

        {/* All Contacts Modal */}
        <Modal show={showAllContactsModal} onHide={closeAllModals}>
          <Modal.Header closeButton>
                  
            <Modal.Title><Button disabled style={{backgroundColor:"#46139f"}}>All Contacts</Button></Modal.Title>
            <Button style={{textDecoration:"none", backgroundColor:"#ff7f50", color:"#ffff", marginLeft:"10px"}} variant="link" onClick={openUSContactsModal}>
            US Contacts
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {filteredContacts.map(contact => (
              <div key={contact.id} onClick={() => openContactDetailsModal(contact)}>
                {contact.phone} - {contact.country && contact.country.name}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              type="checkbox"
              id="onlyEvenCheckbox"
              label="Only even"
              checked={onlyEven}
              onChange={() => setOnlyEven(!onlyEven)}
            />
            <Button variant="secondary" onClick={closeAllModals}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* US Contacts Modal */}
        <Modal show={showUSContactsModal} onHide={closeAllModals}>
          <Modal.Header closeButton>
            <Modal.Title><Button disabled style={{backgroundColor:"#ff7f50"}}>US Contacts</Button></Modal.Title>
            <Button style={{textDecoration:"none", backgroundColor:"#46139f", color:"#ffff", marginLeft:"10px"}} variant="link" onClick={openAllContactsModal}>
              All Contacts
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {usContacts.map(contact => (
              <div key={contact.id} onClick={() => openContactDetailsModal(contact)}>
                {contact.phone} - {contact.country && contact.country.name}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              type="checkbox"
              id="onlyEvenCheckbox"
              label="Only even"
              checked={onlyEven}
              onChange={() => setOnlyEven(!onlyEven)}
            />
            <Button variant="secondary" onClick={closeAllModals}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Contact Details Modal */}
        <Modal show={showContactDetailsModal} onHide={() => setShowContactDetailsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedContact && (
              <>
                <p>ID: {selectedContact.id}</p>
                <p>Phone: {selectedContact.phone}</p>
                <p>Country: {selectedContact.country && selectedContact.country.name}</p>
                {/* Add more details as needed */}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowContactDetailsModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
