package taskmgr.cli

class Parser {
    fun parseArgs(args: Array<String>): Pair<String, List<String>> {
        if (args.isEmpty()) return "" to emptyList()
        return args[0] to args.drop(1)
    }
}
