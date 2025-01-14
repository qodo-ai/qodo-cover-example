package taskmgr.tasks

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.collections.List
import kotlinx.serialization.SerializationException
import java.io.File
import java.nio.file.Files

class FileStoreTest {

    private lateinit var tempFile: File
    private lateinit var fileStore: FileStore

    @BeforeEach
    fun setUp() {
        tempFile = Files.createTempFile("tasks", ".json").toFile()
        fileStore = FileStore(tempFile.absolutePath)
    }

    @Test
    fun `add task persists it to file`() {
        val task = Task("Example Task")
        assertDoesNotThrow { fileStore.add(task) }

        val tasks = fileStore.list()
        assertEquals(1, tasks.size)  // Using size property
        assertTrue(tasks.isNotEmpty())
        val firstTask = tasks[0]
        assertEquals("Example Task", firstTask.title)
        assertFalse(firstTask.done)
    }

    @Test
    fun `list returns empty list for nonexistent file`() {
        tempFile.delete() // Ensure the file doesn't exist
        val tasks = fileStore.list()
        assertTrue(tasks.isEmpty())
    }

    @Test
    fun `markDone updates the task status in the file`() {
        val task = Task("Task to mark done")
        fileStore.add(task)

        assertDoesNotThrow { fileStore.markDone(0) }

        val tasks = fileStore.list()
        assertTrue(tasks[0].done)
    }

    @Test
    fun `markDone throws exception for invalid index`() {
        val exception = assertThrows(IndexOutOfBoundsException::class.java) {
            fileStore.markDone(0)
        }
        assertEquals("Invalid index", exception.message)
    }

    @Test
    fun `persisted tasks are correctly reloaded`() {
        fileStore.add(Task("Persistent Task"))
        val reloadedStore = FileStore(tempFile.absolutePath)
        val tasks = reloadedStore.list()

        assertEquals(1, tasks.size)
        val firstTask = tasks[0]
        assertEquals("Persistent Task", firstTask.title)
    }

    @Test
    fun `clear all tasks`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        fileStore.add(task1)
        fileStore.add(task2)
    
        fileStore.clearAll()
    
        val tasks = fileStore.list()
        assertTrue(tasks.isEmpty())
    }


    @Test
    fun `mark all tasks as done`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        fileStore.add(task1)
        fileStore.add(task2)
    
        fileStore.markAllDone()
    
        val tasks = fileStore.list()
        assertTrue(tasks.all { it.done })
    }


    @Test
    fun `update task title at valid index`() {
        val task = Task("Old Title")
        fileStore.add(task)
    
        assertDoesNotThrow { fileStore.update(0, "New Title") }
    
        val tasks = fileStore.list()
        assertEquals("New Title", tasks[0].title)
    }


    @Test
    fun `remove task at valid index`() {
        val task1 = Task("Task 1")
        val task2 = Task("Task 2")
        fileStore.add(task1)
        fileStore.add(task2)
    
        assertDoesNotThrow { fileStore.remove(0) }
    
        val tasks = fileStore.list()
        assertEquals(1, tasks.size)
        assertEquals("Task 2", tasks[0].title)
    }


}
