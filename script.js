// Select all tickets
const tickets = document.querySelectorAll('.ticket');

// Loop through each ticket
tickets.forEach(ticket => {
    // Select the number cells for the current ticket
    const numberCells = ticket.querySelectorAll('.number');

    // Add click event listener to number cells in the current ticket
    numberCells.forEach(cell => {
        cell.addEventListener('click', () => {
            // Toggle the "clicked" class to add or remove the X
            cell.classList.toggle('clicked');
        });
    });

    // Select the refuse and automatic buttons for the current ticket
    const refuseCell = ticket.querySelector('.refuse');
    const automaticCell = ticket.querySelector('.automatic');

    // Add click event listener for "refuse" option in the current ticket
    refuseCell.addEventListener('click', () => {
        refuseCell.classList.toggle('clicked'); // Toggle selection style
    });

    // Add click event listener for "automatic" option in the current ticket
    automaticCell.addEventListener('click', () => {
        automaticCell.classList.toggle('clicked'); // Toggle selection style
    });
});