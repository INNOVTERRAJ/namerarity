document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const nameInput = document.getElementById('nameInput');
  const resultDiv = document.getElementById('result');
  
  // Hide result initially
  resultDiv.style.display = 'none';

  if (searchButton) {
    searchButton.addEventListener('click', async () => {
      const name = nameInput.value.trim();

      if (name === "") {
        alert("Please enter a name.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/name/${name.toLowerCase()}`);
        const data = await response.json();

        if (response.ok) {
          // Show result and populate data
          resultDiv.style.display = 'block';
          document.getElementById('name').textContent = data.name || "Not found";
          document.getElementById('meaning').textContent = data.meaning || "Not found";
          document.getElementById('frequency').textContent = data.frequency || "Not found";
          document.getElementById('rarity').textContent = data.rarity || "Not found";
        } else {
          alert(data.message || "Name not found. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Unable to fetch data. Please try again later.");
      }
    });
  } else {
    console.error("searchButton not found in the DOM");
  }
});
