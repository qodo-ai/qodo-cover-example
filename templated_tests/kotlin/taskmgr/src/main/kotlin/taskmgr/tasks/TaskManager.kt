package taskmgr.tasks

class TaskManager(private val store: FileStore) {

    /**
     * Adds a new Task to the underlying data store.
     * @param task The Task to be added.
     */
    fun add(task: Task) = store.add(task)

    /**
     * Returns all tasks from the underlying data store.
     * @return A List of Task objects.
     */
    fun list(): List<Task> = store.list()

    /**
     * Marks a task as done, by index.
     * @param index The index of the task to mark done.
     */
    fun markDone(index: Int) = store.markDone(index)

    /**
     * Removes a task by its index.
     * @param index The index of the task to remove.
     */
    fun remove(index: Int) = store.remove(index)

    /**
     * Updates a task's title by its index.
     * @param index The index of the task to update.
     * @param newTitle The new title to set on the task.
     */
    fun update(index: Int, newTitle: String) = store.update(index, newTitle)

    /**
     * Marks all tasks as done.
     * Useful for quickly marking every task in the list completed.
     */
    fun markAllDone() = store.markAllDone()

    /**
     * Clears (removes) all tasks from the underlying data store.
     * After calling this, the list should be empty.
     */
    fun clearAll() = store.clearAll()

    /**
     * Finds tasks by partial title match (case-insensitive).
     * @param query The substring to look for in the title.
     * @return A List of tasks with matching titles.
     */
    fun findTasksByTitle(query: String): List<Task> = store.findTasksByTitle(query)

    /**
     * Returns the total number of tasks.
     * @return The number of tasks in the store.
     */
    fun count(): Int = store.count()

    /**
     * Reorders a task from one index to another.
     * @param fromIndex The current index of the task.
     * @param toIndex The new index to move the task to.
     */
    fun reorderTask(fromIndex: Int, toIndex: Int) = store.reorderTask(fromIndex, toIndex)
}