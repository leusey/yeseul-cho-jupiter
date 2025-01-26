// Create a footer and add it to the body
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  const body = document.querySelector("body");
  body.appendChild(footer);

  // Add a copyright to the footer
  const today = new Date();
  const year = today.getFullYear();
  const copyright = document.createElement("p");
  copyright.innerHTML = `&#169; YeSeul Cho ${year}`;
  footer.appendChild(copyright);

  // Populate the skills list
  const skills = ["JavaScript", "HTML", "CSS", "Microsoft Office", "GitHub"];
  const skillsSection = document.getElementById("Skills");
  const skillsList = skillsSection.querySelector("ul");

  for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
  }

  // Create a message form
  const messageForm = document.querySelector("form[name='leave_message']");
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // Add event listener to the form
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve form values
    const userName = e.target.usersName.value;
    const email = e.target.usersEmail.value;
    const usersMessage = e.target.usersMessage.value;

    console.log(`name: ${userName}, email: ${email}, message: ${usersMessage}`);

    // Make the message section visible
    if (messageSection) {
      messageSection.hidden = false;
    }

    // Create a new message element
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${userName}</a> <span>${usersMessage}</span>`;

    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.setAttribute("type", "button");
    removeButton.addEventListener("click", function (e) {
      const entry = e.target.parentNode;
      entry.remove();

      // Hide the messages section when the list is empty
      if (messageList.children.length === 0) {
        messageSection.hidden = true;
      }
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    // Reset the form
    e.target.reset();
  });
});

// DOM Selectors (Getting HTML elements)
const projectSection = document.getElementById("Projects");
console.log("projectSection: ", projectSection);

const projectList = projectSection.querySelector("ul");
console.log("projectList: ", projectList);

// Fetch (Getting Projects from Github API)
fetch("https://api.github.com/users/leusey/repos")
  .then((response) => {
    return response.json();
  })
  .then((repositories) => {
    console.log("repositories: ", repositories);

    // Loop through repositories array and:
    for (let i = 0; i < repositories.length; i++) {
      // - get specific project data out
      const project = repositories[i].name;
      // - create DOM (HTML) elements
      const li = document.createElement("li");
      // - put the data from the project into the DOM element (li)
      li.innerText = project;
      // - add DOM elements to your page
      projectList.appendChild(li);
    }
  })
  .catch((error) => {
    console.log(error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = error.message;
    errorMessage.classList.add("error");
    projectSection.appendChild(errorMessage);
  });
