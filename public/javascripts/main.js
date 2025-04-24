document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const editModal = new bootstrap.Modal(document.getElementById('editTaskModal'));

    let currentTaskItem = null;

    // Add task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        try {
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    title,
                    description
                })
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    // Delete task
    taskList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.closest('li');
            const taskId = taskItem.dataset.id;

            try {
                const response = await fetch(`/tasks/${taskId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    taskItem.remove();
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }
    });

    // Change task status
    taskList.addEventListener('change', async (e) => {
        if (e.target.classList.contains('status-toggle')) {
            const taskItem = e.target.closest('li');
            const taskId = taskItem.dataset.id;
            const completed = e.target.checked;

            try {
                const response = await fetch(`/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed })
                });

                if (response.ok) {
                    taskItem.classList.toggle('list-group-item-success', completed);
                }
            } catch (err) {
                console.error('Error:', err);
                e.target.checked = !completed;
            }
        }
    });

    // Update task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            currentTaskItem = e.target.closest('li');
            const id = currentTaskItem.dataset.id;
            const title = currentTaskItem.querySelector('.task-title').textContent.trim();
            const description = currentTaskItem.querySelector('.task-description').textContent.trim();

            document.getElementById('editTaskId').value = id;
            document.getElementById('editTitle').value = title;
            document.getElementById('editDescription').value = description;

            editModal.show();
        }
    });

    editTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('editTaskId').value;
        const title = document.getElementById('editTitle').value;
        const description = document.getElementById('editDescription').value;

        try {
            const response = await fetch(`/tasks/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                currentTaskItem.querySelector('.task-title').textContent = title;
                currentTaskItem.querySelector('.task-description').textContent = description;
                editModal.hide();
            }
        } catch (err) {
            console.error('Error updating task:', err);
        }
    });

});