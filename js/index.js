document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const footer = document.querySelector("footer");
  const copyright = document.createElement("p");
  copyright.innerHTML = `&#169; YeSeul Cho ${thisYear}`;
  footer.appendChild(copyright);
});
const skills = ["JavaScript", "HTML", "CSS", "Microsoft Office", "GitHub"];
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}
