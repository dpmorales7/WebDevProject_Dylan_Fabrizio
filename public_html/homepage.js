// "Store" inserted projects (in array)
const projectList = [];

function clearForm() {
  return window.confirm("Clear the form?");
}

function toggleProjectForm() {
  const formDiv = document.getElementById("div_add_project_form");
  const btn = document.getElementById("btn_toggle_form");

  if (formDiv.style.display === "none") {
    formDiv.style.display = "block";
    btn.innerHTML = "Hide form";
  } else {
    formDiv.style.display = "none";
    btn.innerHTML = "Show form";
  }
}

function submitProjectForm() {
  //Returning False prevent form from actually submitting and refreshing the page
  if (window.confirm("Add this project to the preview list?") === false) {
    return false;
  }

  const title = document.getElementById("txt_title").value.trim();
  const owner = document.getElementById("sel_owner").value;
  const type = document.getElementById("sel_type").value;
  const stack = document.getElementById("txt_stack").value.trim();
  const desc = document.getElementById("txt_desc").value.trim();
  const img = document.getElementById("txt_img").value.trim();
  const repo = document.getElementById("txt_repo").value.trim();

  //Basic validation
  if (title.length === 0 || owner.length === 0 || stack.length === 0 || desc.length === 0) {
    window.alert("Please fill outfields");
    return false;
  }

  //Project Object
  const project = {
    title: title,
    owner: owner,
    type: type,
    stack: stack,
    desc: desc,
    img: img,
    repo: repo
  };

  //Intsert Porject object into array and update UI
  projectList.push(project);
  renderProjects();

  //Clearing form after inserting
  document.getElementById("frm_add_project").reset();
  return false;
}
//Converting projectList data into HTML and rendering it on the page
function renderProjects() {
  const container = document.getElementById("div_project_list");
  container.innerHTML = ""; 

  for (let p of projectList) {
    
    const col = document.createElement("div");
    col.setAttribute("class", "col-12 col-md-6");

    const card = document.createElement("div");
    card.setAttribute("class", "card shadow-sm h-100");

    if (p.img.length > 0) {
      const image = document.createElement("img");
      image.setAttribute("class", "card-img-top");
      image.setAttribute("alt", p.title);
      image.setAttribute("src", p.img);
      image.setAttribute("style", "height:180px; object-fit:cover;");
      card.appendChild(image);
    }

    const body = document.createElement("div");
    body.setAttribute("class", "card-body");

    const h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.innerHTML = p.title;

    const meta = document.createElement("p");
    meta.setAttribute("class", "text-muted mb-2");
    meta.innerHTML = `${p.owner} • ${p.type}`;

    const txt = document.createElement("p");
    txt.setAttribute("class", "card-text");
    txt.innerHTML = p.desc;

    const badge = document.createElement("span");
    badge.setAttribute("class", "badge text-bg-secondary");
    badge.innerHTML = p.stack;

    body.appendChild(h5);
    body.appendChild(meta);
    body.appendChild(txt);
    body.appendChild(badge);

    if (p.repo.length > 0) {
      const linkWrap = document.createElement("div");
      linkWrap.setAttribute("class", "mt-3");

      const a = document.createElement("a");
      a.setAttribute("class", "btn btn-outline-primary btn-sm");
      a.setAttribute("href", p.repo);
      a.setAttribute("target", "_blank");
      a.innerHTML = "GitHub Repo";

      linkWrap.appendChild(a);
      body.appendChild(linkWrap);
    }

    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  }
}
