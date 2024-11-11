
 // Initialize game state
 const board = Array(9).fill(null);  // 9 cells on the board
 let currentPlayer = 'X';  // Start with player X
 let gameOver = false;  // Track if the game is over

 // Select elements
 const cells = document.querySelectorAll('.cell');
 const statusDiv = document.getElementById('status');
 const resetBtn = document.getElementById('resetBtn');

 // Check for a winner
 const checkWin = (player) => {
   const winPatterns = [
     [0, 1, 2],  // Row 1
     [3, 4, 5],  // Row 2
     [6, 7, 8],  // Row 3
     [0, 3, 6],  // Column 1
     [1, 4, 7],  // Column 2
     [2, 5, 8],  // Column 3
     [0, 4, 8],  // Diagonal 1
     [2, 4, 6]   // Diagonal 2
   ];
   return winPatterns.some(pattern => 
     pattern.every(index => board[index] === player)
   );
 };

 // Check if the board is full (tie game)
 const checkTie = () => {
   return board.every(cell => cell !== null);
 };

 // Update the board display
 const updateBoard = () => {
   cells.forEach((cell, index) => {
     cell.textContent = board[index] ? board[index] : '';
     cell.classList.toggle('taken', board[index] !== null);
   });
 };

 // Handle cell click
 const handleClick = (e) => {
   const index = e.target.getAttribute('data-index');

   // If the cell is already taken or the game is over, do nothing
   if (board[index] || gameOver) return;

   // Mark the cell with the current player's symbol (X or O)
   board[index] = currentPlayer;
   updateBoard();

   // Check for win or tie
   if (checkWin(currentPlayer)) {
     statusDiv.textContent = `Player ${currentPlayer} wins!`;
     gameOver = true;
   } else if (checkTie()) {
     statusDiv.textContent = "It's a tie!";
     gameOver = true;
   } else {
     // Switch to the next player
     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
     statusDiv.textContent = `Player ${currentPlayer}'s turn`;
   }
 };

 // Reset the game
 const resetGame = () => {
   board.fill(null);
   currentPlayer = 'X';
   gameOver = false;
   statusDiv.textContent = `Player X's turn`;
   updateBoard();
 };

 // Add event listeners
 cells.forEach(cell => cell.addEventListener('click', handleClick));
 resetBtn.addEventListener('click', resetGame);

