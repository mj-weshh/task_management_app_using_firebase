firebase.initializeApp({
     apiKey: "AIzaSyC9x2n0kv1_kCU32JWQ8SrRz9jTlgUGPgA",
     authDomain: "my-first-project-70f89.firebaseapp.com",
     projectId: "my-first-project-70f89",
});


const db = firebase.firestore();


function addTask(){
     const taskInput = document.getElementById("task-input");
     const task = taskInput.ariaValueMax.trim();
     if (task !== ""){
          db.collection("tasks").add({
               task: task,
               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          taskInput.value = "";
     }
}


function renderTasks(doc){
     const taskList = document.getElementById("task-list");
     const taskItem = document.createElement("li");
     taskItem.className = "task-item";
     taskItem.innerHTML = `
          <span>${doc.data().task}</span>
          <button onclick="deleteTask('${doc.id}')">Delete</button>
     `;
     taskList.appendChild(taskItem);
}


db.collection("tasks")
     .orderBy("timestamp", "desc")
     .onSnapshot(snapshot => {
          const changes = snapshot.docChanges();
          changes.foreach(change => {
               if (change.type === "added") {
                    renderTasks(change.doc);
               }
          });
     });


function deleteTask(id){
     db.collection("tasks").doc(id).delete();
}