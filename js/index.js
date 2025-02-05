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

  // Initially hide the messages section if there are no messages
  if (messageList.children.length === 0) {
    messageSection.hidden = true;
  }

  // Add event listener to the form
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve form values
    const userName = e.target.usersName.value;
    const email = e.target.usersEmail.value;
    const usersMessage = e.target.usersMessage.value;

    console.log(`name: ${userName}, email: ${email}, message: ${usersMessage}`);

    // Make the message section visible
    messageSection.hidden = false;

    // Create a new message element
    const newMessage = document.createElement("li");

    // Create an anchor element for the name
    const authorLink = document.createElement("a");
    // Email link
    authorLink.href = `mailto:${email}`;
    // Set the text to the author's name
    authorLink.innerText = userName;
    // Add spacing between the name and message
    authorLink.style.marginRight = "10px";

    // Create a span for the message text
    const messageSpan = document.createElement("span");
    messageSpan.innerText = usersMessage;

    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.setAttribute("type", "button");
    removeButton.addEventListener("click", function () {
      newMessage.remove();

      // Check after removing if the list is empty
      if (messageList.children.length === 0) {
        messageSection.hidden = true;
      }
    });

    // Append elements to the message item
    newMessage.appendChild(authorLink);
    newMessage.appendChild(messageSpan);
    newMessage.appendChild(removeButton);

    // Append the new message to the list
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
      // Create DOM (HTML) elements
      const project = document.createElement("li");

      // Create an anchor element
      const projectLink = document.createElement("a");
      // Set the URL to the repo
      projectLink.href = repositories[i].html_url;
      // Set the text to the repo name
      projectLink.innerText = repositories[i].name;
      // Open link in a new tab
      projectLink.target = "_blank";
      // Security best practice
      projectLink.rel = "noopener noreferrer";
      console.log(project);

      // Add the anchor to the list item
      project.appendChild(projectLink);

      // Add the list item to the project list
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    console.error("An error occurred: ", error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = error.message;
    errorMessage.classList.add("error");
    projectSection.appendChild(errorMessage);
  });
