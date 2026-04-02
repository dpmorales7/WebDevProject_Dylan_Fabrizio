// homepage.js – client-side logic for DevPortfolio Hub

let editingProjectId = null;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("frm_add_project");
  form.addEventListener("submit", submitProjectForm);
  loadEditProjectFromQuery();
});

function clearForm(event) {
  if (event && window.confirm("Clear the form?") === false) {
    event.preventDefault();
    return false;
  }

  resetFormState();
  hideStatus();
  return true;
}

function toggleProjectForm() {
  const formDiv = document.getElementById("div_add_project_form");
  const btn = document.getElementById("btn_toggle_form");
  if (formDiv.style.display === "none") {
    formDiv.style.display = "block";
    btn.innerHTML = "Hide Form";
  } else {
    formDiv.style.display = "none";
    btn.innerHTML = "Show Form";
  }
}

async function loadEditProjectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const editId = Number(params.get("edit"));

  if (!editId) {
    return;
  }

  try {
    const response = await fetch(`/api/projects/${editId}`);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const project = await response.json();
    startEditProject(project);
  } catch (error) {
    console.error("Failed to load project for editing:", error);
    showStatus("Could not load that project for editing.", "danger");
  }
}

async function submitProjectForm(event) {
  event.preventDefault();

  const title = document.getElementById("txt_title").value.trim();
  const owner = document.getElementById("sel_owner").value;
  const type = normalizeType(document.getElementById("sel_type").value);
  const stack = document.getElementById("txt_stack").value.trim();
  const desc = document.getElementById("txt_desc").value.trim();
  const img = document.getElementById("txt_img").value.trim();
  const repo = document.getElementById("txt_repo").value.trim();

  if (!title || !owner || !stack || !desc) {
    showStatus("Please fill out all required fields.", "danger");
    return false;
  }

  const project = { title, owner, type, stack, desc, img, repo };
  const isEditing = editingProjectId !== null;
  const confirmMessage = isEditing
    ? "Update this project on the server?"
    : "Add this project to the server?";

  if (!window.confirm(confirmMessage)) {
    return false;
  }

  const url = isEditing ? `/api/projects/${editingProjectId}` : "/api/projects";
  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    await response.json();
    document.getElementById("frm_add_project").reset();

    if (isEditing) {
      showStatus("Project updated successfully.", "success");
    } else {
      showStatus("Project added successfully.", "success");
    }

    resetFormState();
  } catch (error) {
    console.error("Failed to save project:", error);
    showStatus("Could not save the project to the server.", "danger");
  }

  return false;
}

function startEditProject(project) {
  editingProjectId = project._id;
  document.getElementById("txt_title").value = project.title || "";
  document.getElementById("sel_owner").value = project.owner || "";
  document.getElementById("sel_type").value = project.type || "Web App";
  document.getElementById("txt_stack").value = project.stack || "";
  document.getElementById("txt_desc").value = project.desc || "";
  document.getElementById("txt_img").value = project.img || "";
  document.getElementById("txt_repo").value = project.repo || "";
  document.getElementById("btn_submit_project").textContent = "Update Project";
  showStatus(`Editing project #${project._id}. Submit the form to save changes.`, "warning");
  document.getElementById("addProject").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetFormState() {
  editingProjectId = null;
  document.getElementById("btn_submit_project").textContent = "Add Project";
  const url = new URL(window.location.href);
  url.searchParams.delete("edit");
  window.history.replaceState({}, "", url.pathname + url.search + url.hash);
}

function showStatus(message, type) {
  const status = document.getElementById("project_form_status");
  status.className = `alert alert-${type} mt-3`;
  status.textContent = message;
  status.style.display = "block";
}

function hideStatus() {
  const status = document.getElementById("project_form_status");
  status.style.display = "none";
  status.textContent = "";
  status.className = "mt-3";
}

function normalizeType(type) {
  const map = {
    "Systems / Low-level": "Systems",
    "Data / AI": "Data/AI"
  };
  return map[type] || type;
}
