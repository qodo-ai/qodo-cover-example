package taskmgr.cli

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class ParserTest() {

    @Test
    fun `parseArgs correctly parses input`() {
        val (cmd, args) = Parser().parseArgs(arrayOf("add", "Task1"))
        assertEquals("add", cmd)
        assertEquals(listOf("Task1"), args)
    }

    @Test
    fun `parseArgs returns empty for no input`() {
        val (cmd, args) = Parser().parseArgs(emptyArray())
        assertEquals("", cmd)
        assertTrue(args.isEmpty())
    }

}
