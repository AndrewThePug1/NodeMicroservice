document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const quantity = document.getElementById('itemQuantity').value;
    const description = document.getElementById('itemDescription').value;

    fetch('/api/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity, description }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Item added successfully!');
        loadItems(); // Reload the list of items
    })
    .catch(error => console.error('Error:', error));
});

function loadItems() {
    fetch('/api/inventory')
    .then(response => response.json())
    .then(items => {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = ''; // Clear current items
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}, Description: ${item.description} `;
            
            // Create Update Button
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.onclick = function() { populateUpdateForm(item); };
            li.appendChild(updateBtn);

            // Create Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() { deleteItem(item.id); };
            li.appendChild(deleteBtn);

            itemList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteItem(itemId) {
    fetch(`/api/inventory/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok) {
            alert('Item deleted successfully!');
            loadItems(); // Reload the list of items
            resetUpdateForm(); // Reset and hide the update form
        } else {
            alert('Could not delete the item.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function populateUpdateForm(item) {
    document.getElementById('updateItemTitle').style.display = 'block';
    document.getElementById('updateItemForm').style.display = 'block';
    document.getElementById('updateItemId').value = item.id;
    document.getElementById('updateItemName').value = item.name;
    document.getElementById('updateItemQuantity').value = item.quantity;
    document.getElementById('updateItemDescription').value = item.description;

    // Scroll to the update form
    document.getElementById('updateItemTitle').scrollIntoView();
}

document.getElementById('updateItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('updateItemId').value;
    const name = document.getElementById('updateItemName').value;
    const quantity = document.getElementById('updateItemQuantity').value;
    const description = document.getElementById('updateItemDescription').value;

    fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity, description }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Item updated successfully!');
        loadItems(); // Reload the list of items
        resetUpdateForm(); // Reset and hide the update form here
    })
    .catch(error => console.error('Error:', error));
});

function resetUpdateForm() {
    document.getElementById('updateItemTitle').style.display = 'none';
    document.getElementById('updateItemForm').style.display = 'none';
    document.getElementById('updateItemId').value = '';
    document.getElementById('updateItemName').value = '';
    document.getElementById('updateItemQuantity').value = '';
    document.getElementById('updateItemDescription').value = '';
}

// Call loadItems on page load to populate the list of items
window.onload = function() {
    loadItems();
};
