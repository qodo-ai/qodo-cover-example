package tasks

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"testing"
)

func TestFileStore(t *testing.T) {
	// Create a temporary directory for test files
	dir, err := ioutil.TempDir("", "taskmgr_test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(dir) // Clean up

	testFile := filepath.Join(dir, "tasks.json")
	store := NewFileStore(testFile)

	// Initially empty
	list := store.List()
	if len(list) != 0 {
		t.Errorf("Expected empty list, got %d tasks", len(list))
	}

	// Add a task
	if err := store.Add(Task{Title: "Example"}); err != nil {
		t.Fatalf("Add returned an error: %v", err)
	}

	list = store.List()
	if len(list) != 1 || list[0].Title != "Example" {
		t.Errorf("Expected one task 'Example', got %v", list)
	}

	// Update the task
	err = store.Update(0, Task{Title: "Updated", Done: true})
	if err != nil {
		t.Errorf("Update returned an error: %v", err)
	}

	list = store.List()
	if len(list) != 1 || list[0].Title != "Updated" || !list[0].Done {
		t.Errorf("Expected updated task 'Updated' with done=true, got %v", list)
	}

	// Test invalid update
	err = store.Update(1, Task{Title: "Invalid"})
	if err == nil {
		t.Error("Expected error updating invalid index, got nil")
	}

	// Ensure data persists by creating a new store and reading again
	newStore := NewFileStore(testFile)
	list = newStore.List()
	if len(list) != 1 || list[0].Title != "Updated" || !list[0].Done {
		t.Errorf("Expected persisted 'Updated' task, got %v", list)
	}
}

func TestFileStoreRemoveInvalidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)

    // Add a task to ensure the file is created
    if err := store.Add(Task{Title: "Example"}); err != nil {
        t.Fatalf("Add returned an error: %v", err)
    }

    err = store.Remove(1) // Invalid index
    if err == nil {
        t.Error("Expected error when removing task at invalid index, got nil")
    }
}


func TestFileStoreListInvalidJSON(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)

    // Create a file with invalid JSON
    err = ioutil.WriteFile(testFile, []byte("{invalid json"), 0644)
    if err != nil {
        t.Fatalf("Failed to write to test file: %v", err)
    }

    list := store.List()
    if len(list) != 0 {
        t.Errorf("Expected empty list due to invalid JSON, got %d tasks", len(list))
    }
}


func TestFileStoreAddReadError(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)

    // Create a file with invalid JSON to simulate a read error
    err = ioutil.WriteFile(testFile, []byte("{invalid json"), 0644)
    if err != nil {
        t.Fatalf("Failed to write to test file: %v", err)
    }

    err = store.Add(Task{Title: "Example"})
    if err == nil {
        t.Error("Expected error when adding task due to read error, got nil")
    }
}

