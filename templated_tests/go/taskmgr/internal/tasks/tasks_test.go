package tasks

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"testing"
)

func TestTaskManager(t *testing.T) {
	// Create a temporary directory for test files
	dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(dir) // Clean up

	testFile := filepath.Join(dir, "tasks.json")
	store := NewFileStore(testFile)
	manager := NewTaskManager(store)

	// Add a task
	if err := manager.Add(Task{Title: "First"}); err != nil {
		t.Fatal("Error adding task:", err)
	}

	list := manager.List()
	if len(list) != 1 || list[0].Title != "First" {
		t.Errorf("Expected one task with title 'First', got %v", list)
	}

	// Mark it done
	err = manager.MarkDone("0")
	if err != nil {
		t.Error("MarkDone returned an error:", err)
	}

	list = manager.List()
	if !list[0].Done {
		t.Error("Expected task to be marked done")
	}

	// Ensure persistence: create a new manager and check again
	newStore := NewFileStore(testFile)
	newManager := NewTaskManager(newStore)
	newList := newManager.List()
	if len(newList) != 1 || newList[0].Title != "First" || !newList[0].Done {
		t.Errorf("Expected persisted task 'First' to be done, got %v", newList)
	}
}

func TestUndoDoneOutOfRange(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "Task 1", Done: true})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.UndoDone("1")
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestMarkAllDone(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    tasks := []Task{
        {Title: "Task 1", Done: false},
        {Title: "Task 2", Done: false},
    }

    err = manager.BulkAdd(tasks)
    if err != nil {
        t.Fatal("Error adding tasks:", err)
    }

    err = manager.MarkAllDone()
    if err != nil {
        t.Errorf("Expected no error, got %v", err)
    }

    list := manager.List()
    for _, task := range list {
        if !task.Done {
            t.Error("Expected all tasks to be marked done")
        }
    }
}


func TestRemoveOutOfRange(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "Task 1"})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.Remove("1")
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestMarkDoneOutOfRange(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "Task 1"})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.MarkDone("1")
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestFindByDescription(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    manager.Add(Task{Title: "Task 1", Description: "Common Description"})
    manager.Add(Task{Title: "Task 2", Description: "Common Description"})

    tasks := manager.FindByDescription("Common Description")
    if len(tasks) != 2 {
        t.Errorf("Expected to find 2 tasks, got %d", len(tasks))
    }
}


func TestFindByTitle(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    manager.Add(Task{Title: "Unique Title"})

    task := manager.FindByTitle("Unique Title")
    if task == nil || task.Title != "Unique Title" {
        t.Errorf("Expected to find task with title 'Unique Title', got %v", task)
    }
}


func TestUndoDone(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "Task to Undo", Done: true})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.UndoDone("0")
    if err != nil {
        t.Errorf("Expected no error, got %v", err)
    }

    list := manager.List()
    if list[0].Done {
        t.Error("Expected task to be marked not done")
    }
}


func TestRemoveValidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "Task to Remove"})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.Remove("0")
    if err != nil {
        t.Errorf("Expected no error, got %v", err)
    }

    list := manager.List()
    if len(list) != 0 {
        t.Errorf("Expected no tasks, got %d", len(list))
    }
}


func TestCountDone(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    tasks := []Task{
        {Title: "Task 1", Done: true},
        {Title: "Task 2", Done: false},
        {Title: "Task 3", Done: true},
    }

    err = manager.BulkAdd(tasks)
    if err != nil {
        t.Fatal("Error adding tasks:", err)
    }

    doneCount := manager.CountDone()
    if doneCount != 2 {
        t.Errorf("Expected 2 done tasks, got %d", doneCount)
    }
}


func TestBulkAdd(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    tasks := []Task{
        {Title: "Task 1"},
        {Title: "Task 2"},
    }

    err = manager.BulkAdd(tasks)
    if err != nil {
        t.Fatal("Error adding tasks:", err)
    }

    list := manager.List()
    if len(list) != 2 {
        t.Errorf("Expected 2 tasks, got %d", len(list))
    }
}


func TestMarkDoneInvalidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    store := NewFileStore(filepath.Join(dir, "tasks.json"))
    manager := NewTaskManager(store)

    err = manager.MarkDone("invalid")
    if err == nil {
        t.Error("Expected error for invalid index, got nil")
    }
}

