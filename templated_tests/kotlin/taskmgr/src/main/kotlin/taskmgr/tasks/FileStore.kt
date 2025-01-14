package taskmgr.tasks

import java.io.File
import kotlin.collections.List
import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString

class FileStore(private val filename: String) {
    private val file = File(filename)
    private val json = Json {
        prettyPrint = true
        ignoreUnknownKeys = true
    }

    /**
     * Adds a new Task to the persisted list of tasks.
     * @param task The Task to be added.
     */
    fun add(task: Task) {
        val tasks = loadTasks().toMutableList()
        tasks.add(Task(task.title, task.done))
        saveTasks(tasks)
    }

    /**
     * Retrieves all tasks from the file.
     * @return A List of Task objects.
     */
    fun list(): List<Task> {
        return loadTasks().map { Task(it.title, it.done) }
    }

    /**
     * Marks the task at the specified index as done.
     * @param index The index of the task to mark as done.
     * @throws IndexOutOfBoundsException if the index is invalid.
     */
    fun markDone(index: Int) {
        val tasks = loadTasks().toMutableList()
        if (index < 0 || index >= tasks.size) throw IndexOutOfBoundsException("Invalid index")
        tasks[index] = tasks[index].copy(done = true)
        saveTasks(tasks)
    }

    /**
     * Removes the task at the specified index.
     * @param index The index of the task to remove.
     * @throws IndexOutOfBoundsException if the index is invalid.
     */
    fun remove(index: Int) {
        val tasks = loadTasks().toMutableList()
        if (index < 0 || index >= tasks.size) throw IndexOutOfBoundsException("Invalid index")
        tasks.removeAt(index)
        saveTasks(tasks)
    }

    /**
     * Updates the title of the task at the specified index.
     * @param index The index of the task to update.
     * @param newTitle The new title to be set.
     * @throws IndexOutOfBoundsException if the index is invalid.
     */
    fun update(index: Int, newTitle: String) {
        val tasks = loadTasks().toMutableList()
        if (index < 0 || index >= tasks.size) throw IndexOutOfBoundsException("Invalid index")
        val currentTask = tasks[index]
        tasks[index] = currentTask.copy(title = newTitle)
        saveTasks(tasks)
    }

    /**
     * Marks all tasks as done.
     * Useful if a user wants to quickly complete every task in the list.
     */
    fun markAllDone() {
        val tasks = loadTasks().map { it.copy(done = true) }
        saveTasks(tasks)
    }

    /**
     * Removes all tasks (clears the file).
     * After calling this, the task list will be empty.
     */
    fun clearAll() {
        saveTasks(emptyList())
    }

    /**
     * Finds all tasks whose titles contain the given query (case-insensitive).
     * @param query The substring to look for.
     * @return A List of matching Task objects.
     */
    fun findTasksByTitle(query: String): List<Task> {
        return loadTasks().filter { it.title.contains(query, ignoreCase = true) }
    }

    /**
     * Returns the total number of tasks in the file.
     * @return The number of tasks.
     */
    fun count(): Int {
        return loadTasks().size
    }

    /**
     * Reorders a task from one index to another.
     * Moves the task at 'fromIndex' to 'toIndex' and shifts others accordingly.
     * @param fromIndex The original index of the task.
     * @param toIndex The new index of the task.
     * @throws IndexOutOfBoundsException if either 'fromIndex' or 'toIndex' is invalid.
     */
    fun reorderTask(fromIndex: Int, toIndex: Int) {
        val tasks = loadTasks().toMutableList()
        if (fromIndex < 0 || fromIndex >= tasks.size) throw IndexOutOfBoundsException("Invalid fromIndex")
        if (toIndex < 0 || toIndex >= tasks.size) throw IndexOutOfBoundsException("Invalid toIndex")

        val taskToMove = tasks.removeAt(fromIndex)
        tasks.add(toIndex, taskToMove)
        saveTasks(tasks)
    }

    /**
     * Internal helper that loads tasks from the JSON file.
     * @return A List of tasks from the file (or an empty List if the file doesn't exist or if there's an error).
     */
    private fun loadTasks(): List<Task> {
        if (!file.exists()) return emptyList()
        return try {
            json.decodeFromString(file.readText())
        } catch (e: Exception) {
            println("Error loading tasks: ${e.message}")
            emptyList()
        }
    }

    /**
     * Internal helper that saves a list of tasks to the JSON file.
     * @param tasks The list of Task objects to be saved.
     * @throws kotlinx.serialization.SerializationException if saving fails.
     */
    private fun saveTasks(tasks: List<Task>) {
        try {
            file.writeText(json.encodeToString(tasks))
        } catch (e: Exception) {
            println("Error saving tasks: ${e.message}")
            throw kotlinx.serialization.SerializationException("Failed to save tasks to file: ${e.message}")
        }
    }
}