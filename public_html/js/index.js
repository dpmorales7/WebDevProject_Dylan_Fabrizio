// homepage.js – client-side logic for DevPortfolio Hub

// "Store" inserted projects (in array)
const projectList = [];

function clearForm() {
  return window.confirm("Clear the form?");
}

function toggleProjectForm() {
  const formDiv = document.getElementById("div_add_project_form");
  const btn     = document.getElementById("btn_toggle_form");
  if (formDiv.style.display === "none") {
    formDiv.style.display = "block";
    btn.innerHTML = "Hide Form";
  } else {
    formDiv.style.display = "none";
    btn.innerHTML = "Show Form";
  }
}

function submitProjectForm() {
  // Returning false prevents the form from submitting and refreshing the page
  if (window.confirm("Add this project to the preview list?") === false) {
    return false;
  }

  const title = document.getElementById("txt_title").value.trim();
  const owner = document.getElementById("sel_owner").value;
  const type  = document.getElementById("sel_type").value;
  const stack = document.getElementById("txt_stack").value.trim();
  const desc  = document.getElementById("txt_desc").value.trim();
  const img   = document.getElementById("txt_img").value.trim();
  const repo  = document.getElementById("txt_repo").value.trim();

  // Basic validation
  if (!title || !owner || !stack || !desc) {
    window.alert("Please fill out all required fields.");
    return false;
  }

  // Project object
  const project = { title, owner, type, stack, desc, img, repo };

  // Insert project object into array and update UI
  projectList.push(project);
  renderProjects();

  // Clear form after inserting
  document.getElementById("frm_add_project").reset();
  return false;
}

// Convert projectList data into HTML and render it on the page
function renderProjects() {
  const container = document.getElementById("div_project_list");
  container.innerHTML = "";

  for (let p of projectList) {
    const col  = document.createElement("div");
    col.className = "col-12 col-md-6";

    const card = document.createElement("div");
    card.className = "card shadow-sm h-100";

    if (p.img) {
      const image = document.createElement("img");
      image.className = "card-img-top";
      image.alt   = p.title;
      image.src   = p.img;
      image.style.cssText = "height:180px; object-fit:cover;";
      card.appendChild(image);
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = p.title;

    const meta = document.createElement("p");
    meta.className = "text-muted mb-2";
    meta.textContent = `${p.owner} • ${p.type}`;

    const txt = document.createElement("p");
    txt.className = "card-text";
    txt.textContent = p.desc;

    const badge = document.createElement("span");
    badge.className = "badge text-bg-secondary";
    badge.textContent = p.stack;

    body.appendChild(h5);
    body.appendChild(meta);
    body.appendChild(txt);
    body.appendChild(badge);

    if (p.repo) {
      const linkWrap = document.createElement("div");
      linkWrap.className = "mt-3";
      const a = document.createElement("a");
      a.className = "btn btn-outline-primary btn-sm";
      a.href   = p.repo;
      a.target = "_blank";
      a.textContent = "GitHub Repo";
      linkWrap.appendChild(a);
      body.appendChild(linkWrap);
    }

    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  }
}