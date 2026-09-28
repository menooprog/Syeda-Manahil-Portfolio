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

    linkedin:
      "https://www.linkedin.com/in/syeda-manahyll/",

    github:
      "https://github.com/menooprog",

    email:
      "syedamanahil06@gmail.com",

    image: "manahil profil pic.jpeg"

  },


  skills: [

    "HTML",
    "CSS",
    "JavaScript",
    "GitHub",
    "UI Design",
    "AI",
    "Game Dev",
    "WordPress",
    "Scratch",
    "Unreal Engine Basics"

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
        "A coffee-themed game concept where Meno chases iced coffee cups with fun physics.",

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
        "A creative AI study project designed around free tools and interactive learning workflows.",

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
        "Introduction to Generative AI",

      issuer:
        "Google Cloud • Coursera",

      category:
        "ai",

      image:
        "intro to gen AI by google coursera certificate.jpeg",

      description:
        "Authorized by Google Cloud via Coursera. Explores foundational generative AI principles, Large Language Models, deep learning architectures, and responsible AI implementation.",

      skills: [
        "Generative AI",
        "Google Cloud",
        "Deep Learning",
        "Prompt Engineering"
      ]

    },


    {

      name:
        "Introduction to Large Language Models (LLMs)",

      issuer:
        "Google Cloud • Coursera",

      category:
        "ai",

      image:
        "into to llm by google coursera certificate.jpeg",

      description:
        "Authorized by Google Cloud via Coursera. In-depth study of Large Language Model (LLM) architectures, prompt tuning, generative application workflows, and cloud AI infrastructure.",

      skills: [
        "LLMs",
        "Google Cloud",
        "NLP",
        "Cloud AI"
      ]

    },


    {

      name:
        "Game Development: HTML to Unreal Engine Mastery",

      issuer:
        "Coursera",

      category:
        "game",

      image:
        "game dev htm to unreal enginer mastery cousera certificate.jpeg",

      description:
        "Comprehensive game development pipeline bridging web-based game mechanics (HTML5 Canvas & JS) to 3D game architectures, physics, and gameplay workflows in Unreal Engine.",

      skills: [
        "Game Development",
        "Unreal Engine",
        "HTML5 Canvas",
        "Gameplay Scripting"
      ]

    },


    {

      name:
        "Basic Game Development with Levels Using Scratch",

      issuer:
        "Coursera Project Network",

      category:
        "game",

      image:
        "basic game dev with levels using scratch certificate.jpeg",

      description:
        "Interactive mechanics, multi-level progression design, collision triggers, sprite animation, and event-driven architecture built using Scratch.",

      skills: [
        "Scratch",
        "Game Design",
        "Level Architecture",
        "Logic & Physics"
      ]

    },


    {

      name:
        "Create a Website Using WordPress: Free Hosting & Sub-domain",

      issuer:
        "Coursera Project Network",

      category:
        "web",

      image:
        "wordpress certificate by coursera.jpeg",

      description:
        "End-to-end CMS setup, themes, responsive layouts, plugins, SEO essentials, and web publishing workflows on WordPress.",

      skills: [
        "WordPress",
        "CMS",
        "Web Design",
        "SEO & Publishing"
      ]

    },


    {

      name:
        "Frontend Development Internship",

      issuer:
        "Decode Labs",

      category:
        "web",

      image:
        "decode lap internship certificate.jpeg",

      description:
        "Summer Frontend Engineering Internship developing responsive user interfaces, modular components, and collaborative web application code.",

      skills: [
        "Frontend Engineering",
        "UI/UX",
        "JavaScript",
        "Team Collaboration"
      ]

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

      const parsed =
        JSON.parse(saved);

      if (parsed && Array.isArray(parsed.skills)) {

        parsed.skills =
          parsed.skills.filter(
            skill =>
              String(skill).trim().toLowerCase() !== "vibe coding"
          );

      }

      if (parsed && parsed.profile) {

        if (!parsed.profile.linkedin || parsed.profile.linkedin === "#" || parsed.profile.linkedin.trim() === "") {

          parsed.profile.linkedin =
            "https://www.linkedin.com/in/syeda-manahyll/";

        }

        if (!parsed.profile.email || parsed.profile.email === "your@email.com" || parsed.profile.email.trim() === "") {

          parsed.profile.email =
            "syedamanahil06@gmail.com";

        }

        // Migrate profile picture if empty
        if (!parsed.profile.image || parsed.profile.image.trim() === "") {

          parsed.profile.image =
            "manahil profil pic.jpeg";

        }

      }

      // Upgrade certificates if missing newly added images or if fewer than 6
      if (parsed && Array.isArray(parsed.certificates)) {

        const internshipCert = parsed.certificates.find(
          c => c.name && c.name.toLowerCase().includes("internship")
        );

        if (internshipCert && (!internshipCert.image || internshipCert.image.trim() === "")) {

          internshipCert.image =
            "decode lap internship certificate.jpeg";

        }

        const needsUpgrade =
          parsed.certificates.length < 6 ||
          parsed.certificates.some(c => !c.image);

        if (needsUpgrade) {

          parsed.certificates =
            JSON.parse(JSON.stringify(DEFAULT_DATA.certificates));

        }

      }
      else if (parsed) {

        parsed.certificates =
          JSON.parse(JSON.stringify(DEFAULT_DATA.certificates));

      }

      return parsed;

    }

  }

  catch (error) {

    console.log(
      "Could not load saved data.",
      error
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

  if (aboutName) {

    const nameParts =
      escapeHTML(
        data.profile.name
      )
      .toUpperCase()
      .split(" ");

    aboutName.innerHTML =
      nameParts.join("<br>") +
      "<span>.</span>";

  }


  const aboutText =
    document.getElementById(
      "aboutText"
    );

  if (aboutText) {

    aboutText.textContent =
      data.profile.about;

  }


  const profileImgSrc =
    data.profile.image ||
    "manahil profil pic.jpeg";


  const heroProfileImg =
    document.getElementById(
      "heroProfileImg"
    );

  if (heroProfileImg) {

    heroProfileImg.src =
      profileImgSrc;

  }


  const aboutAvatarImg =
    document.getElementById(
      "aboutAvatarImg"
    );

  if (aboutAvatarImg) {

    aboutAvatarImg.src =
      profileImgSrc;

  }


  const linkedin =
    document.getElementById(
      "linkedinLink"
    );

  if (linkedin) {

    linkedin.href =
      data.profile.linkedin ||
      "https://www.linkedin.com/in/syeda-manahyll/";

    linkedin.style.display =
      "inline-flex";

  }


  const heroLinkedin =
    document.getElementById(
      "heroLinkedinLink"
    );

  if (heroLinkedin) {

    heroLinkedin.href =
      data.profile.linkedin ||
      "https://www.linkedin.com/in/syeda-manahyll/";

    heroLinkedin.style.display =
      "inline-flex";

  }


  const contactLinkedin =
    document.getElementById(
      "contactLinkedinLink"
    );

  if (contactLinkedin) {

    contactLinkedin.href =
      data.profile.linkedin ||
      "https://www.linkedin.com/in/syeda-manahyll/";

  }


  const github =
    document.getElementById(
      "githubLink"
    );

  if (github) {

    github.href =
      data.profile.github ||
      "#";

  }


  const heroGithub =
    document.getElementById(
      "heroGithubLink"
    );

  if (heroGithub) {

    heroGithub.href =
      data.profile.github ||
      "#";

  }


  const emailLinkEl =
    document.getElementById(
      "emailLink"
    );

  if (emailLinkEl) {

    emailLinkEl.href =
      "mailto:" +
      (data.profile.email || "");

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

let activeCertFilter = "all";

function renderCertificates() {

  if (!certificatesContainer) return;

  certificatesContainer.innerHTML = "";

  let countAll = data.certificates.length;
  let countAi = 0;
  let countGame = 0;
  let countWeb = 0;

  data.certificates.forEach(c => {
    const cat = (c.category || "web").toLowerCase();
    if (cat === "ai") countAi++;
    else if (cat === "game") countGame++;
    else if (cat === "web") countWeb++;
  });

  const countAllEl = document.getElementById("certCountAll");
  if (countAllEl) countAllEl.textContent = countAll;

  const countAiEl = document.getElementById("certCountAi");
  if (countAiEl) countAiEl.textContent = countAi;

  const countGameEl = document.getElementById("certCountGame");
  if (countGameEl) countGameEl.textContent = countGame;

  const countWebEl = document.getElementById("certCountWeb");
  if (countWebEl) countWebEl.textContent = countWeb;


  data.certificates.forEach((certificate, index) => {

    const category = (certificate.category || "web").toLowerCase();

    const card = document.createElement("article");
    card.className = "certificate reveal";
    card.dataset.category = category;

    if (activeCertFilter !== "all" && category !== activeCertFilter) {
      card.style.display = "none";
    }

    const categoryLabel =
      category === "ai"
        ? "AI & Machine Learning"
        : category === "game"
        ? "Game Development"
        : "Web & CMS";

    const issuer = escapeHTML(certificate.issuer || "Coursera");
    const skillsList = Array.isArray(certificate.skills)
      ? certificate.skills
      : [];

    const visualHTML = certificate.image
      ? `
        <div class="certificate-media" onclick="openCertModal(${index})" title="Click to inspect credential">
          <div class="certificate-backdrop-blur" style="background-image: url('${escapeHTML(certificate.image)}')"></div>
          <div class="certificate-img-container">
            <img
              src="${escapeHTML(certificate.image)}"
              alt="${escapeHTML(certificate.name)}"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="certificate-overlay">
            <span class="cert-zoom-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Inspect Credential
            </span>
          </div>
          <span class="cert-issuer-badge">${issuer}</span>
        </div>
      `
      : `
        <div class="certificate-media cert-media-badge" onclick="openCertModal(${index})" title="Click to inspect credential">
          <div class="cert-badge-visual">
            <span class="cert-badge-emblem">✦</span>
            <span class="cert-badge-role">${escapeHTML(certificate.name)}</span>
            <span class="cert-badge-org">${issuer}</span>
          </div>
          <div class="certificate-overlay">
            <span class="cert-zoom-btn">Inspect Details</span>
          </div>
          <span class="cert-issuer-badge">${issuer}</span>
        </div>
      `;

    card.innerHTML = `
      ${visualHTML}

      <div class="certificate-info">
        <span class="cert-category-tag">${categoryLabel}</span>

        <h3>
          ${escapeHTML(certificate.name)}
        </h3>

        <p>
          ${escapeHTML(certificate.description)}
        </p>

        ${
          skillsList.length > 0
            ? `
              <div class="cert-skills-list">
                ${skillsList.map(s => `<span>${escapeHTML(s)}</span>`).join("")}
              </div>
            `
            : ""
        }

        <div class="cert-card-footer">
          <button class="cert-view-btn" onclick="openCertModal(${index})">
            <span>View Certificate</span> ↗
          </button>
          <span class="cert-status-dot" title="Verified by ${issuer}">● Verified</span>
        </div>
      </div>
    `;

    certificatesContainer.appendChild(card);

  });

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

          Issuer (e.g. Google Cloud, Coursera, Decode Labs)

          <input
            type="text"
            value="${escapeHTML(
              certificate.issuer || ''
            )}"
            onchange="updateCertificate(
              ${index},
              'issuer',
              this.value
            )"
          >

        </label>


        <label>

          Category

          <select
            onchange="updateCertificate(
              ${index},
              'category',
              this.value
            )"
          >

            <option value="ai" ${certificate.category === "ai" ? "selected" : ""}>AI & Machine Learning</option>
            <option value="game" ${certificate.category === "game" ? "selected" : ""}>Game Development</option>
            <option value="web" ${certificate.category === "web" ? "selected" : ""}>Web & WordPress</option>

          </select>

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


        <label>

          Skills & Competencies (comma separated)

          <input
            type="text"
            value="${escapeHTML(
              (certificate.skills || []).join(', ')
            )}"
            onchange="updateCertificateSkills(
              ${index},
              this.value
            )"
          >

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

          `<div style="display:flex; align-items:center; gap:10px; margin: 6px 0;">
            <img src="${escapeHTML(certificate.image)}" style="width: 50px; height: 38px; object-fit: contain; border-radius: 4px; border: 1px solid rgba(255,255,255,.2);">
            <button
              class="remove-button"
              onclick="removeCertificateImage(${index})"
            >
              Remove picture
            </button>
          </div>`

          :

          ""

        }

      `;


      certificateEditor.appendChild(item);

    }

  );

}


window.updateCertificateSkills = function(index, value) {

  if (!data.certificates[index]) return;

  data.certificates[index].skills =
    value
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

  saveData("Certificate skills updated ✦");

};


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

        let cardRaf = null;

        card.addEventListener(
          "mousemove",
          event => {

            if (cardRaf) cancelAnimationFrame(cardRaf);

            cardRaf = requestAnimationFrame(() => {

              const rect = card.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const rotateX = ((y - centerY) / centerY) * -4;
              const rotateY = ((x - centerX) / centerX) * 4;

              card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            });

          }
        );

        card.addEventListener(
          "mouseleave",
          () => {

            if (cardRaf) cancelAnimationFrame(cardRaf);
            card.style.transform = "";

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

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!cursorRaf) {

      cursorRaf = requestAnimationFrame(() => {

        cursor.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        cursorDot.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        cursorRaf = null;

      });

    }

  },
  { passive: true }
);

let cursorRaf = null;
let mouseX = 0;
let mouseY = 0;


/* =====================================================
   CURSOR HOVER EFFECT
===================================================== */

document.addEventListener(
  "mouseover",
  event => {

    if (
      event.target.closest(
        "a, button, .cert-filter, .certificate-media, .profile-photo, .floating-sticker"
      )
    ) {

      cursor.style.width = "52px";
      cursor.style.height = "52px";
      cursor.style.borderColor = "var(--purple)";
      cursor.style.backgroundColor = "rgba(197,177,242,.1)";

    }

  }
);


document.addEventListener(
  "mouseout",
  event => {

    if (
      event.target.closest(
        "a, button, .cert-filter, .certificate-media, .profile-photo, .floating-sticker"
      )
    ) {

      cursor.style.width = "35px";
      cursor.style.height = "35px";
      cursor.style.borderColor = "var(--pink)";
      cursor.style.backgroundColor = "transparent";

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
   CONTACT FORM & GMAIL SUBMISSION
===================================================== */

const contactForm =
  document.getElementById("contactForm");

const contactSubmitBtn =
  document.getElementById("contactSubmitBtn");

const submitBtnText =
  document.getElementById("submitBtnText");

const submitBtnIcon =
  document.getElementById("submitBtnIcon");



if (contactForm) {

  contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nameInput =
      document.getElementById("contactName");

    const emailInput =
      document.getElementById("contactEmail");

    const messageInput =
      document.getElementById("contactMessage");


    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    if (!name || !email || !message) {

      return;

    }


    // Loading state
    contactSubmitBtn.disabled = true;
    submitBtnText.textContent = "Sending...";
    submitBtnIcon.textContent = "⏳";


    try {

      const targetEmail =
        data.profile.email || "syedamanahil06@gmail.com";

      const response = await fetch(
        `https://formsubmit.co/ajax/${targetEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `Portfolio Message from ${name} (${email})`,
            _template: "table",
            _captcha: "false"
          })
        }
      );


      const resData = await response.json();


      if (response.ok || resData.success === "true" || resData.success === true) {

        contactForm.reset();

        submitBtnText.textContent = "Sent ✦";
        submitBtnIcon.textContent = "✓";

        setTimeout(() => {

          submitBtnText.textContent = "Send Message";
          submitBtnIcon.textContent = "✦";
          contactSubmitBtn.disabled = false;

        }, 2500);

      }

      else {

        throw new Error(resData.message || "Submission failed");

      }

    }

    catch (error) {

      console.warn("Direct API sending encountered an issue, offering mailto fallback:", error);

      // Fallback: open mail client with message pre-filled
      const targetEmail = data.profile.email || "syedamanahil06@gmail.com";
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Hi Syeda Manahil,\n\n${message}\n\nFrom: ${name} (${email})`);

      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      contactSubmitBtn.disabled = false;
      submitBtnText.textContent = "Send Message";
      submitBtnIcon.textContent = "✦";

    }

  });

}


/* Auto focus contact form name when clicking Get in Touch */
document.querySelectorAll('a[href="#contact"]').forEach(anchor => {

  anchor.addEventListener("click", () => {

    setTimeout(() => {

      const nameInput = document.getElementById("contactName");

      if (nameInput) {

        nameInput.focus();

      }

    }, 500);

  });

});


/* =====================================================
   CERTIFICATE LIGHTBOX MODAL
===================================================== */

let currentCertIndex = 0;
let isCertZoomed = false;

window.openCertModal = function(index) {

  if (!data.certificates || !data.certificates[index]) return;

  currentCertIndex = index;
  isCertZoomed = false;

  const cert = data.certificates[index];
  const modalBackdrop = document.getElementById("certModalBackdrop");
  const modalImg = document.getElementById("certModalImg");
  const modalTitle = document.getElementById("certModalTitle");
  const modalDesc = document.getElementById("certModalDesc");
  const modalIssuer = document.getElementById("certModalIssuer");
  const modalCategory = document.getElementById("certModalCategory");
  const modalSkills = document.getElementById("certModalSkills");
  const modalFullLink = document.getElementById("certModalFullLink");
  const certCounter = document.getElementById("certCounter");
  const certVisual = document.getElementById("certModalVisual");

  if (certVisual) {

    certVisual.classList.remove("zoom-active");

  }

  if (modalImg) {

    if (cert.image) {

      modalImg.src = cert.image;
      modalImg.style.display = "block";

      if (modalFullLink) {

        modalFullLink.href = cert.image;
        modalFullLink.style.display = "inline-flex";

      }

    }
    else {

      modalImg.style.display = "none";

      if (modalFullLink) {

        modalFullLink.style.display = "none";

      }

    }

  }

  if (modalTitle) modalTitle.textContent = cert.name;
  if (modalDesc) modalDesc.textContent = cert.description;

  if (modalIssuer) {

    modalIssuer.textContent = cert.issuer || "Coursera";

  }

  if (modalCategory) {

    const cat = (cert.category || "web").toLowerCase();
    modalCategory.textContent =
      cat === "ai"
        ? "AI & ML"
        : cat === "game"
        ? "Game Dev"
        : "Web & CMS";

  }

  if (modalSkills) {

    const skills = Array.isArray(cert.skills) ? cert.skills : [];
    modalSkills.innerHTML =
      skills
        .map(s => `<span class="cert-modal-tag">${escapeHTML(s)}</span>`)
        .join("");

  }

  if (certCounter) {

    certCounter.textContent = `${index + 1} / ${data.certificates.length}`;

  }

  if (modalBackdrop) {

    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";

  }

  playAudioFeedback("open");

};


window.closeCertModal = function() {

  const modalBackdrop = document.getElementById("certModalBackdrop");

  if (modalBackdrop) {

    modalBackdrop.classList.remove("open");

  }

  const certVisual = document.getElementById("certModalVisual");

  if (certVisual) {

    certVisual.classList.remove("zoom-active");

  }

  isCertZoomed = false;
  document.body.style.overflow = "";

  playAudioFeedback("close");

};


window.navigateCert = function(direction) {

  if (!data.certificates || data.certificates.length === 0) return;

  let newIndex = currentCertIndex + direction;

  if (newIndex < 0) {

    newIndex = data.certificates.length - 1;

  }
  else if (newIndex >= data.certificates.length) {

    newIndex = 0;

  }

  openCertModal(newIndex);

};


const certModalVisualEl = document.getElementById("certModalVisual");

if (certModalVisualEl) {

  certModalVisualEl.addEventListener("click", () => {

    isCertZoomed = !isCertZoomed;
    certModalVisualEl.classList.toggle("zoom-active", isCertZoomed);
    playAudioFeedback("click");

  });

}


const certModalCloseBtn = document.getElementById("certModalClose");

if (certModalCloseBtn) {

  certModalCloseBtn.addEventListener("click", closeCertModal);

}


const certPrevBtn = document.getElementById("certPrevBtn");

if (certPrevBtn) {

  certPrevBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    navigateCert(-1);

  });

}


const certNextBtn = document.getElementById("certNextBtn");

if (certNextBtn) {

  certNextBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    navigateCert(1);

  });

}


const certModalBackdropEl = document.getElementById("certModalBackdrop");

if (certModalBackdropEl) {

  certModalBackdropEl.addEventListener("click", (e) => {

    if (e.target === certModalBackdropEl) {

      closeCertModal();

    }

  });

}


document.addEventListener("keydown", (e) => {

  const modal = document.getElementById("certModalBackdrop");

  if (modal && modal.classList.contains("open")) {

    if (e.key === "Escape") {

      closeCertModal();

    }
    else if (e.key === "ArrowLeft") {

      navigateCert(-1);

    }
    else if (e.key === "ArrowRight") {

      navigateCert(1);

    }

  }

});


/* =====================================================
   CERTIFICATE CATEGORY FILTERS
===================================================== */

document.querySelectorAll(".cert-filter").forEach(button => {

  button.addEventListener("click", function() {

    document
      .querySelectorAll(".cert-filter")
      .forEach(b => b.classList.remove("active"));

    this.classList.add("active");
    activeCertFilter = this.dataset.certFilter;

    playAudioFeedback("click");

    document
      .querySelectorAll("#certificatesGrid .certificate")
      .forEach(card => {

        const cat = card.dataset.category || "web";

        if (activeCertFilter === "all" || cat === activeCertFilter) {

          card.style.display = "block";

        }
        else {

          card.style.display = "none";

        }

      });

  });

});


/* =====================================================
   PROFILE PHOTO INTERACTIONS & TILT
===================================================== */

function setupProfileInteractions() {

  const profilePhotoEl = document.getElementById("profilePhoto");

  if (profilePhotoEl) {

    profilePhotoEl.addEventListener("click", () => {

      playAudioFeedback("pop");
      showToast("Syeda Manahil ✦ Ready to build & collaborate!");
      createSparkles(profilePhotoEl);

    });

  }

  const profileWrap = document.getElementById("profileFrameWrap");

  if (!profileWrap || window.innerWidth < 800) return;

  let rafId = null;

  profileWrap.addEventListener("mousemove", (e) => {

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {

      const rect = profileWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      profileWrap.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    });

  });

  profileWrap.addEventListener("mouseleave", () => {

    if (rafId) cancelAnimationFrame(rafId);
    profileWrap.style.transform = "";

  });

}


function createSparkles(target) {

  const emojis = ["✨", "✦", "★", "💖", "☕", "🎮"];

  for (let i = 0; i < 6; i++) {

    const spark = document.createElement("span");
    spark.className = "sparkle-particle";
    spark.textContent = emojis[i % emojis.length];

    const angle = (i / 6) * Math.PI * 2;
    const dist = 50 + Math.random() * 45;

    spark.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    spark.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    spark.style.left = "50%";
    spark.style.top = "50%";

    target.appendChild(spark);

    setTimeout(() => spark.remove(), 900);

  }

}


/* =====================================================
   AUDIO FEEDBACK (SYNTHESIZED WEB AUDIO API)
===================================================== */

let soundEnabled = localStorage.getItem("portfolioSound") === "true";
const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");

function updateSoundUI() {

  if (soundIcon) {

    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";

  }

}

updateSoundUI();

if (soundButton) {

  soundButton.addEventListener("click", () => {

    soundEnabled = !soundEnabled;
    localStorage.setItem("portfolioSound", soundEnabled);
    updateSoundUI();

    if (soundEnabled) {

      playAudioFeedback("pop");
      showToast("Audio feedback enabled 🔊");

    }
    else {

      showToast("Audio muted 🔇");

    }

  });

}


function playAudioFeedback(type = "click") {

  if (!soundEnabled) return;

  try {

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {

      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(1080, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);

    }
    else if (type === "open") {

      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);

    }
    else if (type === "close") {

      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);

    }
    else if (type === "pop") {

      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.09);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);

    }

  }
  catch (e) {

    // Web Audio blocked or not supported

  }

}


/* =====================================================
   STATS COUNTER ANIMATION
===================================================== */

let statsAnimated = false;

function setupStatsCounter() {

  const statsSection = document.querySelector(".stats-section");
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !statsAnimated) {

        statsAnimated = true;
        animateNumber("projectCount", data.projects.length);
        animateNumber("certificateCount", data.certificates.length);

      }

    });

  }, { threshold: 0.25 });

  observer.observe(statsSection);

}


function animateNumber(elementId, targetValue) {

  const el = document.getElementById(elementId);
  if (!el) return;

  const duration = 1200;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (targetValue - start) * ease);

    el.textContent = String(current).padStart(2, "0");

    if (progress < 1) {

      requestAnimationFrame(update);

    }
    else {

      el.textContent = String(targetValue).padStart(2, "0");

    }

  }

  requestAnimationFrame(update);

}


/* =====================================================
   SCROLLSPY NAVBAR
===================================================== */

function setupScrollspy() {

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {

    let current = "";
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {

      if (scrollPos >= section.offsetTop) {

        current = section.getAttribute("id");

      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (current && link.getAttribute("href") === `#${current}`) {

        link.classList.add("active");

      }

    });

  }, { passive: true });

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const mobileNavToggle = document.getElementById("mobileNavToggle");
const navLinksContainer = document.getElementById("navLinks");

if (mobileNavToggle && navLinksContainer) {

  mobileNavToggle.addEventListener("click", () => {

    navLinksContainer.classList.toggle("mobile-open");
    playAudioFeedback("click");

  });

  document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

      navLinksContainer.classList.remove("mobile-open");

    });

  });

}


/* =====================================================
   SYNC DEFAULT MEDIA BUTTON
===================================================== */

const syncMediaBtn = document.getElementById("syncDefaultMedia");

if (syncMediaBtn) {

  syncMediaBtn.addEventListener("click", () => {

    data.profile.image = "manahil profil pic.jpeg";
    data.certificates = JSON.parse(JSON.stringify(DEFAULT_DATA.certificates));
    saveData("Synced with latest certificates & photos ✦");

  });

}


/* =====================================================
   INITIALIZE
===================================================== */

renderEverything();

fillEditorProfile();

setupProfileInteractions();

setupStatsCounter();

setupScrollspy();


