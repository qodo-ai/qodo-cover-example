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
    fun `clear all tasks`() {
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
    fun `mark task as done by index`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        taskManager.add(task1)
        taskManager.add(task2)
        
        taskManager.markDone(1)
        
        val tasks = taskManager.list()
        assertTrue(tasks[1].done)
    }


}
