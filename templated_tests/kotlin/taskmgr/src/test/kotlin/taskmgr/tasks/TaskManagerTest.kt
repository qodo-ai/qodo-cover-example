package taskmgr.tasks

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.File
import java.nio.file.Files

class TaskManagerTest {

    private lateinit var tempFile: File
    private lateinit var fileStore: FileStore
    private lateinit var taskManager: TaskManager

    @BeforeEach
    fun setUp() {
        tempFile = Files.createTempFile("tasks", ".json").toFile()
        fileStore = FileStore(tempFile.absolutePath)
        taskManager = TaskManager(fileStore)
    }

    @Test
    fun `add task adds it to the manager`() {
        val task = Task("New Task")
        taskManager.add(task)

        val tasks = taskManager.list()
        assertEquals(1, tasks.size)
        assertEquals("New Task", tasks[0].title)
        assertFalse(tasks[0].done)
    }

    @Test
    fun `reorder task`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        val task3 = Task("Task 3")
        taskManager.add(task1)
        taskManager.add(task2)
        taskManager.add(task3)
    
        taskManager.reorderTask(0, 2)
    
        val tasks = taskManager.list()
        assertEquals("Task 2", tasks[0].title)
        assertEquals("Task 3", tasks[1].title)
        assertEquals("Task 1", tasks[2].title)
    }


    @Test
    fun `count tasks`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        taskManager.add(task1)
        taskManager.add(task2)
    
        val count = taskManager.count()
        assertEquals(2, count)
    
        taskManager.remove(0)
        val newCount = taskManager.count()
        assertEquals(1, newCount)
    }


    @Test
    fun `find tasks by title`() {
        val task1 = Task("Task 1")
        val task2 = Task("Another Task")
        taskManager.add(task1)
        taskManager.add(task2)
    
        val foundTasks = taskManager.findTasksByTitle("Task")
        assertEquals(2, foundTasks.size)
    
        val foundTasks2 = taskManager.findTasksByTitle("Another")
        assertEquals(1, foundTasks2.size)
        assertEquals("Another Task", foundTasks2[0].title)
    }


    @Test
    fun `mark all tasks as done`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        taskManager.add(task1)
        taskManager.add(task2)
    
        taskManager.markAllDone()
    
        val tasks = taskManager.list()
        assertTrue(tasks.all { it.done })
    }


    @Test
    fun `clear all tasks results in empty list`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        taskManager.add(task1)
        taskManager.add(task2)
    
        taskManager.clearAll()
    
        val tasks = taskManager.list()
        assertTrue(tasks.isEmpty())
    }


    @Test
    fun `update task title by index`() {
        val task = Task("Old Title")
        taskManager.add(task)
    
        taskManager.update(0, "New Title")
    
        val tasks = taskManager.list()
        assertEquals("New Title", tasks[0].title)
    }


    @Test
    fun `remove task by index`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        taskManager.add(task1)
        taskManager.add(task2)
    
        taskManager.remove(0)
    
        val tasks = taskManager.list()
        assertEquals(1, tasks.size)
        assertEquals("Task 2", tasks[0].title)
    }


    @Test
    fun `mark task as done updates status`() {
        val task = Task("Incomplete Task")
        taskManager.add(task)
    
        taskManager.markDone(0)
    
        val tasks = taskManager.list()
        assertTrue(tasks[0].done)
    }


}
