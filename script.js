// Load notes when page opens
document.addEventListener("DOMContentLoaded", loadNotes);

// Save Note
document.getElementById("saveBtn").addEventListener("click", saveNote);

// Text formatting
function formatText(command) {
    document.execCommand(command, false, null);
}

// Save note to localStorage
function saveNote() {
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const tags = document.getElementById("tags").value.trim();
    const content = document.getElementById("noteContent").innerHTML.trim();

    if (title === "" || content === "" || content === "Write your note here...") {
        alert("Please enter a title and note content!");
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        category: category,
        tags: tags,
        content: content
    };

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    clearForm();
    loadNotes();
}

// Display notes
function loadNotes() {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p><strong>📂 Category:</strong> ${note.category}</p>
            <p><strong>🏷️ Tags:</strong> ${note.tags}</p>
            <div>${note.content}</div>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        notesContainer.appendChild(noteCard);
    });
}

// Delete note
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Clear input fields
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("tags").value = "";
    document.getElementById("noteContent").innerHTML = "Write your note here...";
}