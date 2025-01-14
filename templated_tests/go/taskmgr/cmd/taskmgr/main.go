package main

import (
	"fmt"
	"os"

	"taskmgr/internal/cli"
	"taskmgr/internal/tasks"
)

func main() {
	cmd, args := cli.ParseArgs(os.Args[1:])
	store := tasks.NewFileStore("tasks.json") // Updated to file-based store
	manager := tasks.NewTaskManager(store)

	switch cmd {
	case "add":
		if len(args) < 1 {
			fmt.Println("Usage: taskmgr add <title>")
			os.Exit(1)
		}
		t := tasks.Task{Title: args[0]}
		err := manager.Add(t)
		if err != nil {
			fmt.Println("Error adding task:", err)
			os.Exit(1)
		}
		fmt.Println("Task added.")
	case "list":
		all := manager.List()
		for i, t := range all {
			done := " "
			if t.Done {
				done = "x"
			}
			fmt.Printf("%d: [%s] %s\n", i, done, t.Title)
		}
	case "done":
		if len(args) < 1 {
			fmt.Println("Usage: taskmgr done <index>")
			os.Exit(1)
		}
		err := manager.MarkDone(args[0])
		if err != nil {
			fmt.Println("Error marking done:", err)
			os.Exit(1)
		}
		fmt.Println("Task marked as done.")
	default:
		fmt.Println("Usage: taskmgr [add|list|done] ...")
		os.Exit(1)
	}
}
