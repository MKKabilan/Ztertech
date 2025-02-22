document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("company-description").innerText = data.company_description;

            let teamContainer = document.getElementById("team-members");
            teamContainer.innerHTML = ""; // Clear previous content

            data.team.forEach(member => {
                let div = document.createElement("div");
                div.classList.add("team-member");
                div.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                `;
                teamContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading JSON data:", error));
});