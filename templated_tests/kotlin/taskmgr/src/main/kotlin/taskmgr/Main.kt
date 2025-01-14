package taskmgr

import taskmgr.cli.Parser
import taskmgr.tasks.FileStore
import taskmgr.tasks.Task
import taskmgr.tasks.TaskManager

fun main(args: Array<String>) {
    val (cmd, cmdArgs) = Parser().parseArgs(args)
    val store = FileStore("tasks.json")
    val manager = TaskManager(store)

    when (cmd) {
        "add" -> {
            if (cmdArgs.isEmpty()) {
                println("Usage: taskmgr add <title>")
                return
            }
            val task = Task(title = cmdArgs[0])
            manager.add(task)
            println("Task added.")
        }
        "list" -> {
            manager.list().forEachIndexed { index, task ->
                val status = if (task.done) "x" else " "
                println("$index: [$status] ${task.title}")
            }
        }
        "done" -> {
            if (cmdArgs.isEmpty()) {
                println("Usage: taskmgr done <index>")
                return
            }
            val index = cmdArgs[0].toIntOrNull()
            if (index == null) {
                println("Invalid index")
                return
            }
            manager.markDone(index)
            println("Task marked as done.")
        }
        else -> println("Usage: taskmgr [add|list|done] ...")
    }
}
