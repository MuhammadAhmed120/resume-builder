"use strict";
const form = document.getElementById("resume-form");
const resumeDisplayElement = document.getElementById("resume-display");
const shareableLinkContainer = document.getElementById("shareable-link-container");
const shareableLinkElement = document.getElementById("shareable-link");
const downloadPdfButton = document.getElementById("download-pdf");
const profileImageInput = document.getElementById("profile-image");
let profileImageUrl = null;
// Handle profile image upload
profileImageInput.addEventListener("change", (event) => {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImageUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username")
        .value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills")
        .value;
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    const resumeHTML = `
    <h2>Editable Resume</h2>
    <h3>Personal Information</h3>
    <p><b>Profile picture:</b></p>
    <img src="${profileImageUrl}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%; margin-bottom: 15px; display: block;">
    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
    `;
    resumeDisplayElement.innerHTML = resumeHTML;
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkContainer.style.display = "block";
    console.log("shareableLinkContainer.style.display = block, COMPLETED");
    shareableLinkElement.href = shareableURL;
    console.log("shareableURL", shareableURL);
    shareableLinkElement.textContent = shareableURL + "HELLO";
});
downloadPdfButton.addEventListener("click", () => {
    window.print();
});
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phone").value =
                resumeData.phone;
            document.getElementById("education").value =
                resumeData.education;
            document.getElementById("experience").value =
                resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
            if (resumeData.profileImageUrl) {
                profileImageUrl = resumeData.profileImageUrl;
            }
        }
    }
});
