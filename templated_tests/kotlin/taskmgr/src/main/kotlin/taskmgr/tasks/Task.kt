package taskmgr.tasks

import kotlinx.serialization.Serializable

@Serializable
data class Task(
    val title: String,
    var done: Boolean = false
)
