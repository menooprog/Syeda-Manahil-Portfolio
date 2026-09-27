/* =====================================================
   SYEDA MANAHIL PORTFOLIO
   Interactive portfolio engine
===================================================== */


/* =====================================================
   DEFAULT DATA
===================================================== */

const DEFAULT_DATA = {

  profile: {

    name: "Syeda Manahil",

    intro:
      "I turn caffeine, creativity & code into interactive experiences.",

    about:
      "A software engineering student, web developer and creative person who enjoys building things that feel as good as they look.",

    linkedin: "",

    github:
      "https://github.com/menooprog",

    email:
      "your@email.com",

    image: ""

  },


  skills: [

    "HTML",
    "CSS",
    "JavaScript",
    "GitHub",
    "UI Design",
    "AI",
    "Vibe Coding",
    "Game Dev"

  ],


  projects: [

    {

      name:
        "Caffeinated Tutor",

      description:
        "An educational website for learning mathematics in a simple and visual way.",

      url:
        "https://menooprog.github.io/Caffeinated-tutor/",

      category:
        "web",

      image:
        ""

    },


    {

      name:
        "Coffee Run",

      description:
        "A coffee-themed game concept where Meno chases iced coffee cups.",

      url:
        "",

      category:
        "game",

      image:
        ""

    },


    {

      name:
        "AI Study Buddy",

      description:
        "A creative AI study project designed around free tools and interactive learning.",

      url:
        "",

      category:
        "web",

      image:
        ""

    }

  ],


  certificates: [

    {

      name:
        "Frontend Development Internship",

      description:
        "Decode Labs — Summer Internship",

      image:
        ""

    },


    {

      name:
        "Game Development: HTML to Unreal Engine Mastery",

      description:
        "Coursera certificate",

      image:
        ""

    },


    {

      name:
        "Introduction to Generative AI",

      description:
        "Coursera certificate",

      image:
        ""

    }

  ]

};


/* =====================================================
   LOAD DATA
===================================================== */

let data = loadData();


function loadData() {

  try {

    const saved =
      localStorage.getItem(
        "syedaManahilPortfolio"
      );

    if (saved) {

      return JSON.parse(saved);

    }

  }

  catch (error) {

    console.log(
      "Could not load saved data."
    );

  }


  return JSON.parse(
    JSON.stringify(DEFAULT_DATA)
  );

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveData(message = "Saved ✦") {

  localStorage.setItem(

    "syedaManahilPortfolio",

    JSON.stringify(data)

  );

  renderEverything();

  showToast(message);

}


/* =====================================================
   SAFE HTML
===================================================== */

function escapeHTML(value = "") {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


/* =====================================================
   ELEMENTS
===================================================== */

const projectsContainer =
  document.getElementById("projects");

const certificatesContainer =
  document.getElementById(
    "certificatesGrid"
  );

const skillsContainer =
  document.getElementById("skills");

const projectEditor =
  document.getElementById(
    "projectEditor"
  );

const certificateEditor =
  document.getElementById(
    "certificateEditor"
  );

const editor =
  document.getElementById("editor");

const backdrop =
  document.getElementById(
    "editorBackdrop"
  );


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function renderEverything() {

  renderProfile();

  renderSkills();

  renderProjects();

  renderCertificates();

  renderEditorProjects();

  renderEditorCertificates();

  document.getElementById(
    "projectCount"
  ).textContent =
    String(data.projects.length)
      .padStart(2, "0");

  document.getElementById(
    "certificateCount"
  ).textContent =
    String(data.certificates.length)
      .padStart(2, "0");

  document.getElementById(
    "year"
  ).textContent =
    new Date().getFullYear();

  setupRevealAnimations();

  setupProjectTilt();

}


/* =====================================================
   PROFILE
===================================================== */

function renderProfile() {

  document.getElementById(
    "heroName"
  ).textContent =
    data.profile.name;


  document.getElementById(
    "heroIntro"
  ).textContent =
    data.profile.intro;


  const aboutName =
    document.getElementById(
      "aboutName"
    );


  const nameParts =
    escapeHTML(
      data.profile.name
    )
    .toUpperCase()
    .split(" ");


  aboutName.innerHTML =
    nameParts.join("<br>") +
    "<span>.</span>";


  document.getElementById(
    "aboutText"
  ).textContent =
    data.profile.about;


  const linkedin =
    document.getElementById(
      "linkedinLink"
    );


  linkedin.href =
    data.profile.linkedin ||
    "#";


  linkedin.style.display =
    data.profile.linkedin
      ? "inline-block"
      : "none";


  document.getElementById(
    "githubLink"
  ).href =
    data.profile.github ||
    "#";


  document.getElementById(
    "emailLink"
  ).href =
    "mailto:" +
    (data.profile.email || "");


  const profile =
    document.getElementById(
      "profilePhoto"
    );


  if (data.profile.image) {

    profile.innerHTML =

      `<img
        class="profile-image"
        src="${data.profile.image}"
        alt="Syeda Manahil"
      >`;

  }

  else {

    profile.innerHTML =

      `<div class="profile-placeholder">
        SM
      </div>`;

  }

}


/* =====================================================
   SKILLS
===================================================== */

function renderSkills() {

  skillsContainer.innerHTML =

    data.skills

      .map(

        skill =>

          `<span>
            ${escapeHTML(skill)}
          </span>`

      )

      .join("");

}


/* =====================================================
   PROJECTS
===================================================== */

function renderProjects() {

  projectsContainer.innerHTML = "";


  data.projects.forEach(

    (project, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "project reveal";


      card.dataset.category =
        project.category ||
        "web";


      card.innerHTML = `

        <div class="project-visual">

          ${
            project.image

            ?

            `<img
              src="${project.image}"
              alt="${escapeHTML(
                project.name
              )}"
            >`

            :

            `<div class="project-number">
              ${String(index + 1).padStart(2, "0")}
            </div>`

          }

        </div>


        <div class="project-info">

          <div>

            <span class="project-category">

              ${escapeHTML(
                project.category ||
                "web"
              ).toUpperCase()}

            </span>


            <h3>
              ${escapeHTML(
                project.name
              )}
            </h3>


            <p>
              ${escapeHTML(
                project.description
              )}
            </p>

          </div>


          ${
            project.url

            ?

            `<a
              href="${escapeHTML(project.url)}"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              View ↗
            </a>`

            :

            ""

          }

        </div>

      `;


      projectsContainer.appendChild(card);

    }

  );

}


/* =====================================================
   CERTIFICATES
===================================================== */

function renderCertificates() {

  certificatesContainer.innerHTML = "";


  data.certificates.forEach(

    certificate => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "certificate reveal";


      card.innerHTML = `

        <div class="certificate-image">

          ${
            certificate.image

            ?

            `<img
              src="${certificate.image}"
              alt="${escapeHTML(
                certificate.name
              )}"
            >`

            :

            `<div class="certificate-placeholder">
              ✦
            </div>`

          }

        </div>


        <div class="certificate-info">

          <h3>
            ${escapeHTML(
              certificate.name
            )}
          </h3>

          <p>
            ${escapeHTML(
              certificate.description
            )}
          </p>

        </div>

      `;


      certificatesContainer.appendChild(card);

    }

  );

}


/* =====================================================
   EDITOR PROFILE
===================================================== */

function fillEditorProfile() {

  document.getElementById(
    "editName"
  ).value =
    data.profile.name;


  document.getElementById(
    "editIntro"
  ).value =
    data.profile.intro;


  document.getElementById(
    "editAbout"
  ).value =
    data.profile.about;


  document.getElementById(
    "editLinkedin"
  ).value =
    data.profile.linkedin;


  document.getElementById(
    "editGithub"
  ).value =
    data.profile.github;


  document.getElementById(
    "editEmail"
  ).value =
    data.profile.email;

}


/* =====================================================
   PROJECT EDITOR
===================================================== */

function renderEditorProjects() {

  projectEditor.innerHTML = "";


  data.projects.forEach(

    (project, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "editor-item";


      item.innerHTML = `

        <div class="editor-item-header">

          <strong>
            Project ${index + 1}
          </strong>

          <button
            class="remove-button"
            onclick="removeProject(${index})"
          >
            Remove
          </button>

        </div>


        <label>

          Project name

          <input
            type="text"
            value="${escapeHTML(
              project.name
            )}"
            onchange="updateProject(
              ${index},
              'name',
              this.value
            )"
          >

        </label>


        <label>

          Short description

          <textarea
            onchange="updateProject(
              ${index},
              'description',
              this.value
            )"
          >${escapeHTML(
            project.description
          )}</textarea>

        </label>


        <label>

          Project link

          <input
            type="url"
            placeholder="https://..."
            value="${escapeHTML(
              project.url
            )}"
            onchange="updateProject(
              ${index},
              'url',
              this.value
            )"
          >

        </label>


        <label>

          Category

          <select
            onchange="updateProject(
              ${index},
              'category',
              this.value
            )"
          >

            <option
              value="web"
              ${project.category === "web"
                ? "selected"
                : ""}
            >
              Web
            </option>

            <option
              value="game"
              ${project.category === "game"
                ? "selected"
                : ""}
            >
              Game
            </option>

            <option
              value="creative"
              ${project.category === "creative"
                ? "selected"
                : ""}
            >
              Creative
            </option>

          </select>

        </label>


        <label class="upload-label">

          Upload project picture

          <input
            type="file"
            accept="image/*"
            onchange="uploadProjectImage(
              ${index},
              this
            )"
          >

        </label>


        ${
          project.image

          ?

          `<button
            class="remove-button"
            onclick="removeProjectImage(${index})"
          >
            Remove picture
          </button>`

          :

          ""

        }

      `;


      projectEditor.appendChild(item);

    }

  );

}


/* =====================================================
   CERTIFICATE EDITOR
===================================================== */

function renderEditorCertificates() {

  certificateEditor.innerHTML = "";


  data.certificates.forEach(

    (certificate, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "editor-item";


      item.innerHTML = `

        <div class="editor-item-header">

          <strong>
            Certificate ${index + 1}
          </strong>

          <button
            class="remove-button"
            onclick="removeCertificate(${index})"
          >
            Remove
          </button>

        </div>


        <label>

          Certificate name

          <input
            type="text"
            value="${escapeHTML(
              certificate.name
            )}"
            onchange="updateCertificate(
              ${index},
              'name',
              this.value
            )"
          >

        </label>


        <label>

          Description

          <textarea
            onchange="updateCertificate(
              ${index},
              'description',
              this.value
            )"
          >${escapeHTML(
            certificate.description
          )}</textarea>

        </label>


        <label class="upload-label">

          Upload certificate picture

          <input
            type="file"
            accept="image/*"
            onchange="uploadCertificateImage(
              ${index},
              this
            )"
          >

        </label>


        ${
          certificate.image

          ?

          `<button
            class="remove-button"
            onclick="removeCertificateImage(${index})"
          >
            Remove picture
          </button>`

          :

          ""

        }

      `;


      certificateEditor.appendChild(item);

    }

  );

}


/* =====================================================
   PROJECT ACTIONS
===================================================== */

window.updateProject = function(
  index,
  property,
  value
) {

  data.projects[index][property] =
    value;

  saveData("Project updated ✦");

};


window.removeProject = function(
  index
) {

  if (
    confirm(
      "Delete this project?"
    )
  ) {

    data.projects.splice(
      index,
      1
    );

    saveData(
      "Project removed"
    );

  }

};


window.removeProjectImage =
function(index) {

  data.projects[index].image =
    "";

  saveData(
    "Project picture removed"
  );

};


/* =====================================================
   CERTIFICATE ACTIONS
===================================================== */

window.updateCertificate =
function(
  index,
  property,
  value
) {

  data.certificates[index][property] =
    value;

  saveData(
    "Certificate updated ✦"
  );

};


window.removeCertificate =
function(index) {

  if (
    confirm(
      "Delete this certificate?"
    )
  ) {

    data.certificates.splice(
      index,
      1
    );

    saveData(
      "Certificate removed"
    );

  }

};


window.removeCertificateImage =
function(index) {

  data.certificates[index].image =
    "";

  saveData(
    "Certificate picture removed"
  );

};


/* =====================================================
   ADD PROJECT
===================================================== */

document.getElementById(
  "addProject"
).addEventListener(
  "click",
  function() {

    data.projects.push({

      name:
        "New Project",

      description:
        "Write your project description here.",

      url:
        "",

      category:
        "web",

      image:
        ""

    });


    saveData(
      "New project added ✦"
    );

  }
);


/* =====================================================
   ADD CERTIFICATE
===================================================== */

document.getElementById(
  "addCertificate"
).addEventListener(
  "click",
  function() {

    data.certificates.push({

      name:
        "New Certificate",

      description:
        "Add certificate details here.",

      image:
        ""

    });


    saveData(
      "New certificate added ✦"
    );

  }
);


/* =====================================================
   IMAGE READER
===================================================== */

function readImage(file) {

  return new Promise(

    (resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload =
        () => resolve(
          reader.result
        );


      reader.onerror =
        reject;


      reader.readAsDataURL(
        file
      );

    }

  );

}


/* =====================================================
   UPLOAD PROJECT IMAGE
===================================================== */

window.uploadProjectImage =
async function(
  index,
  input
) {

  if (
    !input.files ||
    !input.files[0]
  ) {

    return;

  }


  data.projects[index].image =
    await readImage(
      input.files[0]
    );


  saveData(
    "Project picture uploaded ✦"
  );

};


/* =====================================================
   UPLOAD CERTIFICATE IMAGE
===================================================== */

window.uploadCertificateImage =
async function(
  index,
  input
) {

  if (
    !input.files ||
    !input.files[0]
  ) {

    return;

  }


  data.certificates[index].image =
    await readImage(
      input.files[0]
    );


  saveData(
    "Certificate uploaded ✦"
  );

};


/* =====================================================
   PROFILE SAVE
===================================================== */

document.getElementById(
  "saveProfile"
).addEventListener(
  "click",
  function() {

    data.profile.name =
      document.getElementById(
        "editName"
      ).value.trim();


    data.profile.intro =
      document.getElementById(
        "editIntro"
      ).value.trim();


    data.profile.about =
      document.getElementById(
        "editAbout"
      ).value.trim();


    data.profile.linkedin =
      document.getElementById(
        "editLinkedin"
      ).value.trim();


    data.profile.github =
      document.getElementById(
        "editGithub"
      ).value.trim();


    data.profile.email =
      document.getElementById(
        "editEmail"
      ).value.trim();


    saveData(
      "Profile saved ✦"
    );

  }
);


/* =====================================================
   PROFILE PICTURE
===================================================== */

document.getElementById(
  "profileUpload"
).addEventListener(
  "change",
  async function(event) {

    const file =
      event.target.files[0];


    if (!file) {

      return;

    }


    data.profile.image =
      await readImage(file);


    saveData(
      "Profile picture updated ✦"
    );

  }
);


/* =====================================================
   EDITOR OPEN
===================================================== */

document.getElementById(
  "openEditor"
).addEventListener(
  "click",
  function() {

    fillEditorProfile();

    editor.classList.add(
      "open"
    );

    backdrop.classList.add(
      "open"
    );

  }
);


/* =====================================================
   EDITOR CLOSE
===================================================== */

function closeEditor() {

  editor.classList.remove(
    "open"
  );

  backdrop.classList.remove(
    "open"
  );

}


document.getElementById(
  "closeEditor"
).addEventListener(
  "click",
  closeEditor
);


backdrop.addEventListener(
  "click",
  closeEditor
);


/* =====================================================
   FILTERS
===================================================== */

document.querySelectorAll(
  ".filter"
).forEach(

  button => {

    button.addEventListener(
      "click",
      function() {

        document
          .querySelectorAll(
            ".filter"
          )
          .forEach(
            b =>
              b.classList.remove(
                "active"
              )
          );


        this.classList.add(
          "active"
        );


        const filter =
          this.dataset.filter;


        document
          .querySelectorAll(
            ".project"
          )
          .forEach(
            card => {

              if (
                filter === "all" ||
                card.dataset.category ===
                  filter
              ) {

                card.style.display =
                  "block";

              }

              else {

                card.style.display =
                  "none";

              }

            }
          );

      }
    );

  }

);


/* =====================================================
   SCROLL REVEAL
===================================================== */

function setupRevealAnimations() {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

            }

          }
        );

      },

      {
        threshold:
          .12
      }

    );


  document
    .querySelectorAll(
      ".reveal"
    )
    .forEach(
      element =>
        observer.observe(
          element
        )
    );

}


/* =====================================================
   PROJECT 3D TILT
===================================================== */

function setupProjectTilt() {

  if (
    window.innerWidth < 800
  ) {

    return;

  }


  document
    .querySelectorAll(
      ".project"
    )
    .forEach(
      card => {

        card.addEventListener(
          "mousemove",
          event => {

            const rect =
              card.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            const centerX =
              rect.width / 2;


            const centerY =
              rect.height / 2;


            const rotateX =
              ((y - centerY) /
                centerY) *
              -3;


            const rotateY =
              ((x - centerX) /
                centerX) *
              3;


            card.style.transform =
              `perspective(1000px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-6px)`;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

}


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
  document.querySelector(
    ".cursor"
  );

const cursorDot =
  document.querySelector(
    ".cursor-dot"
  );


document.addEventListener(
  "mousemove",
  event => {

    if (
      window.innerWidth < 800
    ) {

      return;

    }


    cursor.style.left =
      event.clientX + "px";


    cursor.style.top =
      event.clientY + "px";


    cursorDot.style.left =
      event.clientX + "px";


    cursorDot.style.top =
      event.clientY + "px";

  }
);


/* =====================================================
   CURSOR HOVER EFFECT
===================================================== */

document.addEventListener(
  "mouseover",
  event => {

    if (
      event.target.closest(
        "a,button"
      )
    ) {

      cursor.style.width =
        "55px";

      cursor.style.height =
        "55px";

    }

  }
);


document.addEventListener(
  "mouseout",
  event => {

    if (
      event.target.closest(
        "a,button"
      )
    ) {

      cursor.style.width =
        "35px";

      cursor.style.height =
        "35px";

    }

  }
);


/* =====================================================
   THEME
===================================================== */

document.getElementById(
  "themeButton"
).addEventListener(
  "click",
  function() {

    document.body.classList.toggle(
      "light"
    );


    const isLight =
      document.body.classList.contains(
        "light"
      );


    localStorage.setItem(
      "portfolioTheme",
      isLight
        ? "light"
        : "dark"
    );

  }
);


if (
  localStorage.getItem(
    "portfolioTheme"
  ) === "light"
) {

  document.body.classList.add(
    "light"
  );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },

      2200

    );

}


/* =====================================================
   EXPORT
===================================================== */

document.getElementById(
  "exportData"
).addEventListener(
  "click",
  function() {

    const file =
      new Blob(

        [
          JSON.stringify(
            data,
            null,
            2
          )
        ],

        {
          type:
            "application/json"
        }

      );


    const url =
      URL.createObjectURL(
        file
      );


    const link =
      document.createElement(
        "a"
      );


    link.href =
      url;


    link.download =
      "syeda-manahil-portfolio-backup.json";


    link.click();


    URL.revokeObjectURL(
      url
    );


    showToast(
      "Backup exported ✦"
    );

  }
);


/* =====================================================
   IMPORT
===================================================== */

document.getElementById(
  "importData"
).addEventListener(
  "change",
  async function(event) {

    const file =
      event.target.files[0];


    if (!file) {

      return;

    }


    try {

      const text =
        await file.text();


      data =
        JSON.parse(text);


      saveData(
        "Backup imported ✦"
      );

    }

    catch {

      alert(
        "This backup file is invalid."
      );

    }

  }
);


/* =====================================================
   RESET
===================================================== */

document.getElementById(
  "resetData"
).addEventListener(
  "click",
  function() {

    const answer =
      confirm(
        "Reset your entire portfolio?"
      );


    if (!answer) {

      return;

    }


    data =
      JSON.parse(
        JSON.stringify(
          DEFAULT_DATA
        )
      );


    saveData(
      "Portfolio reset"
    );

  }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
  document.getElementById(
    "backTop"
  );


window.addEventListener(
  "scroll",
  function() {

    if (
      window.scrollY > 700
    ) {

      backTop.classList.add(
        "show"
      );

    }

    else {

      backTop.classList.remove(
        "show"
      );

    }

  }
);


backTop.addEventListener(
  "click",
  function() {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderEverything();

fillEditorProfile();
